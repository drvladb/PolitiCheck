import { extractText } from "./helpers/extracter";
import { wait } from "@pages/helpers/wait";

(async () => {
  await wait(2000); // make sure page loads
  const pageResults = extractText(window.location.host, document);
  console.log(pageResults);
})();
