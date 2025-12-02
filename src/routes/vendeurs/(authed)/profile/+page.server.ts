import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  disconnect: async ({cookies}) => {
    cookies.delete("session_id", {
      path: "/"
    })
    redirect(307, "/vendeurs")
  }
} satisfies Actions 
