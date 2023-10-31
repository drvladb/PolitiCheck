import { getBadgeURL } from "./helpers";

const genericInjector = (
  bias: "neutral" | "conservative" | "liberal",
  pageContent: Document,
): void => {
  const url = getBadgeURL(bias);
  const root = pageContent.getElementsByClassName("")[0];
  if (!root) return;
  root.innerHTML =
    `<img src="${url}" style="width: 150px;"></img><br/>` + root.innerHTML;
};

export { genericInjector };
