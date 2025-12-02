import { redirect } from '@sveltejs/kit';

export const actions = {
  disconnect: async ({cookies}) => {
    cookies.remove("session_id")
    redirect(303, "/vendeurs")
  }
}
