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
            <h4 className="label mb-4 md:mb-6">Contact & Social</h4>
            <ul className="flex flex-col gap-2 md:space-y-4 text-[13.5px] " style={{ color: "#7A8FA6" }}>
              <li className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                <div>
                  <a href="mailto:contact@affidexacademy.com.ng" className="hover:text-white transition-colors block">contact@affidexacademy.com.ng</a>
                  <a href="mailto:affidexacademy@gmail.com" className="hover:text-white transition-colors block text-xs mt-0.5" style={{ color: "#4A6080" }}>affidexacademy@gmail.com</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="flex-shrink-0" style={{ color: "var(--gold)" }} />
                <a href="tel:+2348133985352" className="hover:text-white transition-colors">+234 813 398 5352</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                <div>
                  <p>50 Udo Udoma Avenue & Main Campus</p>
                  <p className="text-[12px] mt-0.5" style={{ color: "#4A6080" }}>Uyo, Akwa Ibom State, Nigeria</p>
                </div>
              </li>
            </ul>

            {/* Social media links */}
            <div className="mt-4 flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter X"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://wa.me/2348133985352" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            </div>
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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-[#C8922A] focus:text-[#0B1C2E] focus:font-bold focus:rounded-b-lg focus:shadow-lg">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
