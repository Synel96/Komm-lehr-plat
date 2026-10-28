import { render } from "vike/abort";
import type { PageContext } from "vike/types";
import { getLesson } from "../../../src/content/lessons";

// Unknown lesson slug → the regular 404 page.
export function guard(pageContext: PageContext) {
  if (!getLesson(pageContext.routeParams.slug)) {
    throw render(404);
  }
}
