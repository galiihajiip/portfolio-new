export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

export const formatRange = (start?: string, end?: string) => {
  if (!start && !end) return undefined;
  if (start && !end) return `${start} – Present`;
  if (!start) return end;
  return start === end ? start : `${start} – ${end}`;
};

export const isExternal = (href: string) => /^https?:\/\//.test(href);
