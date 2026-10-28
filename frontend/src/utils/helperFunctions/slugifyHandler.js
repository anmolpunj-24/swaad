export const SlugifyHandler = (slug) => {
  return slug
    ?.trim()
    ?.toLowerCase()
    ?.replace(/&/g, "and")
    ?.replace(/[\W_]+/g, "-")
    ?.replace(/^-+|-+$/g, "");
};
