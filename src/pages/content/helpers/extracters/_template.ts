import { Extraction } from "../Extraction";
import { genericCleaner } from "./helpers";

const templateExtractor = (pageContent: Document): Extraction => {
  const article = pageContent.getElementsByClassName("article__content")[0]; // article element
  const title = document.getElementsByClassName("headline__text")[0]; // title element
  if (!article) return { state: "failure" };
  // @ts-ignore not sure why
  const articleText = genericCleaner(article.innerText); // adjust cleaner if needed
  // @ts-ignore not sure why
  const titleText = genericCleaner(title.innerText);

  return {
    state: "success",
    article: {
      title: titleText,
      content: articleText,
    },
  };
};

export { templateExtractor };
