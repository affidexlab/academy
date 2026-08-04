import { useState } from "react";
import { CheckCircle2, ArrowRight, Mail, MapPin, Phone, Building2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import SEO from "../components/SEO";

const programmesList = [
  "Computer Hardware Repair & Maintenance (NBTE TVET - 16 Wks)",
  "Fullstack Web Development (NBTE TVET - 24 Wks)",
  "Frontend Web Development (NBTE TVET - 16 Wks)",
  "Backend Web Development (NBTE TVET - 16 Wks)",
  "Mobile App Development (NBTE TVET - 20 Wks)",
  "Digital Foundations & Workplace Readiness (4 Wks)",
  "Coding, Web & Product Foundations (8 Wks)",
  "Digital Marketing & Sales Operations (6 Wks)",
  "UI/UX & Product Design (6 Wks)",
  "Data & AI Productivity for Business (6 Wks)",
  "ICT Support & Hardware Services (6 Wks)",
  "Other / Corporate Inquiry",
];

const cohortsList = [
  "Morning Cohort (9:00 AM – 1:00 PM)",
  "Afternoon Cohort (1:30 PM – 5:00 PM)",
  "Weekend / Flexible Cohort",
  "Blended / Virtual Support Pathway",
];

const faqs = [
  {
    q: "Is the training really free?",
    a: "Yes — 100% free tuition. No registration fee, no hidden charges. Training is supported through partner initiatives and federal TVET programs.",
  },
  {
    q: "Do I need prior experience?",
    a: "Most programmes are beginner-friendly. Digital Foundations, Hardware Repair, Frontend, and UI/UX require zero prior experience.",
  },
  {
    q: "Where are classes held?",
    a: "Classes are held across our two training facilities in Uyo: IPPN Centre at 50 Udo Udoma Avenue and our Main Campus facility in Uyo, Akwa Ibom State.",
  },
  {
    q: "How long are the programmes?",
    a: "Short-term skill tracks run 4–8 weeks. The NBTE TVET Initiative runs 16–24 weeks with ₦30,000 monthly stipends for trainees.",
  },
  {
    q: "What credentials do I get?",
    a: "You receive an Affidex Academy Certificate of Completion. Computer Hardware Repair & TVET track trainees receive an NBTE Certificate of Competency.",
  },
];

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  programmeTrack: string;
  cohortPreference: string;
  motivation: string;
  hearAbout: string;
};

export default function AcademyContact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    programmeTrack: programmesList[0],
    cohortPreference: cohortsList[0],
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
    const RECIPIENT = import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL || "contact@affidexacademy.com.ng";

    const message = `
NEW ACADEMY APPLICATION / CONTACT
══════════════════════════════════
Full Name:         ${form.fullName}
Email:             ${form.email}
Phone:             ${form.phone}
Selected Track:    ${form.programmeTrack}
Cohort Preference: ${form.cohortPreference}

Motivation / Goals:
${form.motivation}

Heard about us via: ${form.hearAbout || "Not specified"}
══════════════════════════════════`;

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
      const subject = encodeURIComponent(`Academy Application — ${form.fullName}`);
      const body = encodeURIComponent(message);
      window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
      setStatus("success");
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <SEO
        title="Contact & Application — Affidex Academy"
        description="Apply for Affidex Academy's vocational programmes or reach out to our team in Uyo, Akwa Ibom State."
        path="/contact"
      />

      {/* Hero */}
      <section className="bg-[#0A2540] py-16 md:py-20 text-white text-center">
        <div className="container max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C9973A] mb-3">Application & Support</p>
          <h1 className="text-3xl md:text-5xl font-extrabold">Start Your Journey Today</h1>
          <p className="mt-4 text-base md:text-lg text-slate-300">
            Select your preferred training track and cohort timing. Zero tuition, industry credentials, and dedicated facilitator support.
          </p>
        </div>
      </section>

      {/* Highlights Strip */}
      <section className="border-b bg-slate-50 py-5">
        <div className="container flex flex-wrap gap-4 justify-center">
          {["100% Free Tuition", "NBTE & Affidex Credentials", "Flexible Cohorts", "Uyo Facilities"].map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs font-bold text-[#0A2540]">
              <CheckCircle2 size={14} className="text-[#C9973A]" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Main Content: Form + Info/FAQ */}
      <section className="bg-white py-12 md:py-16">
        <div className="container max-w-6xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-start">
            {/* Form */}
            <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-xs flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#0A2540]">Application Form</h2>
                <p className="text-xs text-slate-500 mt-1">Fill in your details to secure your spot in an upcoming cohort.</p>
              </div>

              {status === "success" ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center flex flex-col gap-4">
                  <CheckCircle2 size={44} className="text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-bold text-emerald-900">Application Submitted!</h3>
                  <p className="text-emerald-700 text-sm leading-relaxed">
                    Thank you for applying to Affidex Academy. We have received your application and track preferences. Our team will email you with your cohort schedule.
                  </p>
                  <p className="text-xs text-emerald-600 font-semibold">
                    Questions? Email <a href="mailto:contact@affidexacademy.com.ng" className="underline">contact@affidexacademy.com.ng</a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-1.5">
                    <label className="text-xs font-bold text-[#0A2540]" htmlFor="fullName">Full Name *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      value={form.fullName}
                      onChange={handleChange}
                      className="h-11 rounded-xl border px-4 text-sm outline-none transition focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10"
                      placeholder="e.g. Samuel Utibe-Abasi"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <label className="text-xs font-bold text-[#0A2540]" htmlFor="email">Email Address *</label>
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
                    <div className="grid gap-1.5">
                      <label className="text-xs font-bold text-[#0A2540]" htmlFor="phone">Phone / WhatsApp *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="h-11 rounded-xl border px-4 text-sm outline-none transition focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10"
                        placeholder="0813 398 5352"
                      />
                    </div>
                  </div>

                  {/* Programme Dropdown */}
                  <div className="grid gap-1.5">
                    <label className="text-xs font-bold text-[#0A2540]" htmlFor="programmeTrack">Select Programme Track *</label>
                    <select
                      id="programmeTrack"
                      name="programmeTrack"
                      value={form.programmeTrack}
                      onChange={handleChange}
                      className="h-11 rounded-xl border px-4 text-sm outline-none transition bg-white focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10"
                    >
                      {programmesList.map((prog, i) => (
                        <option key={i} value={prog}>{prog}</option>
                      ))}
                    </select>
                  </div>

                  {/* Cohort Dropdown */}
                  <div className="grid gap-1.5">
                    <label className="text-xs font-bold text-[#0A2540]" htmlFor="cohortPreference">Cohort Preference *</label>
                    <select
                      id="cohortPreference"
                      name="cohortPreference"
                      value={form.cohortPreference}
                      onChange={handleChange}
                      className="h-11 rounded-xl border px-4 text-sm outline-none transition bg-white focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10"
                    >
                      {cohortsList.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-xs font-bold text-[#0A2540]" htmlFor="motivation">
                      What are your learning goals? *
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      required
                      rows={3}
                      value={form.motivation}
                      onChange={handleChange}
                      className="resize-none rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10"
                      placeholder="Briefly explain what you hope to achieve through this training..."
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-xs font-bold text-[#0A2540]" htmlFor="hearAbout">How did you hear about us?</label>
                    <input
                      id="hearAbout"
                      name="hearAbout"
                      value={form.hearAbout}
                      onChange={handleChange}
                      className="h-11 rounded-xl border px-4 text-sm outline-none transition focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10"
                      placeholder="Social media, friend, referral, banner, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0A2540] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#0d2e52] transition disabled:opacity-60"
                  >
                    {status === "submitting" ? "Submitting Application..." : <>Submit Application <ArrowRight size={16} /></>}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar: Contact Details + FAQs */}
            <div className="flex flex-col gap-4">
              {/* Direct Info */}
              <div className="rounded-2xl border bg-slate-50 p-6 flex flex-col gap-4">
                <h3 className="text-base font-extrabold text-[#0A2540]">Contact Information</h3>
                <ul className="flex flex-col gap-4 text-xs text-slate-600">
                  <li className="flex items-start gap-3">
                    <Mail size={16} className="text-[#C9973A] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Email Address</p>
                      <a href="mailto:contact@affidexacademy.com.ng" className="hover:underline text-[#0A2540]">contact@affidexacademy.com.ng</a>
                      <br />
                      <a href="mailto:affidexacademy@gmail.com" className="hover:underline text-slate-500">affidexacademy@gmail.com</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone size={16} className="text-[#C9973A] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Phone & WhatsApp</p>
                      <a href="tel:+2348133985352" className="hover:underline text-[#0A2540]">+234 813 398 5352</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#C9973A] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Uyo Facilities</p>
                      <p>IPPN Centre: 50 Udo Udoma Avenue, Uyo</p>
                      <p>Main Campus: 150-seat practical hub, Uyo, Akwa Ibom State</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* FAQs */}
              <div>
                <h3 className="text-lg font-extrabold text-[#0A2540] mb-4">Frequently Asked Questions</h3>
                <div className="flex flex-col gap-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="rounded-xl border bg-white overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-xs font-bold text-[#0A2540] hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <span className="shrink-0 text-[#C9973A]">
                          {openFaq === i ? "−" : "+"}
                        </span>
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-3 text-xs text-slate-600 leading-relaxed border-t pt-2.5 bg-slate-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Location Map Section */}
      <section className="bg-slate-50 py-12 border-t">
        <div className="container flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9973A]">Facility Locations</span>
            <h2 className="text-2xl font-extrabold text-[#0A2540]">Find Our Training Facilities in Uyo</h2>
            <p className="text-xs text-slate-600">
              Visit us at our IPPN Centre on 50 Udo Udoma Avenue or Main Campus in Uyo, Akwa Ibom State.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border bg-white overflow-hidden shadow-xs flex flex-col">
              <div className="p-4 bg-[#0A2540] text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#C9973A]">Centre 1: IPPN Centre</h3>
                  <p className="text-xs text-slate-300">50 Udo Udoma Avenue, Uyo, Akwa Ibom State</p>
                </div>
                <MapPin size={18} className="text-[#C9973A]" />
              </div>
              <div className="h-64 w-full bg-slate-200">
                <iframe
                  title="IPPN Centre Map 50 Udo Udoma Avenue Uyo"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.7738221528646!2d7.9300!3d5.0180!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105d565656565657%3A0x105d565656565657!2sUdo%20Udoma%20Ave%2C%20Uyo!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="rounded-2xl border bg-white overflow-hidden shadow-xs flex flex-col">
              <div className="p-4 bg-[#0A2540] text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#C9973A]">Centre 2: Main Campus Hub</h3>
                  <p className="text-xs text-slate-300">150-Seat Practical Lab, Uyo, Akwa Ibom State</p>
                </div>
                <Building2 size={18} className="text-[#C9973A]" />
              </div>
              <div className="h-64 w-full bg-slate-200">
                <iframe
                  title="Affidex Main Campus Uyo Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.654321098765!2d7.9250!3d5.0350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105d577777777777%3A0x105d577777777777!2sUyo%2C%20Akwa%20Ibom!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
