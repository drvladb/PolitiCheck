import { Extraction } from "../Extraction";
import { genericCleaner } from "./helpers";

const apnewsExtractor = (pageContent: Document): Extraction => {
  const article = pageContent.getElementsByClassName("RichTextStoryBody")[0]; // article element
  const otherNews = pageContent.getElementsByClassName("PageList-items")[0]; // irrelevant "other news"
  const title = document.getElementsByClassName("Page-headline")[0]; // title element
  if (!article) return { state: "failure" };
  // @ts-ignore not sure why
  const articleText = genericCleaner(article.innerText.replaceAll(otherNews.innerText, "")); // adjust cleaner if needed
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

export { apnewsExtractor };
