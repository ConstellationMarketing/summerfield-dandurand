import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Index from "../pages/Index";
import AboutUs from "../pages/AboutUs";
import PracticeAreas from "../pages/PracticeAreas";
import PracticeAreaPage from "../pages/PracticeAreaPage";
import ContactPage from "../pages/ContactPage";
import BlogIndex from "../pages/BlogIndex";
import DynamicPage from "../pages/DynamicPage";

const AdminRoutes = lazy(() => import("../pages/AdminRoutes"));

function LegacyBlogPostRedirect() {
  const { slug = "" } = useParams<{ slug: string }>();
  return <Navigate to={`/${slug}/`} replace />;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about/" element={<AboutUs />} />
        <Route path="/practice-areas/" element={<PracticeAreas />} />
        <Route path="/practice-areas/:slug/" element={<PracticeAreaPage />} />
        <Route path="/contact/" element={<ContactPage />} />
        <Route path="/blog/" element={<BlogIndex />} />
        <Route path="/blog/:slug/" element={<LegacyBlogPostRedirect />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<DynamicPage />} />
      </Routes>
    </Suspense>
  );
}
