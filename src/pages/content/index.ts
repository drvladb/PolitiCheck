import { getPrediction } from "../helpers/api";
import { extractText } from "./helpers/extracter";
import { wait } from "@pages/helpers/wait";
import { injectBadge } from "./helpers/injector";
import { addOneLifetimeStats, addReadArticle } from "../helpers/firestore";
import { firestore, getAuth } from "../helpers/firebase";

const mapPredicition = (
  predicition: string,
): "neutral" | "conservative" | "liberal" => {
  switch (predicition) {
    case "right":
      return "conservative";
    case "left":
      return "liberal";
    default:
      return "neutral";
  }
};

const cleanUrl = (url: string): string => {
  return url.split("#")[0];
};

(async () => {
  await wait(2000); // make sure page loads
  const pageResults = extractText(window.location.host, document);
  if (pageResults.state == "success" && pageResults.article) {
    const prediction = await getPrediction(pageResults.article.content); // pretty fast (300ms) - server dead, quick replacement
    // const prediction = { prediction: "neutral" };
    const rPrediction = mapPredicition(prediction.prediction);
    // inject
    injectBadge(window.location.host, rPrediction, document);
    // update database
    const auth = await getAuth();
    if (!auth.isLoggedIn || !auth.user) return; // user must login (for stats to be saved)
    addReadArticle(
      {
        url: cleanUrl(document.location.href),
        name: pageResults.article.title,
      },
      rPrediction,
      auth.user,
      firestore,
    );
  }
})();
