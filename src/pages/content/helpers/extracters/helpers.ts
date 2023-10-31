const genericCleaner = (v: string) => {
  return v.replaceAll("\n", " ").replaceAll("  ", " ");
};

export { genericCleaner };
