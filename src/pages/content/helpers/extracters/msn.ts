import { Extraction } from "../Extraction";
import {genericCleaner} from "./helpers"

const msnExtractor = (pageContent: Document): Extraction => {
  return { state: "unsupported" };
  const article = pageContent.getElementsByClassName("article-body")[0];
  if (!article) return { state: "failure" };
  // @ts-ignore not sure why
  const articleText = article.innerText.replaceAll("\n", " ");

  // return {
  //   state: "success",
  //   content: articleText,
  // };
};

export { msnExtractor };
