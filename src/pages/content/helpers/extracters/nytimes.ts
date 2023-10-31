import { Extraction } from "../Extraction";
import { genericCleaner } from "./helpers";

const nytimesExtractor = (pageContent: Document): Extraction => {
  const article = document.getElementsByName("articleBody")[0];
  const title = document.querySelectorAll('[data-testid="headline"]')[0]; // no id on this one
  if (!article) return { state: "failure" };
  // @ts-ignore not sure why
  const articleText = genericCleaner(article.innerText);
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

export { nytimesExtractor };
