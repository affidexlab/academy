import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { ArrowRight, Menu, X, Globe, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { AFFIDEX_LOGO } from "../assets/logos";

/* ─── Navbar ─────────────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "", label: "Home" },
    { to: "/programmes", label: "Programmes" },
    { to: "/about", label: "About" },
  ];
  const isActive = (to: string) => to === "" ? pathname === "" : pathname.startsWith(to);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={{ background: scrolled ? "rgba(11,28,46,0.97)" : "#0B1C2E", backdropFilter: "blur(16px)" }}>
      {/* Top accent line */}
      <div className="h-[3px]" style={{ background: "linear-gradient(90deg, var(--gold), var(--gold-3), var(--gold))" }} />

      <div className="container flex h-[70px] items-center justify-between">
        {/* Logo */}
        <Link to="" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center"
            style={{ background: "#0B1C2E", border: "1px solid rgba(200,146,42,0.4)" }}>
            <img
              src={AFFIDEX_LOGO}
              alt="Affidex Academy"
              className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
                const p = t.parentElement;
                if (p) p.innerHTML = `<span style="color:#C8922A;font-size:10px;font-weight:900;letter-spacing:-0.03em">AA</span>`;
              }}
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-extrabold tracking-[0.08em] uppercase text-white">Affidex Academy</span>
            <span className="text-[9.5px] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--gold-2)" }}>
              Vocational Education & Training
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`text-[13.5px] font-semibold tracking-wide transition-colors relative pb-0.5 group ${isActive(l.to) ? "text-white" : "text-slate-400 hover:text-white"}`}>
              {l.label}
              <span className={`absolute -bottom-px left-0 h-[2px] rounded-full transition-all duration-300 ${isActive(l.to) ? "w-full" : "w-0 group-hover:w-full"}`}
                style={{ background: "var(--gold)" }} />
            </Link>
          ))}
          <Link to="/contact"
            className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[13px]">
            Contact Us <ArrowRight size={14} />
          </Link>
        </nav>

        <button className="md:hidden p-2 rounded-lg transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}
          onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0B1C2E" }}>
          <div className="container py-6 flex flex-col gap-2">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className={`flex items-center justify-between text-sm font-semibold px-5 py-4 rounded-xl transition-colors ${isActive(l.to) ? "text-white bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/05"}`}>
                {l.label} <ChevronRight size={15} />
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)}
              className="btn-gold mt-4 flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px]">
              Contact Us — Free <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "#fff" }}>
      <div className="h-[3px]" style={{ background: "linear-gradient(90deg, var(--gold), var(--gold-3), var(--gold))" }} />

      <div className="container py-10">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
                style={{ background: "#060F1A", border: "1px solid rgba(200,146,42,0.3)" }}>
                <img src={AFFIDEX_LOGO} alt="Affidex" className="h-10 w-10 object-contain"
                  onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
              <div>
                <div className="text-sm font-extrabold tracking-widest uppercase text-white">Affidex Academy Ltd</div>
                <div className="text-[9.5px] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--gold-2)" }}>
                  Vocational Education & Training
                </div>
              </div>
            </div>
            <p className="text-[13.5px] leading-relaxed mb-4" style={{ color: "#7A8FA6" }}>
              Building employability, enterprise, and income pathways for underserved youth, women, and communities across Southern Nigeria through practical, industry-aligned ICT and technology training.
            </p>
            <div className="text-xs mb-6" style={{ color: "#4A6080" }}>
              RC: 9316934 · SMEDAN: SUID-5998-5813-3500-9105
            </div>

            {/* Affiliation pills */}
            <div className="flex flex-wrap gap-2">
              {["CAC Registered", "SMEDAN Certified", "Microsoft AI Partner", "UNESCO-UNEVOC"].map((a, i) => (
                <span key={i} className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(200,146,42,0.12)", border: "1px solid rgba(200,146,42,0.22)", color: "var(--gold-2)" }}>
                  ✓ {a}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-2">
            <h4 className="label mb-4 md:mb-6">Navigation</h4>
            <ul className="space-y-2 md:space-y-3 text-[13.5px] flex flex-col gap-2" style={{ color: "#7A8FA6" }}>
              {[["Home", ""], ["Programmes", "/programmes"], ["About Us", "/about"], ["Contact Us", "/contact"]].map(([l, t]) => (
                <li key={t}><Link to={t} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div className="flex flex-col gap-2">
            <h4 className="label mb-4 md:mb-6">Our Tracks</h4>
            <ul className="space-y-2 md:space-y-3 text-[13px] flex flex-col gap-2" style={{ color: "#7A8FA6" }}>
              {["Digital Foundations", "Web & Coding", "Digital Marketing", "UI/UX Design", "Data & AI", "ICT Support & Hardware"].map((t, i) => (
                <li key={i} className="hover:text-white transition-colors cursor-default">{t}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h4 className="label mb-4 md:mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-2 md:space-y-4 text-[13.5px] " style={{ color: "#7A8FA6" }}>
              <li className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                <div>
                  <a href="mailto:contact@affifexacademy.com.ng" className="hover:text-white transition-colors block">contact@affifexacademy.com.ng</a>
                  <a href="mailto:contact@affifexacademy.com.ng" className="hover:text-white transition-colors block">contact@affifexacademy.com.ng</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="flex-shrink-0" style={{ color: "var(--gold)" }} />
                <a href="tel:+2348133985352" className="hover:text-white transition-colors">+234 813 398 5352</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                <div>
                  <p>Two training centres in Uyo</p>
                  <p className="text-[12px] mt-0.5" style={{ color: "#4A6080" }}>Akwa Ibom State, Nigeria</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 md:mt-16 pt-6 md:pt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "#3D5068" }}>
            © {new Date().getFullYear()} Affidex Academy Limited. A division of Affidex Lab. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs" style={{ color: "#3D5068" }}>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function AcademyLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
