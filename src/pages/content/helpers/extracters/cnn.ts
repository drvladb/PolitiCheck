import { Extraction } from "../Extraction";

const cnnExtractor = (pageContent: Document): Extraction => {
  const article = pageContent.getElementsByClassName("article__content")[0];
  const title = document.getElementsByClassName("headline__text")[0];
  if (!article) return { state: "failure" };
  // @ts-ignore not sure why
  const articleText = article.innerText.replaceAll("\n", " ").replaceAll("  ", " ");
  // @ts-ignore not sure why
  const titleText = title.innerText;

  return {
    state: "success",
    article: {
      title: titleText,
      content: articleText
    },
  };
};

export { cnnExtractor };
