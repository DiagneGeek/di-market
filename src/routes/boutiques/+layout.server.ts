import { redirect } from '@sveltejs/kit';

export const load = ({ url }) => {
  const path = url.pathname.replace(/^\/boutiques/, '');
  throw redirect(301, `/collections${path}`);
};
