import { getBadgeURL } from "./helpers";

const foxNewsInjector = (
  bias: "neutral" | "conservative" | "liberal",
  pageContent: Document,
): void => {
  const url = getBadgeURL(bias);
  const root = pageContent.getElementsByClassName("author-byline")[0];
  if (!root) return;
  root.innerHTML =
    `<img src="${url}" style="width: 150px; margin-top: 15px;"></img><br/>` +
    root.innerHTML;
};

export { foxNewsInjector };
