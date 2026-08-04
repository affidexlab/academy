import SEO from "../components/SEO";
import { Shield, Lock, FileText, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <SEO
        title="Privacy Policy — Affidex Academy"
        description="Learn about how Affidex Academy collects, uses, and protects your personal information and application data."
        path="/privacy-policy"
      />

      {/* Hero */}
      <section className="bg-[#0A2540] py-16 md:py-24 text-white">
        <div className="container flex flex-col gap-4">
          <div className="w-fit inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 text-[#C9973A] mb-4">
            <Shield size={14} /> Privacy & Data Protection
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold">Privacy Policy</h1>
          <p className="mt-4 text-slate-300 text-sm md:text-base">
            Your privacy is important to us. This policy outlines how Affidex Academy Limited collects, handles, and safeguards your personal data.
          </p>
          <p className="mt-2 text-xs text-slate-400">Last updated: August 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 md:py-20">
        <div className="container flex flex-col gap-4 text-slate-700 leading-relaxed">
          <div className="rounded-2xl border p-6 md:p-8 bg-slate-50 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[#0A2540] font-bold text-lg">
              <Lock size={20} className="text-[#C9973A]" />
              <span>1. Information We Collect</span>
            </div>
            <p className="text-sm text-slate-600">
              When you apply for a programme or contact Affidex Academy via our online forms, website, or offline registration drives, we collect personal details including:
            </p>
            <ul className="grid gap-2 sm:grid-cols-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C9973A]" /> Full Name & Contact Details</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C9973A]" /> Email Address & Phone Number</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C9973A]" /> Educational background & track preferences</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C9973A]" /> Location / State of Residence</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0A2540]">2. How We Use Your Information</h2>
            <p className="text-sm text-slate-600">
              The information collected is used solely for institutional purposes, including:
            </p>
            <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
              <li>Processing your training programme applications and cohort assignments.</li>
              <li>Communicating schedule updates, interview notices, and learning material.</li>
              <li>Verifying eligibility for government and partner-funded TVET initiatives (e.g. stipend disbursements where applicable).</li>
              <li>Measuring program outcomes, graduation rates, and post-training employment metrics.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0A2540]">3. Data Sharing & Third Parties</h2>
            <p className="text-sm text-slate-600">
              Affidex Academy does not sell, rent, or trade student personal data to any commercial third parties. We may share anonymized or required verified data only with official accreditation and partner bodies (such as NBTE, SMEDAN, or funding partners) for audit and certification purposes.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0A2540]">4. Data Security</h2>
            <p className="text-sm text-slate-600">
              We implement appropriate technical, administrative, and physical security measures to prevent unauthorized access, disclosure, or alteration of your personal data.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0A2540]">5. Your Rights & Contact</h2>
            <p className="text-sm text-slate-600">
              You have the right to request access to, correction of, or deletion of your personal data at any time. For questions or requests regarding your data, please contact our Data Protection Officer at:
            </p>
            <div className="rounded-xl border p-4 bg-slate-50 flex flex-col gap-2 text-sm">
              <p className="font-semibold text-[#0A2540]">Affidex Academy Limited</p>
              <p>Email: <a href="mailto:contact@affidexacademy.com.ng" className="text-[#0A2540] font-bold underline">contact@affidexacademy.com.ng</a> / <a href="mailto:affidexacademy@gmail.com" className="text-[#0A2540] font-bold underline">affidexacademy@gmail.com</a></p>
              <p>Address: 50 Udo Udoma Avenue, Uyo, Akwa Ibom State, Nigeria</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
