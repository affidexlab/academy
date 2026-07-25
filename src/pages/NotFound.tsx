import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import SEO from "../components/SEO";

export default function AcademyNotFound() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <SEO
        title="Page Not Found — Affidex Academy"
        description="The page you're looking for doesn't exist or may have been moved."
        path=""
        noindex
      />
      <section
        className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center"
        style={{ background: "linear-gradient(135deg,var(--navy),var(--navy-3))" }}
      >
        <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--gold)" }}>
          Error 404
        </p>
        <h1
          className="mb-4 text-4xl font-black sm:text-5xl"
          style={{ color: "#fff", fontFamily: "'Cormorant Garamond',serif" }}
        >
          Page not found
        </h1>
        <p className="mb-8 max-w-md text-[15px]" style={{ color: "rgba(255,255,255,0.7)" }}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          to=""
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition hover:opacity-90"
          style={{ background: "var(--gold)", color: "var(--navy)" }}
        >
          <Home size={16} />
          Back to Academy home
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
