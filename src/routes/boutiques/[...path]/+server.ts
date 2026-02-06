import { redirect } from '@sveltejs/kit';

export const GET = ({ params }) => {
  const path = params.path || '';
  throw redirect(301, `/collections/${path}`);
};

export const POST = ({ params }) => {
  const path = params.path || '';
  throw redirect(301, `/collections/${path}`);
};

export const PUT = ({ params }) => {
  const path = params.path || '';
  throw redirect(301, `/collections/${path}`);
};

export const DELETE = ({ params }) => {
  const path = params.path || '';
  throw redirect(301, `/collections/${path}`);
};
