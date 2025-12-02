import { redirect } from '@sveltejs/kit';

export const actions = {
  disconnect: async ({cookies}) => {
    cookies.remove("sessionid")
    redirect(303, "/vendeurs")
  }
}
