export const strIsEmpty = (s?: string | null) => !s || /^\s*$/.test(s);

export const strIsEmail = (s: string) =>
  /* eslint-disable-next-line no-useless-escape */
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    s
  );
