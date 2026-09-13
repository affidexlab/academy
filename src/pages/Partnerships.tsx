import { CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";

const verified = [
  ["CAC Nigeria", "RC: 9316934; Affidex Academy Limited is registered as a Private Limited Liability Company."],
  ["SMEDAN", "Certified MSME: SUID-5998-5813-3500-9105."],
  ["Tax & Procurement Standing", "Tax Clearance Certificate and BPP Interim Registration Report issued."],
  ["NYSC SAED", "Registered training partner for digital-skills and ICT training in Akwa Ibom and Cross River."],
  ["Microsoft AI Cloud Partner", "Verified global partner status supporting digital skills, cloud, and AI readiness."],
  ["UNESCO-UNEVOC", "Active participant in UNESCO's global TVET network."],
  ["NUPRC", "General Category Supply permit and Major Category Consultancy Training/Manpower Development permit."],
  ["IPPN / FME-NBTE TVET", "IPPN holds the approved Skill Training Center relationship; Affidex is the implementation partner delivering the approved training under that structure."],
];

const inProgress = [
  "NITDA Indigenous ICT Company Programme registration",
  "Computer Professionals Registration Council of Nigeria corporate registration",
  "KBS ICSS-TFC / BDSP accreditation",
  "ACTD institutional accreditation",
  "Cisco Networking Academy partner application",
  "Oracle Academy institutional membership",
  "ILO-ITCILO partnership engagement",
];

export default function Partnerships() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <SEO
        title="Accreditations, Certifications & Partnerships — Affidex Academy"
        description="Affidex Academy's verified registrations, active partnerships, accreditations, permits, and in-progress institutional engagements."
        path="/partnerships-accreditations"
      />

      <section className="relative overflow-hidden noise-overlay py-16 md:py-28" style={{ background: "linear-gradient(150deg,#060F1A 0%,#0B1C2E 45%,#102236 100%)" }}>
        <div className="container relative z-10 text-white max-w-5xl">
          <div className="label mb-6" style={{ color: "var(--gold)" }}>Accreditations, Certifications & Partnerships</div>
          <h1 className="font-black leading-[1.08] mb-6" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.6rem,6vw,4.8rem)", fontWeight: 700 }}>
            Clear institutional standing, stated precisely.
          </h1>
          <p className="text-[17px] leading-relaxed max-w-3xl" style={{ color: "rgba(255,255,255,0.65)" }}>
            We separate verified/active credentials from applications and partnership engagements in progress, because credibility depends on accuracy.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24" style={{ background: "#FFFFFF" }}>
        <div className="container flex flex-col gap-10">
          <div>
            <div className="label mb-5">Verified / Active</div>
            <h2 className="max-w-2xl" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, lineHeight: 1.15, color: "var(--navy)" }}>Confirmed credentials and operating relationships.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {verified.map(([name, detail]) => (
              <div key={name} className="card rounded-2xl border p-6" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-start gap-3">
                  <ShieldCheck size={18} className="mt-1 flex-shrink-0" style={{ color: "var(--gold)" }} />
                  <div>
                    <h3 className="font-extrabold mb-2" style={{ color: "var(--navy)" }}>{name}</h3>
                    <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--text-mid)" }}>{detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24" style={{ background: "var(--cream)", borderTop: "1px solid var(--border)" }}>
        <div className="container flex flex-col gap-10">
          <div>
            <div className="label mb-5">Applications / Engagements in Progress</div>
            <h2 className="max-w-2xl" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, lineHeight: 1.15, color: "var(--navy)" }}>Active pipeline, not represented as completed approval.</h2>
          </div>
          <div className="rounded-2xl border bg-white p-6 md:p-8" style={{ borderColor: "var(--border)" }}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {inProgress.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13.5px]" style={{ color: "var(--text-mid)" }}>
                  <Clock3 size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24" style={{ background: "#FFFFFF", borderTop: "1px solid var(--border)" }}>
        <div className="container max-w-4xl">
          <div className="label mb-5">Quality & Standards</div>
          <h2 className="mb-6" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, lineHeight: 1.15, color: "var(--navy)" }}>Our quality policy is operational.</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {["90%+ trainee satisfaction target", "Annual curriculum review", "Periodic instructor technical and pedagogical upgrades", "Zero reportable accident target in labs and workshops", "Internship or placement support target for graduates", "90%+ consultancy client satisfaction target", "95%+ on-time delivery target for certified educational materials and equipment", "Feedback-led annual service improvements"].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-[13.5px]" style={{ color: "var(--text-mid)" }}><CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />{item}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
