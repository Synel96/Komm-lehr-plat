import { LESSONS } from "../../../src/content/lessons";
import { prerenderUrls } from "../../../src/prerender";

// One page per lesson and language (see pages/index/+onBeforePrerenderStart.ts).
export function onBeforePrerenderStart() {
  return LESSONS.flatMap((lesson) => prerenderUrls(`/lektionen/${lesson.slug}`));
}
