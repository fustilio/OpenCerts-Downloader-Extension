import { jsPDF } from "jspdf";

function handleOpenCerts(tab: chrome.tabs.Tab, fileType: 'PNG' | 'PDF') {

  if (tab.id) {
    chrome.tabs.sendMessage(
      tab.id,
      {
        type: "OPENCERTS",
        fileType
      }
    );
  }
}

function onDownloadAsPdf(_: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) {
  handleOpenCerts(tab, 'PDF');
}

function onDownloadAsPng(_: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) {
  handleOpenCerts(tab, 'PNG');
}


// Create one test item for each context type.
let id = chrome.contextMenus.create({
  title: "Download certificate",
  contexts: ['page'],
  documentUrlPatterns: [
    "*://legacy.opencerts.io/*"
  ],
});

chrome.contextMenus.create({
  parentId: id,
  title: "as image",
  contexts: ['page'],
  documentUrlPatterns: [
    "*://legacy.opencerts.io/*"
  ],
  onclick: onDownloadAsPng
});

chrome.contextMenus.create({
  parentId: id,
  title: "as pdf",
  contexts: ['page'],
  documentUrlPatterns: [
    "*://legacy.opencerts.io/*"
  ],
  onclick: onDownloadAsPdf
});

function handleDownloadPng(dataUri: string) {
  chrome.downloads.download({
    url: dataUri,
    filename: "document.png" // Optional
  });
}

function handleDownloadPdf(
  dataUri: string, 
  width: number,
  height: number,
  orientation: "p" | "portrait" | "l" | "landscape" = 'p') {
  let doc = new jsPDF({
    unit: 'cm',
    orientation
  });
  doc.addImage({
    imageData: dataUri,
    x: 0,
    y: 0,
    width,
    height
  });
  let pdfBlob = new Blob([ doc.output('blob') ], { type : 'application/pdf'}); 
  let url = URL.createObjectURL(pdfBlob);
  chrome.downloads.download({
    url,
    filename: "document.pdf" // Optional
  });
}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (sender.tab) {
      if ((request.type && request.type === "DOWNLOAD") 
      ) {

        if (request.fileType) {
          if (request.fileType === "PNG") {
            handleDownloadPng(request.dataUri);
          } else if (request.fileType === "PDF") {
            console.log(request.width);
            console.log(request.height);
            console.log(request.orientation);
            handleDownloadPdf(request.dataUri, request.width, request.height, request.orientation);
          }
        }
        
        sendResponse({ message: "done" });
      }
    }

  }
);