//// Helpers ////////////////////////////////////////////////////////////////

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function notify(text) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "/icons/logo64.png",
    title: "identifiers.org",
    message: text
  });
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}



//// Context menu handlers ////////////////////////////////////////////////////////////////
const handleConvertUrl = async (url) => {
  const resolvedData = await fetch ("https://resolver.api.identifiers.org/reverse/byPrefix", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({apiVersion: "1.0", payload: {url}})
  })
    .then(res => res.status === 200 ? res.json() : null, (reason) => notify(reason))
  
  if (!resolvedData) {
    notify(`'${url}' could not be converted`);
  } else {
    const { possible_idorg_url } = resolvedData.payload;
    const tab = await getCurrentTab();
    console.log(tab);
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [possible_idorg_url],
      func: async (url) => {
        // This code runs in the content script context where the clipboard is available
        await navigator.clipboard.writeText(url);
      },
    });
    notify("URI copied to clipboard");
  }
}

const handleResolveCurie = async (curie) => {
  const resolvedData = await fetch ("https://resolver.api.identifiers.org/" + curie)
    .then(res => res.ok ? res.json() : null, (reason) => notify(reason))
  if (!resolvedData) {
    notify(`Failed tor resolve '${curie}'`);
  } else {
    const { rawRequest } = resolvedData.payload.parsedCompactIdentifier;
    chrome.tabs.create({url:`http://identifiers.org/${rawRequest}`});
  }
}

async function handleResolveCurieClick(info) {
  const curie = info.linkText || info.selectionText;
  await handleResolveCurie(curie);
}

async function handleConvertUrlClicked(info) {
  const url = info.linkUrl || info.selectionText;

  if (isValidHttpUrl(url)) {
    await handleConvertUrl(url);
  } else {
    notify(`Invalid URL: '${url}'`);
  }
}

async function handleConvertThisPageClicked(info) {
  const { pageUrl } = info
  await handleConvertUrl(pageUrl);
}




//// Context menu setup ////////////////////////////////////////////////////////////////
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
          id: "idorg-resolve-curie",
          title: "Resolve selected CURIE",
          contexts: ["selection", "link"],
      }, () => chrome.runtime.lastError
    );

  chrome.contextMenus.create({
          id: "idorg-convert-url",
          title: "Get identifiers.org URI for selected URL",
          contexts: ["selection", "link"],
      }, () => chrome.runtime.lastError
  );

  chrome.contextMenus.create({
          id: "idorg-convert-this-page",
          title: "Get identifiers.org URI for this page",
          contexts: ["all"],
      }, () => chrome.runtime.lastError
  );
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "idorg-resolve-curie") {
    await handleResolveCurieClick(info);
  }

  if (info.menuItemId === "idorg-convert-url") {
    await handleConvertUrlClicked(info);
  }

  if (info.menuItemId === "idorg-convert-this-page") {
    await handleConvertThisPageClicked(info)
  }
});