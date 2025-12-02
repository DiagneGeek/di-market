import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  disconnect: async ({cookies}) => {
    cookies.remove("session_id")
    redirect(303, "/")
  }
} satisfies Actions 
