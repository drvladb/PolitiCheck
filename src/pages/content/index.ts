import { getPrediction } from "../helpers/api";
import { extractText } from "./helpers/extracter";
import { wait } from "@pages/helpers/wait";

(async () => {
  await wait(2000); // make sure page loads
  const pageResults = extractText(window.location.host, document);
  if (pageResults.state == "success" && pageResults.article) {
    const prediction = await getPrediction(pageResults.article.content); // pretty fast (300ms)
    // console.log(prediction.prediction)
    // inject 
  }
})();
