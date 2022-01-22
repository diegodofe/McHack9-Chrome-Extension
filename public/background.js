
let queryOptions = { active: true, currentWindow: true };
chrome.tabs.query(queryOptions, function (res) {
    console.log(res)
});

