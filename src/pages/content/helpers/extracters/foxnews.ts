import { Extraction } from "../Extraction";
import { genericCleaner } from "./helpers";

const foxNewsExtractor = (pageContent: Document): Extraction => {
  const article = pageContent.getElementsByClassName("article-body")[0]; 
  const title = pageContent.getElementsByClassName("headline")[0];
  if (!article) return { state: "failure" };
  // @ts-ignore not sure why
  const articleText = genericCleaner(article.innerText);
  // @ts-ignore not sure why
  const titleText = genericCleaner(title.innerText);

  return {
    state: "success",
    article: {
      title: titleText,
      content: articleText
    },
  };
};

export { foxNewsExtractor };
