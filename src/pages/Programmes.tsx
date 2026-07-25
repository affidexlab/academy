import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen, CheckCircle2, Award, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { useState } from "react";
import SEO from "../components/SEO";

const programmes = [
  {
    id: "nbte-fme-tvet",
    icon: "🎓",
    logo: "https://res.cloudinary.com/dca2p5xwg/image/upload/v1785002410/tvet-only-logo_llr88h.png", // Replace with actual logo URL
    title: "NBTE FME TVET",
    form: "https://forms.gle/7ooitRCJmJWBz5kv8",
    subtitle: "Federal Ministry of Education TVET Initiative",
    badge: "Currently Running",
    badgeClass: "bg-emerald-100 text-emerald-700",
    startMonth: "August", // Customize start month
    endMonth: "December", // Customize end month
    duration: "16-24 weeks",
    sessions: "5 days/week (5 hrs/day)",
    level: "All Levels",
    cert: "NBTE Certificate of Competency",
    description:
      "A competency-based, industry-driven training programme under the Federal Ministry of Education's TVET Initiative. Designed to build practical workplace readiness, 90% of the training duration is dedicated to hands-on, practical instruction in functional production and service centres.",
    outcomes: [
      "Monthly trainee stipend of ₦30,000",
      "Training fee of ₦50,000 per month fully covered",
      "Minimum 90% practical, hands-on instruction",
      "Workplace experience via production hubs or MCP placement",
      "Earn industry-recognized, government-approved certificates",
    ],
    modules: [
      { week: "16 weeks", title: "Computer Hardware Repair & Maintenance", topics: ["Computer assembly & diagnosis", "OS & software troubleshooting", "Networking fundamentals"] },
      { week: "24 weeks", title: "Fullstack Web Development", topics: ["Frontend UI/UX", "Backend APIs & Databases", "Cloud deployment"] },
      { week: "16 weeks", title: "Frontend Web Development", topics: ["HTML5, CSS3, Tailwind", "JavaScript & React", "Responsive design"] },
      { week: "16 weeks", title: "Backend Web Development", topics: ["Node.js & Express", "SQL & NoSQL", "API & Security"] },
      { week: "20 weeks", title: "Mobile App Development", topics: ["React Native & Flutter", "Cross-platform UI", "App store submission"] },
    ],
  }
];

function ProgrammeCard({ p }: { p: (typeof programmes)[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5 md:p-7 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {p.logo ? (
              <img src={p.logo} alt={`${p.title} Logo`} className="w-12 h-12 object-contain" />
            ) : (
              <span className="text-3xl">{p.icon}</span>
            )}
            <div>
              <h3 className="text-lg font-extrabold text-[#0A2540] leading-snug">{p.title}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{p.subtitle}</p>
            </div>
          </div>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shrink-0 ${p.badgeClass}`}>
            {p.badge}
          </span>
        </div>

        <div className="mt-3 md:mt-4 flex flex-wrap gap-3 md:gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5"><Clock size={14} />{p.duration}</span>
          {p.startMonth && p.endMonth && (
            <span className="flex items-center gap-1.5"><Calendar size={14} />{p.startMonth} - {p.endMonth}</span>
          )}
          <span className="flex items-center gap-1.5"><BookOpen size={14} />{p.sessions}</span>
          <span className="flex items-center gap-1.5"><Award size={14} className="text-[#C9973A]" />{p.cert}</span>
        </div>

        <p className="mt-3 md:mt-4 text-sm text-slate-600 leading-relaxed">{p.description}</p>

        <div className="mt-4 md:mt-5 flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2.5 md:mb-3">What you'll be able to do</h4>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {p.outcomes.map((o, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600">
                <CheckCircle2 size={14} className="mt-0.5 text-[#C9973A] shrink-0" />
                {o}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 md:mt-5 flex items-center gap-1.5 text-sm font-semibold text-[#0A2540] hover:text-[#C9973A] transition-colors"
        >
          {expanded ? <><ChevronUp size={16} />Hide available tracks</> : <><ChevronDown size={16} />View available tracks</>}
        </button>
      </div>

      {expanded && (
        <div className="border-t bg-slate-50 px-5 md:px-7 py-5 flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Programme Tracks</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {p.modules.map((m, i) => (
              <div key={i} className="rounded-xl border bg-white p-4 flex flex-col gap-3">
                <div className="text-xs font-bold text-[#C9973A] mb-1">{m.week}</div>
                <div className="text-sm font-semibold text-[#0A2540] mb-2">{m.title}</div>
                <ul className="flex flex-col gap-2">
                  {m.topics.map((t, j) => (
                    <li key={j} className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t px-5 md:px-7 py-4 bg-white flex items-center justify-between flex-wrap gap-3">
        <span className="text-sm font-semibold text-[#0A2540]">Level: {p.level}</span>
        <a
          href={p.form}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#0A2540] px-4 py-2 text-xs font-bold text-white hover:bg-[#0d2e52] transition-colors"
        >
          Apply for this programme
          <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}

export default function AcademyProgrammes() {
  return (
    <div>
      <SEO
        title="Programmes — Affidex Academy"
        description="Explore Affidex Academy's NBTE-approved training programmes in Uyo, including the NBTE FME TVET programme."
        path="/programmes"
      />
      {/* Hero */}
      <section className="bg-[#0A2540] py-12 md:py-20">
        <div className="container text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9973A] mb-3">Our Programmes</p>
          <h1 className="text-4xl font-extrabold md:text-5xl">Our Active Programmes.</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
            Every programme at Affidex Academy is built around real-world skills, employer demand, and zero cost to you. Pick your track and apply today.
          </p>
        </div>
      </section>

      {/* Quick pick */}
      <section className="bg-slate-50 border-b py-6">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {programmes.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-[#0A2540] hover:text-[#0A2540] transition-colors"
              >
                {p.logo ? (
                  <img src={p.logo} alt="" className="w-5 h-5 object-contain" />
                ) : (
                  <span>{p.icon}</span>
                )}
                {p.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Programme cards */}
      <section className="bg-white py-10 md:py-16">
        <div className="container">
          <div className="flex flex-col gap-8">
            {programmes.map((p) => (
              <div id={p.id} key={p.id} className="scroll-mt-20">
                <ProgrammeCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
