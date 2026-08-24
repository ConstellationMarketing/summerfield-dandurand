import type { PreloadedPageDocument } from "./publicLoaders";
import { isPracticeAreaPageContentShape } from "./publicLoaders";
import { isAreaServedPageContent } from "./areaServedPageTypes";

export type PageTemplateKind = "generic" | "practice" | "area-served";

export function resolvePageTemplate(
  document: PreloadedPageDocument | null | undefined,
): PageTemplateKind {
  if (!document) {
    return "generic";
  }

  if (isAreaServedPageContent(document.content)) {
    return "area-served";
  }

  if (document.pageType === "practice") {
    return "practice";
  }

  return isPracticeAreaPageContentShape(document.content)
    ? "practice"
    : "generic";
}
