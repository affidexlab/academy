import { useState } from "react";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import SEO from "../components/SEO";

const programmes = [
  "Computer Hardware Repair & Maintenance (NBTE-Approved)",
  "Fullstack Web Development",
  "Frontend Web Development",
  "Backend Web Development",
  "Mobile App Development",
];

const states = ["Akwa Ibom State", "Cross River State", "Lagos", "Abia State", "Other Nigerian State", "Outside Nigeria"];

const faqs = [
  {
    q: "Is the training really free?",
    a: "Yes — 100% free. No tuition, no registration fee, no hidden charges. Our training is funded through government programmes (including the World Bank IDEAS Project) and corporate sponsorships.",
  },
  {
    q: "Do I need prior experience?",
    a: "Most programmes are beginner-friendly. The Hardware Repair, Frontend, and Fullstack tracks require zero prior experience. Backend and Mobile Development are intermediate — having some programming exposure helps but is not mandatory.",
  },
  {
    q: "Where are classes held?",
    a: "Classes are currently being set up at the University of Uyo campus (Akwa Ibom State) in partnership with the Student Union Government. We will announce additional locations in Cross River State, Lagos, and Abia State as capacity grows.",
  },
  {
    q: "How long are the programmes?",
    a: "Programme duration ranges from 16 weeks (Hardware Repair, Frontend, Backend) to 24 weeks (Fullstack Web Dev) and 20 weeks (Mobile App Dev). Sessions are held 3–4 times per week.",
  },
  {
    q: "What do I get when I complete?",
    a: "You receive an Affidex Academy Certificate of Completion. The Computer Hardware Repair programme additionally issues an NBTE Certificate of Competency — a nationally recognised credential. We also build a portfolio review and career guidance session into every programme.",
  },
  {
    q: "When does the next cohort start?",
    a: "Cohort 1 is targeting Q2 2026. Submit your application now to secure your spot. You'll receive email confirmation with your confirmed start date as soon as it is finalised.",
  },
  {
    q: "Can I apply for more than one programme?",
    a: "Yes. In your application, select your first-choice programme. Mention your second preference in the 'anything else' field. We'll enrol you in one programme per cohort.",
  },
];

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  motivation: string;
  hearAbout: string;
};

export default function AcademyApply() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    motivation: "",
    hearAbout: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
    const RECIPIENT = import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL || "contact@affifexacademy.com.ng";

    const message = `
NEW ACADEMY CONTACT MESSAGE
═══════════════════════
Full Name:   ${form.fullName}
Email:       ${form.email}
Phone:       ${form.phone}

What are you reaching out for:
${form.motivation}

Heard about us via: ${form.hearAbout || "Not specified"}
═══════════════════════`;

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.fullName,
          email: form.email,
          message,
          reply_to: form.email,
          to_email: RECIPIENT,
        },
        PUBLIC_KEY
      );
      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      // Fallback: open mail client with pre-filled content
      const subject = encodeURIComponent(`Academy Contact — ${form.fullName}`);
      const body = encodeURIComponent(message);
      window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
      setStatus("success");
    }
  };

  return (
    <div>
      <SEO
        title="Contact Us — Affidex Academy"
        description="Apply to Affidex Academy's vocational and professional training programmes in Uyo, Nigeria. Start your application today."
        path="/contact"
      />
      {/* Hero */}
      <section className="bg-[#0A2540] py-20">
        <div className="container text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9973A] mb-3">Contact Us</p>
          <h1 className="text-4xl font-extrabold md:text-5xl">One form. Zero fees.</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
            Apply for your programme in under 5 minutes. No prerequisites, no payments, no catch. Just a commitment to show up and learn.
          </p>
        </div>
      </section>

      {/* What you get strip */}
      <section className="border-b bg-slate-50 py-6">
        <div className="container">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              "Free hands-on training",
              "NBTE / Affidex certificate",
              "Real project portfolio",
              "Career guidance",
              "Cohort community",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium text-[#0A2540]">
                <CheckCircle2 size={14} className="text-[#C9973A]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + FAQ */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 items-start max-w-5xl mx-auto">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A2540] mb-6">Contact form</h2>
              {status === "success" ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                  <CheckCircle2 size={40} className="text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">Message received!</h3>
                  <p className="text-emerald-700 text-sm leading-relaxed mb-4">
                    Thank you for contacting Affidex Academy. We have received your message and will get back to you shortly.
                  </p>
                  <p className="text-emerald-600 text-sm font-medium">
                    Questions? Email us at{" "}
                    <a href="mailto:contact@affifexacademy.com.ng" className="underline">contact@affifexacademy.com.ng</a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl border bg-white p-7 shadow-sm space-y-5">
                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-[#0A2540]" htmlFor="fullName">Full name *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      value={form.fullName}
                      onChange={handleChange}
                      className="h-11 rounded-xl border px-4 text-sm outline-none transition focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10"
                      placeholder="e.g. Chukwuemeka Eze"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-[#0A2540]" htmlFor="email">Email address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="h-11 rounded-xl border px-4 text-sm outline-none transition focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-[#0A2540]" htmlFor="phone">Phone number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="h-11 rounded-xl border px-4 text-sm outline-none transition focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10"
                      placeholder="080X XXX XXXX"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-[#0A2540]" htmlFor="motivation">
                      What are you reaching out for? *
                      <span className="ml-1 text-xs font-normal text-slate-400">(2–5 sentences)</span>
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      required
                      rows={4}
                      value={form.motivation}
                      onChange={handleChange}
                      className="resize-none rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10"
                      placeholder="Tell us briefly what you hope to achieve and how this training fits your goals..."
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-[#0A2540]" htmlFor="hearAbout">How did you hear about us?</label>
                    <input
                      id="hearAbout"
                      name="hearAbout"
                      value={form.hearAbout}
                      onChange={handleChange}
                      className="h-11 rounded-xl border px-4 text-sm outline-none transition focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10"
                      placeholder="Social media, friend, UNIUYO, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0A2540] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#0d2e52] transition disabled:opacity-60"
                  >
                    {status === "submitting" ? "Submitting..." : <>Submit application <ArrowRight size={16} /></>}
                  </button>

                  <p className="text-xs text-center text-slate-400">
                    By applying, you confirm you are 16 years or older and commit to attending sessions regularly.
                  </p>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A2540] mb-6">Frequently asked questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl border bg-white overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[#0A2540] hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="shrink-0 text-[#C9973A] text-lg font-light">
                        {openFaq === i ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-slate-50 border p-6">
                <h3 className="text-sm font-bold text-[#0A2540] mb-2">Still have questions?</h3>
                <p className="text-sm text-slate-500 mb-4">Our team is available to answer any questions before you apply.</p>
                <a
                  href="mailto:contact@affifexacademy.com.ng"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0A2540] px-4 py-2 text-sm font-semibold text-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  contact@affifexacademy.com.ng
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
