import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@site/components/layout/Layout";
import PracticePageView from "@site/components/practice/PracticePageView";
import AreaServedPageView from "@site/components/area-served/AreaServedPageView";
import { normalizeAreaServedPageContent } from "@site/lib/cms/areaServedPageTypes";
import Seo from "@site/components/Seo";
import BlockRenderer from "@site/components/BlockRenderer";
import NotFound from "./NotFound";
import type { PageMeta } from "@site/lib/cms/pageMeta";
import { emptyPageMeta } from "@site/lib/cms/pageMeta";
import type {
  PreloadedPageDocument,
  PreloadedPostDocument,
} from "@site/lib/cms/publicLoaders";
import {
  isRenderablePageContent,
  isRootLevelPostCandidatePath,
  loadBlogPostDocument,
  loadDynamicPageDocument,
  normalizeCmsUrlPath,
  normalizePostSlug,
  normalizePracticeAreaPageContent,
} from "@site/lib/cms/publicLoaders";
import { resolvePageTemplate } from "@site/lib/cms/pageTemplateResolver";
import {
  getPreloadedPageDocument,
  getPreloadedPostDocument,
} from "@site/lib/preloadState";
import BlogPost from "./BlogPost";

const pageCache = new Map<string, PreloadedPageDocument>();

function normalizeDynamicPageDocument(document: PreloadedPageDocument | null): PreloadedPageDocument | null {
  if (!document || !isRenderablePageContent(document.content)) {
    return null;
  }

  return document;
}

export default function DynamicPage() {
  const { pathname } = useLocation();
  const queryPath = normalizeCmsUrlPath(pathname);
  const preloadedDocument = normalizeDynamicPageDocument(getPreloadedPageDocument(queryPath));
  const preloadedPost = preloadedDocument ? null : getPreloadedPostDocument(queryPath);
  const initialPage = preloadedDocument || pageCache.get(queryPath) || null;

  if (preloadedDocument && !pageCache.has(queryPath)) {
    pageCache.set(queryPath, preloadedDocument);
  }

  const [page, setPage] = useState<PreloadedPageDocument | null>(initialPage);
  const [post, setPost] = useState<PreloadedPostDocument | null>(preloadedPost);
  const [isLoading, setIsLoading] = useState(!initialPage && !preloadedPost);
  const [notFound, setNotFound] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setIsLoading(true);
      setNotFound(false);
      setPage(null);
      setPost(null);
    }

    let isMounted = true;
    const normalizedPath = normalizeCmsUrlPath(pathname);

    async function fetchPage() {
      const cached = pageCache.get(normalizedPath);
      if (cached) {
        if (isMounted) {
          setPage(cached);
          setIsLoading(false);
          setNotFound(false);
        }
        return;
      }

      try {
        const document = normalizeDynamicPageDocument(await loadDynamicPageDocument(normalizedPath));
        if (document) {
          pageCache.set(normalizedPath, document);

          if (isMounted) {
            setPage(document);
            setPost(null);
            setNotFound(false);
          }
          return;
        }

        const loadedPost = isRootLevelPostCandidatePath(normalizedPath)
          ? await loadBlogPostDocument(normalizePostSlug(normalizedPath))
          : null;

        if (isMounted) {
          setPost(loadedPost);
          setNotFound(!loadedPost);
        }
      } catch (err) {
        console.error("[DynamicPage] Failed to fetch CMS page:", err);
        if (isMounted) {
          setNotFound(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPage();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-brand-accent" />
        </div>
      </Layout>
    );
  }

  if (post) {
    return (
      <BlogPost
        initialPost={post}
        slug={normalizePostSlug(queryPath)}
      />
    );
  }

  if (notFound || !page) {
    return <NotFound />;
  }

  const title = page.title || "";
  const meta: PageMeta = page.meta || emptyPageMeta;

  const pageTemplate = resolvePageTemplate(page);

  if (pageTemplate === "area-served") {
    return (
      <AreaServedPageView
        content={normalizeAreaServedPageContent(page.content)}
        meta={meta}
        title={title}
        publishedAt={page.publishedAt}
        updatedAt={page.updatedAt}
      />
    );
  }

  if (pageTemplate === "practice") {
    return (
      <PracticePageView
        content={normalizePracticeAreaPageContent(page.content)}
        meta={meta}
        title={title}
        publishedAt={page.publishedAt}
        updatedAt={page.updatedAt}
      />
    );
  }

  const content = page.content as Record<string, unknown> | import("@site/lib/blocks").ContentBlock[] | null;

  return (
    <Layout>
      <Seo
        title={title}
        meta={meta}
        pageContent={content}
        publishedTime={page.publishedAt}
        updatedTime={page.updatedAt}
      />
      <BlockRenderer content={content} />
    </Layout>
  );
}
