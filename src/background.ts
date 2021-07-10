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
  title: "Download OpenCerts document(s)",
  contexts: ['page'],
  documentUrlPatterns: [
    "*://legacy.opencerts.io/*"
  ],
});

chrome.contextMenus.create({
  parentId: id,
  title: "as PNG",
  contexts: ['page'],
  documentUrlPatterns: [
    "*://legacy.opencerts.io/*"
  ],
  onclick: onDownloadAsPng
});

chrome.contextMenus.create({
  parentId: id,
  title: "as PDF",
  contexts: ['page'],
  documentUrlPatterns: [
    "*://legacy.opencerts.io/*"
  ],
  onclick: onDownloadAsPdf
});

function handleDownloadPng(
  dataUri: string, 
  width: number,
  height: number,
  orientation: "p" | "portrait" | "l" | "landscape" = 'p') {
  chrome.downloads.download({
    url: dataUri,
    filename: "document.png" // Optional
  });
}

function handleDownloadPdf(
  data: {
    uri: string
    orientation: "p" | "portrait" | "l" | "landscape"
  }[] ) {
  
  
  let doc = new jsPDF({
    unit: 'cm',
    orientation: data[0].orientation
  });

  for (let i = 0; i < data.length; i++) {
    let orientation = data[i].orientation;
    if (i !== 0) {
      doc.addPage(orientation=orientation);
    }

    console.log(data[i].uri);
    doc.addImage({
      imageData: data[i].uri,
      x: 0,
      y: 0,
      width: orientation === 'p' ? 21 : 29.7,
      height: orientation === 'p' ? 29.7 : 21
    });
  }

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
            handleDownloadPng(request.dataUri, request.width, request.height, request.orientation);
          } else if (request.fileType === "PDF") {
            handleDownloadPdf(request.data);
          }
        }
        
        sendResponse({ message: "done" });
      }
    }

  }
);
