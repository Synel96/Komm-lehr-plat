import { prerenderUrls } from "../../src/prerender";

// Vike's default prerendering only knows about this page's filesystem route
// ("/"). Language is resolved per-request from the URL in
// pages/+onBeforeRoute.ts, so without this hook `vike build` would only
// emit static HTML for the un-prefixed "/" (default lang) — /de/, /hu/ and
// /en/ would 404 on a static-only deploy. Enumerate every lang-prefixed URL
// (plus the un-prefixed default) so all of them get prerendered.
// https://vike.dev/onBeforePrerenderStart
export function onBeforePrerenderStart() {
  return prerenderUrls("/");
}
