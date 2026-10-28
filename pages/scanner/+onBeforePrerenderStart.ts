import { prerenderUrls } from "../../src/prerender";

// See pages/index/+onBeforePrerenderStart.ts.
export function onBeforePrerenderStart() {
  return prerenderUrls("/scanner");
}
