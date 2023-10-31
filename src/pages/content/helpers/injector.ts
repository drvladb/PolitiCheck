import { Extraction } from "./Extraction";
import { cnnInjector } from "./injectors/cnn";
import { foxNewsInjector } from "./injectors/foxnews";
import { nyTimesInjector } from "./injectors/nytimes";

/**
 * Main injection manager
 * Supported websites: CNN, NYTimes, Fox News, etc.
 * @param webHost `window.location.host` of the page
 * @param bias Bias type
 * @param pageContent Page content object
 * @returns None
 */
const injectBadge = (
  webHost: string,
  bias: "neutral" | "conservative" | "liberal",
  pageContent: Document,
): void => {
  switch (webHost) {
    case "edition.cnn.com":
    case "www.cnn.com": {
      cnnInjector(bias, pageContent);
      break;
    }
    case "www.nytimes.com": {
      nyTimesInjector(bias, pageContent);
      break;
    }
    case "www.foxnews.com": {
      foxNewsInjector(bias, pageContent);
      break;
    }
  }
};

export { injectBadge };
