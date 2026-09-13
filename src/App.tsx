import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { trackPageView } from "./lib/analytics";

// Lazy-loaded routes — each is now its own chunk, so visitors only
// download the JS for the page they actually land on.

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Programmes = lazy(() => import("./pages/Programmes"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Corporate = lazy(() => import("./pages/Corporate"));
const Partnerships = lazy(() => import("./pages/Partnerships"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent opacity-40"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

/** Fires a GA4 page_view on every route change (SPA navigation doesn't trigger this automatically). */
function AnalyticsListener() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

export default function App() {
  return (
    <>
      <AnalyticsListener />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="programmes" element={<Programmes />} />
            <Route path="about" element={<About />} />
            <Route path="corporate-government" element={<Corporate />} />
            <Route path="partnerships-accreditations" element={<Partnerships />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsConditions />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
