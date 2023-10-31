import { Extraction } from "./Extraction";
import { cnnExtractor } from "./extracters/cnn";
import { foxNewsExtractor } from "./extracters/foxnews";
import { nytimesExtractor } from "./extracters/nytimes";

/**
 * Main extraction loader
 * Supported websites: CNN, NYTimes, Fox News, etc.
 * @param webHost `window.location.host` of the page
 * @param pageContent Page content object
 * @returns Extraction type: {supported, pageContent}
 */
const extractText = (webHost: string, pageContent: Document): Extraction => {
  switch (webHost) {
    case "edition.cnn.com":
    case "www.cnn.com": {
      return cnnExtractor(pageContent);
    }
    case "www.nytimes.com": {
      return nytimesExtractor(pageContent);
    }
    case "www.foxnews.com": {
      return foxNewsExtractor(pageContent);
    }
  }
  return {
    state: "unsupported",
  };
};

export { extractText };
