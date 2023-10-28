import { Extraction } from "../Extraction"

const nytimesExtractor = (pageContent: Document): Extraction => {
    const article = document.getElementsByName("articleBody")[0];
    if (!article) return {state: "failure"}
    // @ts-ignore not sure why 
    const articleText = article.innerText.replaceAll("\n", " ");
    
    return {
        state: "success",
        content: articleText
    }
}

export {nytimesExtractor}