const getBadgeURL = (bias: "neutral" | "conservative" | "liberal") => {
    // chrome-extension://fmmkogdoinakkcepgeakdijoakmokndg/public/neutralbadge.png
    const id = chrome.runtime.id;
    return `chrome-extension://${id}/public/${bias}badge.png`;
}

export {getBadgeURL}