import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

type Invoice = {
  id: string;
  invoice_number: string;
  amount: number;
  due_date: string | null;
  status: string | null;
  stripe_invoice_id: string | null;
  account_id: string;
  service_instance_id: string | null;
  accounts: { account_name: string }[] | null;
  service_instances: { service_name: string }[] | null;
};

type AccountOption = {
  id: string;
  account_name: string;
};

type ServiceOption = {
  id: string;
  service_name: string;
  account_id: string;
};

function getStatusStyles(status: string | null): React.CSSProperties {
  switch (status) {
    case "paid":
      return {
        background: "rgba(212, 175, 55, 0.16)",
        border: "1px solid rgba(212, 175, 55, 0.34)",
        color: "#f4d57b",
      };
    case "open":
      return {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#f5f5f5",
      };
    case "past_due":
      return {
        background: "rgba(255, 193, 7, 0.12)",
        border: "1px solid rgba(255, 193, 7, 0.28)",
        color: "#ffd666",
      };
    case "void":
      return {
        background: "rgba(255, 99, 71, 0.12)",
        border: "1px solid rgba(255, 99, 71, 0.28)",
        color: "#ffb29b",
      };
    case "draft":
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
    default:
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
  }
}

function getEventMeta(nextStatus: string) {
  switch (nextStatus) {
    case "open":
      return { event_type: "invoice_issued", event_label: "Invoice issued" };
    case "paid":
      return { event_type: "invoice_paid", event_label: "Invoice paid" };
    case "past_due":
      return { event_type: "invoice_past_due", event_label: "Invoice past due" };
    case "void":
      return { event_type: "invoice_voided", event_label: "Invoice voided" };
    default:
      return { event_type: "invoice_updated", event_label: "Invoice updated" };
  }
}

function getAvailableActions(currentStatus: string) {
  if (currentStatus === "draft") return ["open", "void"];
  if (currentStatus === "open") return ["paid", "past_due", "void"];
  if (currentStatus === "past_due") return ["paid", "void"];
  if (currentStatus === "paid") return ["void"];
  return ["open"];
}

export default async function AdminBillingPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  async function createInvoice(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const invoiceNumber = String(formData.get("invoice_number") ?? "").trim();
    const accountId = String(formData.get("account_id") ?? "");
    const serviceInstanceId = String(formData.get("service_instance_id") ?? "");
    const amountRaw = String(formData.get("amount") ?? "").trim();
    const dueDate = String(formData.get("due_date") ?? "");

    if (!invoiceNumber || !accountId || !amountRaw) return;

    const amount = Number(amountRaw);
    if (!Number.isFinite(amount)) return;

    const { data: invoice, error } = await supabase
      .from("invoices")
      .insert({
        invoice_number: invoiceNumber,
        account_id: accountId,
        service_instance_id: serviceInstanceId || null,
        amount,
        due_date: dueDate || null,
        status: "draft",
      })
      .select("id, invoice_number, amount, due_date, status")
      .single();

    if (error || !invoice) {
      console.error("Failed to create invoice:", error?.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "invoice",
      entity_id: invoice.id,
      event_type: "invoice_created",
      event_label: "Invoice created",
      notes: `Invoice ${invoice.invoice_number} created.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "invoice",
      entity_id: invoice.id,
      action: "create",
      after_state: {
        invoice_number: invoice.invoice_number,
        amount: invoice.amount,
        due_date: invoice.due_date,
        status: invoice.status,
      },
      source_interface: "admin_billing_create",
    });

    revalidatePath("/admin/billing");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  async function updateInvoiceDetails(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const invoiceId = String(formData.get("invoice_id") ?? "");
    const amountRaw = String(formData.get("amount") ?? "").trim();
    const dueDate = String(formData.get("due_date") ?? "");

    if (!invoiceId || !amountRaw) return;

    const amount = Number(amountRaw);
    if (!Number.isFinite(amount)) return;

    const { data: before, error: beforeError } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", invoiceId)
      .single();

    if (beforeError || !before) {
      console.error("Failed loading invoice before update:", beforeError?.message);
      return;
    }

    const beforeState = {
      amount: before.amount,
      due_date: before.due_date,
    };

    const afterState = {
      amount,
      due_date: dueDate || null,
    };

    if (
      Number(beforeState.amount) === Number(afterState.amount) &&
      beforeState.due_date === afterState.due_date
    ) {
      return;
    }

    const { error } = await supabase
      .from("invoices")
      .update(afterState)
      .eq("id", invoiceId);

    if (error) {
      console.error("Failed updating invoice details:", error.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: before.account_id,
      entity_type: "invoice",
      entity_id: invoiceId,
      event_type: "invoice_updated",
      event_label: "Invoice updated",
      notes: `Invoice ${before.invoice_number} details updated.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "invoice",
      entity_id: invoiceId,
      action: "update",
      before_state: beforeState,
      after_state: afterState,
      source_interface: "admin_billing_edit",
    });

    revalidatePath("/admin/billing");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  async function updateInvoiceStatus(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const invoiceId = String(formData.get("invoice_id") ?? "");
    const accountId = String(formData.get("account_id") ?? "");
    const invoiceNumber = String(formData.get("invoice_number") ?? "");
    const currentStatus = String(formData.get("current_status") ?? "");
    const nextStatus = String(formData.get("next_status") ?? "");

    if (!invoiceId || !nextStatus) return;
    if (currentStatus === nextStatus) return;

    const { error } = await supabase
      .from("invoices")
      .update({ status: nextStatus })
      .eq("id", invoiceId);

    if (error) {
      console.error("Failed updating invoice status:", error.message);
      return;
    }

    const meta = getEventMeta(nextStatus);

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "invoice",
      entity_id: invoiceId,
      event_type: meta.event_type,
      event_label: meta.event_label,
      notes: `Invoice ${invoiceNumber} moved from ${currentStatus || "unknown"} to ${nextStatus}.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "invoice",
      entity_id: invoiceId,
      action: "status_change",
      before_state: { status: currentStatus || null },
      after_state: { status: nextStatus },
      source_interface: "admin_billing_status",
    });

    revalidatePath("/admin/billing");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  const [{ data, error }, { data: accountsData }, { data: servicesData }] =
    await Promise.all([
      supabase
        .from("invoices")
        .select(`
          id,
          invoice_number,
          amount,
          due_date,
          status,
          stripe_invoice_id,
          account_id,
          service_instance_id,
          accounts ( account_name ),
          service_instances ( service_name )
        `)
        .order("created_at", { ascending: false }),
      supabase
        .from("accounts")
        .select("id, account_name")
        .neq("status", "archived")
        .order("account_name", { ascending: true }),
      supabase
        .from("service_instances")
        .select("id, service_name, account_id")
        .neq("status", "terminated")
        .order("service_name", { ascending: true }),
    ]);

  const invoices = (data as Invoice[] | null) ?? [];
  const accountOptions = (accountsData as AccountOption[] | null) ?? [];
  const serviceOptions = (servicesData as ServiceOption[] | null) ?? [];

  const totalInvoices = invoices.length;
  const draftInvoices = invoices.filter((i) => i.status === "draft").length;
  const openInvoices = invoices.filter((i) => i.status === "open").length;
  const paidInvoices = invoices.filter((i) => i.status === "paid").length;
  const pastDueInvoices = invoices.filter((i) => i.status === "past_due").length;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        background:
          "radial-gradient(circle at top, rgba(212,175,55,0.12) 0%, rgba(10,10,10,1) 28%), linear-gradient(180deg, #080808 0%, #111111 48%, #161616 100%)",
        color: "#f5f5f5",
      }}
    >
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
        <section
          style={{
            marginBottom: "28px",
            padding: "30px",
            borderRadius: "28px",
            border: "1px solid rgba(212, 175, 55, 0.18)",
            background:
              "linear-gradient(135deg, rgba(212, 175, 55, 0.10) 0%, rgba(255,255,255,0.04) 38%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.38)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#d4af37",
              marginBottom: "12px",
            }}
          >
            Orbitlink OS
          </div>

          <h1
            style={{
              fontSize: "38px",
              fontWeight: 700,
              margin: "0 0 10px 0",
              color: "#fff7db",
            }}
          >
            Billing Control
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.72)",
              margin: 0,
              maxWidth: "880px",
              lineHeight: 1.65,
            }}
          >
            Create invoices, review payment posture, edit billing dates and amounts,
            and manage invoice lifecycle from one premium operator-grade surface.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {[
            { label: "Total Invoices", value: totalInvoices },
            { label: "Draft", value: draftInvoices },
            { label: "Open", value: openInvoices },
            { label: "Paid", value: paidInvoices },
            { label: "Past Due", value: pastDueInvoices },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                borderRadius: "20px",
                padding: "20px",
                border: "1px solid rgba(212, 175, 55, 0.14)",
                background: "rgba(255,255,255,0.03)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.58)",
                  marginBottom: "10px",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#fff2c4",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </section>

        <section
          style={{
            marginBottom: "24px",
            borderRadius: "24px",
            border: "1px solid rgba(212, 175, 55, 0.16)",
            background: "rgba(255,255,255,0.03)",
            boxShadow: "0 18px 42px rgba(0,0,0,0.28)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "18px 22px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(212, 175, 55, 0.06)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#fff2c4",
              }}
            >
              Create Invoice
            </h2>
          </div>

          <div style={{ padding: "20px 22px" }}>
            <form action={createInvoice} style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  gap: "12px",
                }}
              >
                <input
                  name="invoice_number"
                  placeholder="Invoice Number"
                  required
                  style={textInput}
                />

                <select name="account_id" required style={textInput}>
                  <option value="">Select Account</option>
                  {accountOptions.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.account_name}
                    </option>
                  ))}
                </select>

                <select name="service_instance_id" style={textInput}>
                  <option value="">Optional Service</option>
                  {serviceOptions.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.service_name}
                    </option>
                  ))}
                </select>

                <input
                  name="amount"
                  placeholder="Amount"
                  required
                  type="number"
                  step="0.01"
                  style={textInput}
                />

                <input
                  name="due_date"
                  type="date"
                  style={dateInput}
                />
              </div>

              <div>
                <button style={actionButtonGold} type="submit">
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </section>

        {error ? (
          <div
            style={{
              border: "1px solid rgba(255, 99, 71, 0.35)",
              borderRadius: "20px",
              padding: "20px",
              background: "rgba(255, 99, 71, 0.08)",
            }}
          >
            <p style={{ margin: 0, color: "#ffb29b" }}>
              Error loading invoices: {error.message}
            </p>
          </div>
        ) : (
          <div
            style={{
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(212, 175, 55, 0.16)",
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.30)",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(212, 175, 55, 0.06)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#fff2c4",
                }}
              >
                Invoice Register
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "1650px",
                }}
              >
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)", textAlign: "left" }}>
                    <th style={headerCell}>Invoice</th>
                    <th style={headerCell}>Account</th>
                    <th style={headerCell}>Service</th>
                    <th style={headerCell}>Amount</th>
                    <th style={headerCell}>Due Date</th>
                    <th style={headerCell}>Status</th>
                    <th style={headerCell}>Stripe Invoice</th>
                    <th style={headerCell}>Immediate Actions</th>
                    <th style={headerCell}>Save Details</th>
                  </tr>
                </thead>

                <tbody>
                  {invoices.length ? (
                    invoices.map((invoice) => {
                      const currentStatus = invoice.status ?? "draft";
                      const availableActions = getAvailableActions(currentStatus);

                      return (
                        <tr
                          key={invoice.id}
                          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <td style={bodyCell}>
                            <div style={{ fontWeight: 600, color: "#fff7db" }}>
                              {invoice.invoice_number}
                            </div>
                          </td>

                          <td style={bodyCell}>
                            {invoice.accounts?.[0]?.account_name ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            {invoice.service_instances?.[0]?.service_name ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            <form action={updateInvoiceDetails}>
                              <input type="hidden" name="invoice_id" value={invoice.id} />
                              <input
                                type="hidden"
                                name="due_date"
                                value={invoice.due_date ?? ""}
                              />
                              <input
                                name="amount"
                                defaultValue={Number(invoice.amount).toFixed(2)}
                                type="number"
                                step="0.01"
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateInvoiceDetails}>
                              <input type="hidden" name="invoice_id" value={invoice.id} />
                              <input
                                type="hidden"
                                name="amount"
                                value={String(invoice.amount)}
                              />
                              <input
                                name="due_date"
                                defaultValue={invoice.due_date ?? ""}
                                type="date"
                                style={dateInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "6px 10px",
                                borderRadius: "999px",
                                fontSize: "12px",
                                fontWeight: 600,
                                textTransform: "capitalize",
                                ...getStatusStyles(currentStatus),
                              }}
                            >
                              {currentStatus}
                            </span>
                          </td>

                          <td style={bodyCell}>{invoice.stripe_invoice_id ?? "—"}</td>

                          <td style={bodyCell}>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                              {availableActions.map((nextStatus) => (
                                <form key={nextStatus} action={updateInvoiceStatus}>
                                  <input type="hidden" name="invoice_id" value={invoice.id} />
                                  <input type="hidden" name="account_id" value={invoice.account_id} />
                                  <input
                                    type="hidden"
                                    name="invoice_number"
                                    value={invoice.invoice_number}
                                  />
                                  <input
                                    type="hidden"
                                    name="current_status"
                                    value={currentStatus}
                                  />
                                  <input
                                    type="hidden"
                                    name="next_status"
                                    value={nextStatus}
                                  />
                                  <button
                                    type="submit"
                                    style={
                                      nextStatus === "paid"
                                        ? actionButtonGold
                                        : nextStatus === "void"
                                          ? actionButtonDanger
                                          : actionButton
                                    }
                                  >
                                    {nextStatus === "open"
                                      ? "Open"
                                      : nextStatus === "paid"
                                        ? "Mark Paid"
                                        : nextStatus === "past_due"
                                          ? "Past Due"
                                          : nextStatus === "void"
                                            ? "Void"
                                            : nextStatus}
                                  </button>
                                </form>
                              ))}
                            </div>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateInvoiceDetails} style={{ display: "grid", gap: "8px", minWidth: "180px" }}>
                              <input type="hidden" name="invoice_id" value={invoice.id} />
                              <input
                                name="amount"
                                defaultValue={Number(invoice.amount).toFixed(2)}
                                type="number"
                                step="0.01"
                                style={textInput}
                              />
                              <input
                                name="due_date"
                                defaultValue={invoice.due_date ?? ""}
                                type="date"
                                style={dateInput}
                              />
                              <button style={actionButtonGold} type="submit">
                                Save Details
                              </button>
                            </form>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td style={bodyCell} colSpan={9}>
                        No invoices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const headerCell: React.CSSProperties = {
  padding: "14px 16px",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "rgba(255,255,255,0.62)",
};

const bodyCell: React.CSSProperties = {
  padding: "16px",
  fontSize: "14px",
  color: "#f5f5f5",
  verticalAlign: "top",
};

const actionButton: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  color: "#f5f5f5",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "12px",
  cursor: "pointer",
};

const actionButtonGold: React.CSSProperties = {
  background: "rgba(212, 175, 55, 0.18)",
  color: "#fff2c4",
  border: "1px solid rgba(212, 175, 55, 0.35)",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "12px",
  cursor: "pointer",
};

const actionButtonDanger: React.CSSProperties = {
  background: "rgba(255, 99, 71, 0.12)",
  color: "#ffb29b",
  border: "1px solid rgba(255, 99, 71, 0.28)",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "12px",
  cursor: "pointer",
};

const dateInput: React.CSSProperties = {
  background: "#111",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "10px",
  padding: "8px 10px",
  fontSize: "12px",
  minWidth: "120px",
};

const textInput: React.CSSProperties = {
  background: "#111",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "10px",
  padding: "8px 10px",
  fontSize: "12px",
  minWidth: "130px",
};