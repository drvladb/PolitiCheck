import { extractText } from "./helpers/extracter";
import {wait} from "@pages/helpers/wait"

(async () => {
    await wait(1)
    const pageResults = extractText(window.location.host, "test")
    console.log(pageResults)
})()