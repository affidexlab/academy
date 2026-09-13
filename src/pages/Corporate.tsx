import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Building2, Users, Handshake, Truck, Target } from "lucide-react";
import SEO from "../components/SEO";

const partnerDoors = [
  { icon: <Users size={22} />, title: "Corporate Workforce Training", body: "Staff upskilling, digital transformation training, technical training, soft skills, and productivity programmes for employers that need measurable capability growth." },
  { icon: <Building2 size={22} />, title: "Government, NGO & Donor Programmes", body: "TVET delivery, youth employment programmes, women economic empowerment, NYSC/corps member training, and community skills-development implementation." },
  { icon: <Target size={22} />, title: "TVET Consultancy", body: "Curriculum development, training-of-trainers, skills-gap studies, quality assurance, apprenticeship systems, accreditation support, and public-private partnership advisory." },
  { icon: <Truck size={22} />, title: "Procurement & Training-Centre Setup", body: "Computers, ICT labs, GSM repair equipment, photography/office-technology tools, vocational workshop equipment, installation, maintenance, and user training." },
];

const outcomes = [
  "Workforce training mapped to role requirements and practical outcomes",
  "Skills-gap assessment before programme design where required",
  "70% hands-on delivery through labs, workshops, projects, and production-style practice",
  "Implementation across Akwa Ibom, Cross River, Abia, Lagos, and partner locations",
  "Reporting suitable for corporate, government, donor, and institutional stakeholders",
  "Post-training support through internship, placement, enterprise, or equipment-use pathways",
];

export default function Corporate() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <SEO
        title="Corporate, Government & Donor Partnerships — Affidex Academy"
        description="Partner with Affidex Academy for workforce training, TVET programme delivery, consultancy, manpower development, training-centre setup, and procurement across Southern Nigeria."
        path="/corporate-government"
      />

      <section className="relative overflow-hidden noise-overlay py-16 md:py-28" style={{ background: "linear-gradient(150deg,#060F1A 0%,#0B1C2E 45%,#102236 100%)" }}>
        <div className="container relative z-10 text-white max-w-5xl">
          <div className="label mb-6" style={{ color: "var(--gold)" }}>Corporate, Government & Development Partners</div>
          <h1 className="font-black leading-[1.08] mb-6" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.6rem,6vw,4.8rem)", fontWeight: 700 }}>
            Build skills systems, not just one-off training.
          </h1>
          <p className="text-[17px] leading-relaxed max-w-3xl" style={{ color: "rgba(255,255,255,0.65)" }}>
            Affidex supports companies, public institutions, NGOs, donors, and schools with practical workforce training, TVET programme delivery, consultancy, manpower development, and technical procurement.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="btn-gold inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[14px]">Request a Proposal <ArrowRight size={16} /></Link>
            <Link to="/partnerships-accreditations" className="btn-ghost inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[14px]">View Institutional Standing</Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2">
            {partnerDoors.map((item) => (
              <div key={item.title} className="card rounded-2xl border p-6 md:p-8" style={{ borderColor: "var(--border)" }}>
                <div className="mb-5 inline-flex rounded-2xl p-3" style={{ background: "rgba(11,28,46,0.06)", color: "var(--navy)" }}>{item.icon}</div>
                <h2 className="text-[17px] font-extrabold mb-3" style={{ color: "var(--navy)" }}>{item.title}</h2>
                <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-mid)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24" style={{ background: "var(--cream)", borderTop: "1px solid var(--border)" }}>
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div>
            <div className="label mb-5">Delivery Standard</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, lineHeight: 1.15, color: "var(--navy)" }}>
              Practical, measurable, and partner-ready.
            </h2>
          </div>
          <div className="rounded-2xl border bg-white p-6 md:p-8" style={{ borderColor: "var(--border)" }}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed" style={{ color: "var(--text-mid)" }}>
                  <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 text-center" style={{ background: "var(--navy)", color: "#fff" }}>
        <div className="container max-w-3xl">
          <Handshake size={34} className="mx-auto mb-5" style={{ color: "var(--gold-2)" }} />
          <h2 className="font-black mb-4" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700 }}>Have a workforce, youth, donor, or procurement brief?</h2>
          <p className="text-[15px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>Send us the brief and Affidex will respond with the right training, consultancy, delivery, or supply pathway.</p>
          <Link to="/contact" className="btn-gold inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-[14px]">Talk to Partnerships <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
