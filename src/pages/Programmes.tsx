import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen, CheckCircle2, Award, ChevronDown, ChevronUp, Calendar, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import SEO from "../components/SEO";

// TVET Stipends Initiative
const tvetProgramme = {
  id: "nbte-fme-tvet",
  icon: "🎓",
  logo: "https://res.cloudinary.com/dca2p5xwg/image/upload/v1785002410/tvet-only-logo_llr88h.png",
  title: "NBTE FME TVET Initiative",
  form: "https://forms.gle/7ooitRCJmJWBz5kv8",
  subtitle: "Federal Ministry of Education Vocational TVET Initiative",
  badge: "Stipend Provided (₦30,000/mo)",
  badgeClass: "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold",
  startMonth: "August",
  endMonth: "December",
  duration: "16–24 weeks",
  sessions: "5 days/week (5 hrs/day)",
  level: "All Levels (Beginner to Advanced)",
  cert: "NBTE Certificate of Competency (Government Approved)",
  description:
    "A comprehensive, competency-based TVET training programme under the Federal Ministry of Education and NBTE. Designed for deep workplace readiness, 90% of the training duration is dedicated to hands-on practical instruction in functional production hubs.",
  outcomes: [
    "Monthly trainee stipend of ₦30,000 throughout training",
    "Full tuition (₦50,000/month value) 100% sponsored",
    "90% practical, hands-on facility & repair hub instruction",
    "Industry placement via production hubs or partner MCPs",
    "Government-approved NBTE Certificate of Competency",
  ],
  modules: [
    { week: "16 weeks", title: "Computer Hardware Repair & Maintenance", topics: ["Computer assembly & diagnosis", "OS & software troubleshooting", "Networking & server setup"] },
    { week: "24 weeks", title: "Fullstack Web Development", topics: ["Frontend UI/UX & React", "Node.js, Express & Databases", "Cloud deployment & DevOps"] },
    { week: "16 weeks", title: "Frontend Web Development", topics: ["HTML5, CSS3, Tailwind CSS", "JavaScript ES6+ & React", "Responsive design & Web APIs"] },
    { week: "16 weeks", title: "Backend Web Development", topics: ["Node.js & Express framework", "SQL & NoSQL Database design", "API Security & Auth"] },
    { week: "20 weeks", title: "Mobile App Development", topics: ["React Native & Flutter", "Cross-platform mobile UI", "Play Store & App Store deployment"] },
  ],
};

// Core 4-8 Week Intensive Tracks
const shortTracks = [
  {
    id: "automobile-mechatronics",
    emoji: "🚗",
    title: "Automobile Maintenance & Auto-Mechatronics",
    duration: "16–24 weeks",
    level: "Beginner–Advanced",
    tag: "Technical Trade",
    tagBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    desc: "Diagnostics, servicing, repairs, sensors, actuators, hybrid systems, and modern automotive electronic systems.",
    skills: ["Engine diagnostics", "Auto electrical systems", "Hybrid vehicle fundamentals", "Workshop operations"],
  },
  {
    id: "energy-systems",
    emoji: "⚡",
    title: "Electrical, Solar, EV & CNG Systems",
    duration: "16–24 weeks",
    level: "Beginner–Intermediate",
    tag: "Energy",
    tagBg: "bg-amber-50 text-amber-700 border-amber-200",
    desc: "Electrical installation, solar PV systems, electric vehicle maintenance, and CNG conversion support.",
    skills: ["Wiring and fault detection", "Solar PV installation", "EV diagnostics", "CNG kit maintenance"],
  },
  {
    id: "welding-fabrication",
    emoji: "🛠️",
    title: "Welding, Fabrication & Vehicle Body Works",
    duration: "16–24 weeks",
    level: "Beginner–Advanced",
    tag: "Industrial",
    tagBg: "bg-slate-50 text-slate-700 border-slate-200",
    desc: "Structural welding, fabrication, vehicle body building, vulcanizing, and production-hub work practice.",
    skills: ["Structural and pipe welding", "Fabrication safety", "Vehicle body building", "Vulcanizing operations"],
  },
  {
    id: "coding-web",
    emoji: "🧩",
    title: "Web Development & Coding Foundations",
    duration: "8–24 weeks",
    level: "Beginner–Intermediate",
    tag: "Digital",
    tagBg: "bg-blue-50 text-blue-700 border-blue-200",
    desc: "HTML, CSS, Tailwind, JavaScript, Git/GitHub, React foundations, and deployment of live websites.",
    skills: ["HTML5, CSS3 & Tailwind", "JavaScript and React", "Git/GitHub", "Live portfolio projects"],
  },
  {
    id: "marketing-creative-media",
    emoji: "📣",
    title: "Digital Marketing, Creative Media & Photography",
    duration: "6 weeks",
    level: "Beginner",
    tag: "Creative",
    tagBg: "bg-purple-50 text-purple-700 border-purple-200",
    desc: "Social media, SEO, paid ads, e-commerce, camera operation, studio lighting, editing, and creative freelancing.",
    skills: ["Content and paid advertising", "SEO and e-commerce", "Photography and lighting", "Lightroom and Photoshop"],
  },
  {
    id: "ict-gsm-data-ai",
    emoji: "🔧",
    title: "ICT Support, GSM Repairs, Data & AI Productivity",
    duration: "6–16 weeks",
    level: "Beginner–Intermediate",
    tag: "High Demand",
    tagBg: "bg-pink-50 text-pink-700 border-pink-200",
    desc: "Computer hardware, operating systems, networking, GSM servicing, data visualisation, Power BI basics, and AI tools.",
    skills: ["Hardware and networking", "GSM motherboard-level repair", "Excel, Sheets and Power BI", "AI productivity tools"],
  },
  {
    id: "business-entrepreneurship",
    emoji: "💼",
    title: "Entrepreneurship & Business Skills",
    duration: "4–6 weeks",
    level: "All Levels",
    tag: "Enterprise",
    tagBg: "bg-green-50 text-green-700 border-green-200",
    desc: "Business planning, costing, marketing, customer service, financial management, and micro-enterprise readiness.",
    skills: ["Business planning", "Costing and pricing", "Customer service", "Financial management"],
  },
];

export default function AcademyProgrammes() {
  const [expandedTvet, setExpandedTvet] = useState(true);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <SEO
        title="Programmes & Services — Affidex Academy"
        description="Explore Affidex Academy's digital, vocational, automotive, energy, creative, ICT, GSM repair, consultancy, and procurement services across Southern Nigeria."
        path="/programmes"
      />

      {/* Hero */}
      <section className="bg-[#0A2540] py-16 md:py-24 text-white">
        <div className="container flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C9973A] mb-3">Programmes & Service Streams</p>
          <h1 className="text-4xl font-extrabold md:text-5xl">Industry-Driven TVET, Digital & Technical Programmes</h1>
          <p className="mt-4 text-base md:text-lg text-slate-300">
            Affidex Academy delivers competency-based training, consultancy, manpower development, and procurement support for individuals, government agencies, donors, corporate employers, and education institutions.
          </p>
        </div>
      </section>

      {/* Overview bar */}
      <section className="bg-slate-50 border-b py-6">
        <div className="container flex flex-wrap gap-4 justify-center text-sm font-semibold text-[#0A2540]">
          <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border shadow-sm">
            <Sparkles size={16} className="text-[#C9973A]" /> Training · Consultancy · Supply
          </span>
          <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border shadow-sm">
            <Award size={16} className="text-[#C9973A]" /> NSQ/NBTE/TVET-Aligned Delivery
          </span>
          <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border shadow-sm">
            <Zap size={16} className="text-[#C9973A]" /> 70% Hands-on Labs & Projects
          </span>
        </div>
      </section>

      {/* Stream 1: NBTE TVET Initiative */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9973A]">Pathway 1</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2540] mt-1">
              NBTE FME TVET Initiative (16–24 Weeks)
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl">
              A government-supported long-term vocational initiative providing comprehensive technical training, ₦30,000 monthly stipends, and workplace immersion.
            </p>
          </div>

          <div className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6 md:p-8 flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <img src={tvetProgramme.logo} alt="TVET Logo" className="w-14 h-14 object-contain" />
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0A2540]">{tvetProgramme.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{tvetProgramme.subtitle}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold shrink-0 ${tvetProgramme.badgeClass}`}>
                  {tvetProgramme.badge}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold"><Clock size={15} />{tvetProgramme.duration}</span>
                <span className="flex items-center gap-1.5"><Calendar size={15} />{tvetProgramme.startMonth} - {tvetProgramme.endMonth}</span>
                <span className="flex items-center gap-1.5"><BookOpen size={15} />{tvetProgramme.sessions}</span>
                <span className="flex items-center gap-1.5 text-[#0A2540] font-bold"><Award size={15} className="text-[#C9973A]" />{tvetProgramme.cert}</span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">{tvetProgramme.description}</p>

              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Programme Benefits & Financial Support</h4>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {tvetProgramme.outcomes.map((o, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="mt-0.5 text-[#C9973A] shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setExpandedTvet(!expandedTvet)}
                className="flex items-center gap-1.5 text-sm font-bold text-[#0A2540] hover:text-[#C9973A] transition-colors self-start mt-2"
              >
                {expandedTvet ? <><ChevronUp size={16} /> Hide Specialized TVET Tracks</> : <><ChevronDown size={16} /> View 5 Specialized TVET Tracks</>}
              </button>
            </div>

            {expandedTvet && (
              <div className="border-t bg-slate-50 p-6 md:p-8 flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Available TVET Tracks</h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tvetProgramme.modules.map((m, i) => (
                    <div key={i} className="rounded-xl border bg-white p-5 flex flex-col gap-2 shadow-xs">
                      <div className="text-xs font-extrabold text-[#C9973A]">{m.week}</div>
                      <div className="text-sm font-bold text-[#0A2540]">{m.title}</div>
                      <ul className="mt-2 space-y-1.5">
                        {m.topics.map((t, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs text-slate-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0A2540] shrink-0" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t px-6 py-4 bg-white flex items-center justify-between flex-wrap gap-4">
              <span className="text-sm font-bold text-[#0A2540]">Target Applicants: All Levels</span>
              <a
                href={tvetProgramme.form}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0A2540] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#0d2e52] transition-colors"
              >
                Apply for TVET Initiative
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stream 2: 4-8 Week Intensive Skill Tracks */}
      <section className="py-12 md:py-16 bg-slate-50 border-t">
        <div className="container">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9973A]">Expanded Catalogue</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2540] mt-1">
              Expanded Digital, Technical & Vocational Tracks
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl">
              A wider practical catalogue covering digital, automotive, energy, industrial, creative, hardware, GSM repair, and enterprise skills drawn from the updated company profile.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shortTracks.map((st) => (
              <div key={st.id} className="rounded-2xl border bg-white p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-3xl">{st.emoji}</span>
                    <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${st.tagBg}`}>
                      {st.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#0A2540] leading-snug mb-2">{st.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-semibold">
                    <Clock size={13} /> {st.duration} · {st.level}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{st.desc}</p>
                  <ul className="space-y-1.5 mb-6">
                    {st.skills.map((sk, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={13} className="text-[#C9973A] mt-0.5 shrink-0" />
                        {sk}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0A2540] py-2.5 text-xs font-bold text-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-colors"
                >
                  Apply for this track <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A2540] py-14 text-white text-center">
        <div className="container max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold">Unsure which stream fits you?</h2>
          <p className="text-sm text-slate-300">
            Reach out to our admissions advisors or fill out our simple application form to get guidance on picking your track.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link to="/contact" className="btn-gold rounded-full px-8 py-3 text-xs font-bold inline-flex items-center gap-2">
              Apply / Contact Us <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
