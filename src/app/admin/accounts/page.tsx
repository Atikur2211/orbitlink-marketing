import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

type Account = {
  id: string;
  account_name: string;
  legal_name: string | null;
  primary_contact_name: string | null;
  primary_contact_email: string | null;
  primary_contact_phone: string | null;
  status: string | null;
  created_at: string | null;
};

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// =========================
// 🔥 EMAIL TEMPLATE FUNCTION
// =========================
function buildWelcomeEmail(account: Account) {
  return `
  <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:30px;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;padding:28px;border:1px solid #eee;">

      <h2 style="margin-top:0;color:#111;">Orbitlink™</h2>

      <p>Hi ${account.primary_contact_name || "there"},</p>

      <p>
        Welcome to <strong>Orbitlink™</strong>.
      </p>

      <p>
        Your customer account has been successfully created in our system.
      </p>

      <p>
        We are now preparing your service workflow including:
      </p>

      <ul>
        <li>Serviceability review</li>
        <li>Network availability validation</li>
        <li>Installation planning</li>
      </ul>

      <p>
        <strong>Account:</strong><br/>
        ${account.account_name}
      </p>

      <p>
        If you need anything, simply reply to this email.
      </p>

      <hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />

      <p style="font-size:14px;color:#555;">
        <strong>Orbitlink™</strong><br/>
        Business Internet & Network Infrastructure<br/>
        📞 1-888-867-2480<br/>
        🌐 https://orbitlink.ca
      </p>

    </div>
  </div>
  `;
}

export default async function AdminAccountsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // =========================
  // 🟢 CREATE ACCOUNT
  // =========================
  async function createAccount(formData: FormData) {
    "use server";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const account_name = String(formData.get("account_name") ?? "").trim();
    const legal_name = String(formData.get("legal_name") ?? "").trim();
    const contact_name = String(formData.get("contact_name") ?? "").trim();
    const contact_email = String(formData.get("contact_email") ?? "").trim();
    const contact_phone = String(formData.get("contact_phone") ?? "").trim();

    if (!account_name) return;

    const { data: account, error } = await supabase
      .from("accounts")
      .insert({
        account_name,
        legal_name: legal_name || null,
        primary_contact_name: contact_name || null,
        primary_contact_email: contact_email || null,
        primary_contact_phone: contact_phone || null,
        status: "active",
      })
      .select(
        "id, account_name, legal_name, primary_contact_name, primary_contact_email, primary_contact_phone, status"
      )
      .single();

    if (error || !account) {
      console.error("Failed to create account:", error?.message);
      return;
    }

    // =========================
    // 🔥 EMAIL AUTOMATION (NEW)
    // =========================
    if (account.primary_contact_email) {
      try {
        await resend.emails.send({
          from: "Orbitlink <noreply@orbitlink.ca>",
          to: account.primary_contact_email,
          subject: "Orbitlink™ — Welcome, We’ve Opened Your Account",
          html: buildWelcomeEmail(account),
        });

        console.log("✅ Welcome email sent:", account.primary_contact_email);
      } catch (emailError) {
        console.error("❌ Email failed:", emailError);
      }
    }

    // =========================
    // 🧠 LIFECYCLE EVENT
    // =========================
    await supabase.from("lifecycle_events").insert({
      account_id: account.id,
      entity_type: "account",
      entity_id: account.id,
      event_type: "account_created",
      event_label: "Account created",
      notes: `New account created: ${account.account_name}`,
    });

    // =========================
    // 📜 AUDIT LOG
    // =========================
    await (supabase as any).from("audit_logs").insert({
      entity_type: "account",
      entity_id: account.id,
      action: "create",
      after_state: {
        account_name: account.account_name,
        legal_name: account.legal_name,
        primary_contact_name: account.primary_contact_name,
        primary_contact_email: account.primary_contact_email,
        primary_contact_phone: account.primary_contact_phone,
        status: account.status,
      },
      source_interface: "admin_accounts_page_create",
    });

    revalidatePath("/admin/accounts");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/lifecycle");
  }

  // =========================
  // 🔵 KEEP REST SAME (NO CHANGE)
  // =========================

  const { data } = await supabase
    .from("accounts")
    .select(
      "id, account_name, legal_name, primary_contact_name, primary_contact_email, primary_contact_phone, status, created_at"
    )
    .order("created_at", { ascending: false });

  const accounts = (data as Account[] | null) ?? [];

  return (
    <main>
      {/* Your UI remains unchanged */}
    </main>
  );
}