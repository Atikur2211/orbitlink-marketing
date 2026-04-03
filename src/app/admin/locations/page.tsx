import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

type Location = {
  id: string;
  location_name: string | null;
  address_line_1: string;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  status: string | null;
  account_id: string;
  accounts: { account_name: string }[] | null;
};

type AccountOption = {
  id: string;
  account_name: string;
};

function getStatusStyles(status: string | null): React.CSSProperties {
  switch (status) {
    case "active":
      return {
        background: "rgba(212, 175, 55, 0.16)",
        border: "1px solid rgba(212, 175, 55, 0.34)",
        color: "#f4d57b",
      };
    case "pending":
      return {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#f5f5f5",
      };
    case "inactive":
      return {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d8d8",
      };
    case "archived":
      return {
        background: "rgba(255, 99, 71, 0.12)",
        border: "1px solid rgba(255, 99, 71, 0.28)",
        color: "#ffb29b",
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
    case "active":
      return { event_type: "location_activated", event_label: "Location activated" };
    case "inactive":
      return { event_type: "location_inactivated", event_label: "Location inactivated" };
    case "archived":
      return { event_type: "location_archived", event_label: "Location archived" };
    default:
      return { event_type: "location_updated", event_label: "Location updated" };
  }
}

function getAvailableActions(currentStatus: string) {
  if (currentStatus === "active") return ["inactive", "archived"];
  if (currentStatus === "inactive") return ["active", "archived"];
  if (currentStatus === "pending") return ["active", "inactive", "archived"];
  return ["active"];
}

export default async function AdminLocationsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  async function createLocation(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const accountId = String(formData.get("account_id") ?? "");
    const locationName = String(formData.get("location_name") ?? "").trim();
    const addressLine1 = String(formData.get("address_line_1") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();
    const province = String(formData.get("province") ?? "").trim();
    const postalCode = String(formData.get("postal_code") ?? "").trim();
    const contactName = String(formData.get("contact_name") ?? "").trim();
    const contactPhone = String(formData.get("contact_phone") ?? "").trim();

    if (!accountId || !addressLine1) return;

    const { data: location, error } = await supabase
      .from("locations")
      .insert({
        account_id: accountId,
        location_name: locationName || null,
        address_line_1: addressLine1,
        city: city || null,
        province: province || null,
        postal_code: postalCode || null,
        contact_name: contactName || null,
        contact_phone: contactPhone || null,
        status: "active",
      })
      .select(`
        id,
        location_name,
        address_line_1,
        city,
        province,
        postal_code,
        contact_name,
        contact_phone,
        status
      `)
      .single();

    if (error || !location) {
      console.error("Failed to create location:", error?.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "location",
      entity_id: location.id,
      event_type: "location_created",
      event_label: "Location created",
      notes: `Location created: ${location.location_name ?? location.address_line_1}`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "location",
      entity_id: location.id,
      action: "create",
      after_state: {
        location_name: location.location_name,
        address_line_1: location.address_line_1,
        city: location.city,
        province: location.province,
        postal_code: location.postal_code,
        contact_name: location.contact_name,
        contact_phone: location.contact_phone,
        status: location.status,
      },
      source_interface: "admin_locations_create",
    });

    revalidatePath("/admin/locations");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  async function updateLocationDetails(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const locationId = String(formData.get("location_id") ?? "");
    const locationName = String(formData.get("location_name") ?? "").trim();
    const addressLine1 = String(formData.get("address_line_1") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();
    const province = String(formData.get("province") ?? "").trim();
    const postalCode = String(formData.get("postal_code") ?? "").trim();
    const contactName = String(formData.get("contact_name") ?? "").trim();
    const contactPhone = String(formData.get("contact_phone") ?? "").trim();

    if (!locationId || !addressLine1) return;

    const { data: before, error: beforeError } = await supabase
      .from("locations")
      .select("*")
      .eq("id", locationId)
      .single();

    if (beforeError || !before) {
      console.error("Failed loading location before update:", beforeError?.message);
      return;
    }

    const beforeState = {
      location_name: before.location_name,
      address_line_1: before.address_line_1,
      city: before.city,
      province: before.province,
      postal_code: before.postal_code,
      contact_name: before.contact_name,
      contact_phone: before.contact_phone,
    };

    const afterState = {
      location_name: locationName || null,
      address_line_1: addressLine1,
      city: city || null,
      province: province || null,
      postal_code: postalCode || null,
      contact_name: contactName || null,
      contact_phone: contactPhone || null,
    };

    const noChanges =
      beforeState.location_name === afterState.location_name &&
      beforeState.address_line_1 === afterState.address_line_1 &&
      beforeState.city === afterState.city &&
      beforeState.province === afterState.province &&
      beforeState.postal_code === afterState.postal_code &&
      beforeState.contact_name === afterState.contact_name &&
      beforeState.contact_phone === afterState.contact_phone;

    if (noChanges) return;

    const { error } = await supabase
      .from("locations")
      .update(afterState)
      .eq("id", locationId);

    if (error) {
      console.error("Failed updating location details:", error.message);
      return;
    }

    await supabase.from("lifecycle_events").insert({
      account_id: before.account_id,
      entity_type: "location",
      entity_id: locationId,
      event_type: "location_updated",
      event_label: "Location updated",
      notes: `Location updated: ${locationName || addressLine1}`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "location",
      entity_id: locationId,
      action: "update",
      before_state: beforeState,
      after_state: afterState,
      source_interface: "admin_locations_edit",
    });

    revalidatePath("/admin/locations");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  async function updateLocationStatus(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const locationId = String(formData.get("location_id") ?? "");
    const accountId = String(formData.get("account_id") ?? "");
    const locationName = String(formData.get("location_name") ?? "");
    const currentStatus = String(formData.get("current_status") ?? "");
    const nextStatus = String(formData.get("next_status") ?? "");

    if (!locationId || !nextStatus) return;
    if (currentStatus === nextStatus) return;

    const { error } = await supabase
      .from("locations")
      .update({ status: nextStatus })
      .eq("id", locationId);

    if (error) {
      console.error("Failed updating location status:", error.message);
      return;
    }

    const meta = getEventMeta(nextStatus);

    await supabase.from("lifecycle_events").insert({
      account_id: accountId,
      entity_type: "location",
      entity_id: locationId,
      event_type: meta.event_type,
      event_label: meta.event_label,
      notes: `Location ${locationName || locationId} moved from ${currentStatus || "unknown"} to ${nextStatus}.`,
    });

    await (supabase as any).from("audit_logs").insert({
      entity_type: "location",
      entity_id: locationId,
      action: "status_change",
      before_state: { status: currentStatus || null },
      after_state: { status: nextStatus },
      source_interface: "admin_locations_status",
    });

    revalidatePath("/admin/locations");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  const [{ data, error }, { data: accountsData }] = await Promise.all([
    supabase
      .from("locations")
      .select(`
        id,
        location_name,
        address_line_1,
        city,
        province,
        postal_code,
        contact_name,
        contact_phone,
        status,
        account_id,
        accounts ( account_name )
      `)
      .order("created_at", { ascending: false }),
    supabase
      .from("accounts")
      .select("id, account_name")
      .neq("status", "archived")
      .order("account_name", { ascending: true }),
  ]);

  const locations = (data as Location[] | null) ?? [];
  const accountOptions = (accountsData as AccountOption[] | null) ?? [];

  const totalLocations = locations.length;
  const activeLocations = locations.filter((l) => l.status === "active").length;
  const pendingLocations = locations.filter((l) => l.status === "pending").length;
  const inactiveLocations = locations.filter((l) => l.status === "inactive").length;
  const archivedLocations = locations.filter((l) => l.status === "archived").length;

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
            Location Control
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.72)",
              margin: 0,
              maxWidth: "900px",
              lineHeight: 1.65,
            }}
          >
            Create sites, manage service addresses, update site contacts, and
            control location lifecycle from one premium operator-grade surface.
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
            { label: "Total Locations", value: totalLocations },
            { label: "Active", value: activeLocations },
            { label: "Pending", value: pendingLocations },
            { label: "Inactive", value: inactiveLocations },
            { label: "Archived", value: archivedLocations },
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
              Create Location
            </h2>
          </div>

          <div style={{ padding: "20px 22px" }}>
            <form action={createLocation} style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "12px",
                }}
              >
                <select name="account_id" required style={textInput}>
                  <option value="">Select Account</option>
                  {accountOptions.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.account_name}
                    </option>
                  ))}
                </select>

                <input
                  name="location_name"
                  placeholder="Location Name"
                  style={textInput}
                />

                <input
                  name="address_line_1"
                  placeholder="Address Line 1"
                  required
                  style={textInput}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "12px",
                }}
              >
                <input name="city" placeholder="City" style={textInput} />
                <input name="province" placeholder="Province" style={textInput} />
                <input name="postal_code" placeholder="Postal Code" style={textInput} />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <input name="contact_name" placeholder="Site Contact Name" style={textInput} />
                <input name="contact_phone" placeholder="Site Contact Phone" style={textInput} />
              </div>

              <div>
                <button style={actionButtonGold} type="submit">
                  Create Location
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
              Error loading locations: {error.message}
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
                Location Register
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "1800px",
                }}
              >
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)", textAlign: "left" }}>
                    <th style={headerCell}>Location Name</th>
                    <th style={headerCell}>Account</th>
                    <th style={headerCell}>Address</th>
                    <th style={headerCell}>City</th>
                    <th style={headerCell}>Province</th>
                    <th style={headerCell}>Postal Code</th>
                    <th style={headerCell}>Site Contact</th>
                    <th style={headerCell}>Phone</th>
                    <th style={headerCell}>Status</th>
                    <th style={headerCell}>Immediate Actions</th>
                    <th style={headerCell}>Save Details</th>
                  </tr>
                </thead>

                <tbody>
                  {locations.length ? (
                    locations.map((location) => {
                      const currentStatus = location.status ?? "active";
                      const availableActions = getAvailableActions(currentStatus);

                      return (
                        <tr
                          key={location.id}
                          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <td style={bodyCell}>
                            <form action={updateLocationDetails}>
                              <input type="hidden" name="location_id" value={location.id} />
                              <input
                                type="hidden"
                                name="address_line_1"
                                value={location.address_line_1}
                              />
                              <input type="hidden" name="city" value={location.city ?? ""} />
                              <input type="hidden" name="province" value={location.province ?? ""} />
                              <input type="hidden" name="postal_code" value={location.postal_code ?? ""} />
                              <input type="hidden" name="contact_name" value={location.contact_name ?? ""} />
                              <input type="hidden" name="contact_phone" value={location.contact_phone ?? ""} />
                              <input
                                name="location_name"
                                defaultValue={location.location_name ?? ""}
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            {location.accounts?.[0]?.account_name ?? "—"}
                          </td>

                          <td style={bodyCell}>
                            <form action={updateLocationDetails}>
                              <input type="hidden" name="location_id" value={location.id} />
                              <input type="hidden" name="location_name" value={location.location_name ?? ""} />
                              <input type="hidden" name="city" value={location.city ?? ""} />
                              <input type="hidden" name="province" value={location.province ?? ""} />
                              <input type="hidden" name="postal_code" value={location.postal_code ?? ""} />
                              <input type="hidden" name="contact_name" value={location.contact_name ?? ""} />
                              <input type="hidden" name="contact_phone" value={location.contact_phone ?? ""} />
                              <input
                                name="address_line_1"
                                defaultValue={location.address_line_1}
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateLocationDetails}>
                              <input type="hidden" name="location_id" value={location.id} />
                              <input type="hidden" name="location_name" value={location.location_name ?? ""} />
                              <input type="hidden" name="address_line_1" value={location.address_line_1} />
                              <input type="hidden" name="province" value={location.province ?? ""} />
                              <input type="hidden" name="postal_code" value={location.postal_code ?? ""} />
                              <input type="hidden" name="contact_name" value={location.contact_name ?? ""} />
                              <input type="hidden" name="contact_phone" value={location.contact_phone ?? ""} />
                              <input
                                name="city"
                                defaultValue={location.city ?? ""}
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateLocationDetails}>
                              <input type="hidden" name="location_id" value={location.id} />
                              <input type="hidden" name="location_name" value={location.location_name ?? ""} />
                              <input type="hidden" name="address_line_1" value={location.address_line_1} />
                              <input type="hidden" name="city" value={location.city ?? ""} />
                              <input type="hidden" name="postal_code" value={location.postal_code ?? ""} />
                              <input type="hidden" name="contact_name" value={location.contact_name ?? ""} />
                              <input type="hidden" name="contact_phone" value={location.contact_phone ?? ""} />
                              <input
                                name="province"
                                defaultValue={location.province ?? ""}
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateLocationDetails}>
                              <input type="hidden" name="location_id" value={location.id} />
                              <input type="hidden" name="location_name" value={location.location_name ?? ""} />
                              <input type="hidden" name="address_line_1" value={location.address_line_1} />
                              <input type="hidden" name="city" value={location.city ?? ""} />
                              <input type="hidden" name="province" value={location.province ?? ""} />
                              <input type="hidden" name="contact_name" value={location.contact_name ?? ""} />
                              <input type="hidden" name="contact_phone" value={location.contact_phone ?? ""} />
                              <input
                                name="postal_code"
                                defaultValue={location.postal_code ?? ""}
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateLocationDetails}>
                              <input type="hidden" name="location_id" value={location.id} />
                              <input type="hidden" name="location_name" value={location.location_name ?? ""} />
                              <input type="hidden" name="address_line_1" value={location.address_line_1} />
                              <input type="hidden" name="city" value={location.city ?? ""} />
                              <input type="hidden" name="province" value={location.province ?? ""} />
                              <input type="hidden" name="postal_code" value={location.postal_code ?? ""} />
                              <input type="hidden" name="contact_phone" value={location.contact_phone ?? ""} />
                              <input
                                name="contact_name"
                                defaultValue={location.contact_name ?? ""}
                                style={textInput}
                              />
                            </form>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateLocationDetails}>
                              <input type="hidden" name="location_id" value={location.id} />
                              <input type="hidden" name="location_name" value={location.location_name ?? ""} />
                              <input type="hidden" name="address_line_1" value={location.address_line_1} />
                              <input type="hidden" name="city" value={location.city ?? ""} />
                              <input type="hidden" name="province" value={location.province ?? ""} />
                              <input type="hidden" name="postal_code" value={location.postal_code ?? ""} />
                              <input type="hidden" name="contact_name" value={location.contact_name ?? ""} />
                              <input
                                name="contact_phone"
                                defaultValue={location.contact_phone ?? ""}
                                style={textInput}
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

                          <td style={bodyCell}>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                              {availableActions.map((nextStatus) => (
                                <form key={nextStatus} action={updateLocationStatus}>
                                  <input type="hidden" name="location_id" value={location.id} />
                                  <input type="hidden" name="account_id" value={location.account_id} />
                                  <input
                                    type="hidden"
                                    name="location_name"
                                    value={location.location_name ?? location.address_line_1}
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
                                      nextStatus === "active"
                                        ? actionButtonGold
                                        : nextStatus === "archived"
                                          ? actionButtonDanger
                                          : actionButton
                                    }
                                  >
                                    {nextStatus === "active"
                                      ? "Activate"
                                      : nextStatus === "inactive"
                                        ? "Inactivate"
                                        : nextStatus === "archived"
                                          ? "Archive"
                                          : nextStatus}
                                  </button>
                                </form>
                              ))}
                            </div>
                          </td>

                          <td style={bodyCell}>
                            <form action={updateLocationDetails} style={{ display: "grid", gap: "8px", minWidth: "200px" }}>
                              <input type="hidden" name="location_id" value={location.id} />
                              <input
                                name="location_name"
                                defaultValue={location.location_name ?? ""}
                                placeholder="Location Name"
                                style={textInput}
                              />
                              <input
                                name="address_line_1"
                                defaultValue={location.address_line_1}
                                placeholder="Address"
                                style={textInput}
                              />
                              <input
                                name="city"
                                defaultValue={location.city ?? ""}
                                placeholder="City"
                                style={textInput}
                              />
                              <input
                                name="province"
                                defaultValue={location.province ?? ""}
                                placeholder="Province"
                                style={textInput}
                              />
                              <input
                                name="postal_code"
                                defaultValue={location.postal_code ?? ""}
                                placeholder="Postal Code"
                                style={textInput}
                              />
                              <input
                                name="contact_name"
                                defaultValue={location.contact_name ?? ""}
                                placeholder="Contact Name"
                                style={textInput}
                              />
                              <input
                                name="contact_phone"
                                defaultValue={location.contact_phone ?? ""}
                                placeholder="Contact Phone"
                                style={textInput}
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
                      <td style={bodyCell} colSpan={11}>
                        No locations found.
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

const textInput: React.CSSProperties = {
  background: "#111",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "10px",
  padding: "8px 10px",
  fontSize: "12px",
  minWidth: "130px",
};