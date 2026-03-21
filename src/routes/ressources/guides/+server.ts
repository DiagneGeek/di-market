import { getGuides } from "$lib/composables/getGuides";
import { json } from "@sveltejs/kit";

export async function GET() {
  const guides = getGuides();
  return json(guides);
}
