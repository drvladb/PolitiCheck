import { Extraction } from "../Extraction";

const foxNewsExtractor = (pageContent: Document): Extraction => {
  const article = pageContent.getElementsByClassName("article-body")[0];
  if (!article) return { state: "failure" };
  // @ts-ignore not sure why
  const articleText = article.innerText.replaceAll("\n", " ");

  return {
    state: "success",
    content: articleText,
  };
};

export { foxNewsExtractor };
