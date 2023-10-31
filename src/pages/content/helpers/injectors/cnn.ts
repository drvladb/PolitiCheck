import { getBadgeURL } from "./helpers";

const cnnInjector = (
  bias: "neutral" | "conservative" | "liberal",
  pageContent: Document,
): void => {
  const url = getBadgeURL(bias);
  const root = pageContent.getElementsByClassName("social-share")[0];
  if (!root) return;
  root.innerHTML =
    `<img src="${url}" style="width: 150px;"></img><br/>` + root.innerHTML;
};

export { cnnInjector };
