import { render } from "vike/abort";
import type { PageContext } from "vike/types";
import { getLesson } from "../../../../src/content/lessons";

// Unknown area/lesson (or a lesson under the wrong area) → the regular 404 page.
export function guard(pageContext: PageContext) {
  const { area, slug } = pageContext.routeParams;
  if (!getLesson(area, slug)) {
    throw render(404);
  }
}
