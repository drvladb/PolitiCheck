import { Extraction } from "../Extraction";

const cnnExtractor = (pageContent: Document): Extraction => {
  const article = pageContent.getElementsByClassName("article__content")[0];
  if (!article) return { state: "failure" };
  // @ts-ignore not sure why
  const articleText = article.innerText.replaceAll("\n", " ");

  return {
    state: "success",
    content: articleText,
  };
};

export { cnnExtractor };
