

function handleOpenCerts(tab: chrome.tabs.Tab, fileType: "PNG" | "PDF") {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: "OPENCERTS",
      fileType,
    });
  }
}


let parentId = "OpenCerts-Downloader-Page";
let asPNGId = `${parentId}-PNG`;
let asPDFId = `${parentId}-PDF`;

chrome.contextMenus.create({
  id: parentId,
  title: "Download OpenCerts document(s)",
  contexts: ["page"],
  documentUrlPatterns: ["*://*.opencerts.io/*"],
});

chrome.contextMenus.create({
  id: asPNGId,
  parentId: parentId,
  title: "as PNG",
  contexts: ["page"],
  documentUrlPatterns: ["*://*.opencerts.io/*"],
});

chrome.contextMenus.create({
  id: asPDFId,
  parentId: parentId,
  title: "as PDF",
  contexts: ["page"],
  documentUrlPatterns: ["*://*.opencerts.io/*"],
});

chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab) => {
  
  console.log(info);

  if (!tab) {
    return;
  }

  switch (info.menuItemId) {
    case asPNGId:
      handleOpenCerts(tab, "PNG");
      break;
    case asPDFId:
      handleOpenCerts(tab, "PDF");
      break;
    default:
      console.error("Not handled");
      break;
  }

})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (sender.tab) {
      if ((request.type && request.type === "DOWNLOAD")
      ) {
        if (request.fileType) {

          let defaultFileName = "document";
          chrome.storage.sync.get(['storedDefaultFileName'], function(result) {
            
            defaultFileName = result.storedDefaultFileName;
          });

          console.log('Default filename is currently is ' + defaultFileName);

          if (request.fileType === "PNG") {
            chrome.downloads.download({
              url: request.uri,
              filename: request.filename ?? "document.png",
            });
          } else if (request.fileType === "PDF") {
            chrome.downloads.download({
              url: request.uri,
              filename: request.filename ?? "document.pdf"
            });
          }
        }
        sendResponse({ message: "done" });
      }
    }

  }
);


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    storedResolution: 2,
    storedDefaultFileName: 'document', });
});
