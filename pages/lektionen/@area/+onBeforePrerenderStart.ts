import { AREAS } from "../../../src/content/lessons";
import { prerenderUrls } from "../../../src/prerender";

// One chapter list per area and language (see pages/index/+onBeforePrerenderStart.ts).
export function onBeforePrerenderStart() {
  return AREAS.flatMap((area) => prerenderUrls(`/lektionen/${area.id}`));
}
