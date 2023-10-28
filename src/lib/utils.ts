export const handleLoginRedirect = (url: URL) => {
  const redirectTo = url.pathname + url.search;
  return `/auth/login?redirect=${redirectTo}`;
};
