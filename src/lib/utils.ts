export const handleLoginRedirect = (url: URL) => {
  const redirectTo = url.pathname + url.search;
  return `/login?redirect=${redirectTo}`;
};
