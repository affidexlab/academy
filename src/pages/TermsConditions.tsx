import SEO from "../components/SEO";
import { FileText, CheckCircle2, Award } from "lucide-react";

export default function TermsConditions() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <SEO
        title="Terms & Conditions — Affidex Academy"
        description="Review the terms and conditions governing enrollment, code of conduct, and participation in Affidex Academy programmes."
        path="/terms-and-conditions"
      />

      {/* Hero */}
      <section className="bg-[#0A2540] py-16 md:py-24 text-white">
        <div className="container flex flex-col gap-4">
          <div className="w-fit inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 text-[#C9973A] mb-4">
            <FileText size={14} /> Institutional Governance
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold">Terms & Conditions</h1>
          <p className="mt-4 text-slate-300 text-sm md:text-base">
            Please read these terms and conditions carefully before applying for or enrolling in any Affidex Academy programme.
          </p>
          <p className="mt-2 text-xs text-slate-400">Last updated: August 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 md:py-20">
        <div className="container flex flex-col gap-4 text-slate-700 leading-relaxed">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0A2540]">1. Enrollment & Admission</h2>
            <p className="text-sm text-slate-600">
              Admission into Affidex Academy training programmes is subject to availability, meeting basic track criteria, and compliance with onboarding guidelines. Submission of an application form does not automatically guarantee a place in a specific cohort.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0A2540]">2. Code of Conduct & Attendance</h2>
            <p className="text-sm text-slate-600">
              Students admitted into any physical or blended programme must maintain a minimum of 80% class attendance and adhere to ethical workplace behavior, professional courtesy, and safety standards at all Affidex facilities.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0A2540]">3. Certification & Stipends</h2>
            <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
              <li>Certificates of Completion and NBTE Competency Certificates are awarded only to candidates who satisfy curriculum requirements, pass final practical assessments, and complete mandatory project work.</li>
              <li>For government or partner-sponsored initiatives featuring trainee stipends (such as the NBTE TVET Initiative), stipend disbursements are strictly dependent on verified attendance and satisfactory academic progression.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0A2540]">4. Intellectual Property</h2>
            <p className="text-sm text-slate-600">
              All learning materials, courseware, lab frameworks, and software tools provided by Affidex Academy remain the intellectual property of Affidex Academy Limited or its licensors. Projects created by students during their course of study remain the property of the respective students.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#0A2540]">5. Amendments</h2>
            <p className="text-sm text-slate-600">
              Affidex Academy reserves the right to update these terms as required by regulatory authorities or operational requirements. Notice of significant changes will be communicated to enrolled students.
            </p>
          </div>

          <div className="rounded-xl border p-4 bg-slate-50 flex flex-col gap-2 text-sm">
            <p className="font-semibold text-[#0A2540]">Inquiries regarding Terms & Conditions:</p>
            <p>Email: <a href="mailto:contact@affidexacademy.com.ng" className="text-[#0A2540] font-bold underline">contact@affidexacademy.com.ng</a> / <a href="mailto:affidexacademy@gmail.com" className="text-[#0A2540] font-bold underline">affidexacademy@gmail.com</a></p>
            <p>Phone: +234 813 398 5352</p>
          </div>
        </div>
      </section>
    </div>
  );
}
