import { getBadgeURL } from "./helpers";

const nyTimesInjector = (
  bias: "neutral" | "conservative" | "liberal",
  pageContent: Document,
): void => {
  const url = getBadgeURL(bias);
  const root = pageContent.querySelector("#story div:nth-child(5)");
  if (!root) return;
  root.innerHTML =
    `<img src="${url}" style="width: 150px;"></img>` + root.innerHTML;
};

export { nyTimesInjector };
