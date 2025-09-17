function errorCallback() {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError.message);
  }
  return chrome.runtime.lastError;
}


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
          id: "idorg-resolve-curie",
          title: "Resolve selected CURIE",
          contexts: ["selection"],
      }, errorCallback
  );

  chrome.contextMenus.create({
          id: "idorg-covert-url",
          title: "Covert URL to identifiers.org URI",
          contexts: ["selection", "link"],
      }, errorCallback
  );

  chrome.contextMenus.create({
          id: "idorg-covert-this-page",
          title: "Covert this page to identifiers.org URI",
          contexts: ["all"],
      }, errorCallback
  );
});

const createNotification = (text) => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "/icons/identifiers_logo.png",
    title: "identifiers.org",
    message: text
  }).then(console.log, console.error)
}

function notify(text) {
  console.log('Initial permission:', Notification.permission);
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(decision => {
        console.log({decision});
        if (decision === 'granted') {
          createNotification(text)
        }
      }, console.debug
    )
  } else if (Notification.permission === 'granted') {
    createNotification(text)
  }
}

function handleResolveCurieClick(info) {
  const { selectionText } = info;
  notify("Selected curie: "+ selectionText)
}

function handleConvertUrlClicked(info) {
    if (info.linkUrl) {
      notify("URL " + info.linkUrl);
    } else {
      const { selectionText } = info;
      notify("Selected URL: " + selectionText);
    }
}

function handleConvertThisPageClicked(info) {
  const { pageUrl } = info
  notify("Current page URL: " + pageUrl);
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "idorg-resolve-curie") {
    handleResolveCurieClick(info);
  }

  if (info.menuItemId === "idorg-covert-url") {
    handleConvertUrlClicked(info);
  }

  if (info.menuItemId === "idorg-covert-this-page") {
    handleConvertThisPageClicked(info)
  }
});