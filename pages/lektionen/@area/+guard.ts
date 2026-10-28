import { render } from "vike/abort";
import type { PageContext } from "vike/types";
import { getArea } from "../../../src/content/lessons";

// Unknown area → the regular 404 page.
export function guard(pageContext: PageContext) {
  if (!getArea(pageContext.routeParams.area)) {
    throw render(404);
  }
}
