import { getBadgeURL } from "./helpers";

const apnewsInjector = (
  bias: "neutral" | "conservative" | "liberal",
  pageContent: Document,
): void => {
  const url = getBadgeURL(bias);
  const root = pageContent.getElementsByClassName("StoryPage-lede-content")[0];
  if (!root) return;
  root.innerHTML =
    root.innerHTML + `<br/><img src="${url}" style="width: 150px;"></img>`;
};

export { apnewsInjector };
