import { redirect } from '@sveltejs/kit';

export const GET = () => {
  throw redirect(301, '/collections');
};

export const POST = () => {
  throw redirect(301, '/collections');
};
