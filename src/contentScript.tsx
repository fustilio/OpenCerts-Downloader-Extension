import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf";

type PageInfo = {
  uri: string;
  orientation: "p" | "portrait" | "l" | "landscape";
};

async function downloadNode(node: HTMLElement) {
  let scale = 2;
  chrome.storage.sync.get(["storedResolution"], (items) => {
    scale = items.storedResolution;
  });
  let orientation = node.clientWidth > node.clientHeight ? "l" : "p";

  let originalMargin = node.style.margin;
  let originalPadding = node.style.padding;
  let originalBoxShadow = node.style.boxShadow;

  node.style.margin = "unset";
  node.style.padding = "unset";
  node.style.boxShadow = "none";

  node.style.width = orientation === "p" ? "21cm" : "29.7cm";
  node.style.height = orientation === "p" ? "29.7cm" : "21cm";

  function resetStyles() {
    if (node) {
      node.style.margin = originalMargin;
      node.style.padding = originalPadding;
      node.style.boxShadow = originalBoxShadow;
    }
  }

  let blob = await domtoimage.toBlob(node, {
    width: node.clientWidth * scale,
    height: node.clientHeight * scale,
    style: {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left",
    },
  });

  let uri = URL.createObjectURL(blob);

  resetStyles();
  return {
    uri,
    orientation,
  } as PageInfo;
}

chrome.runtime.onMessage.addListener(async function (
  msg,
  sender,
  sendResponse
) {
  if (!sender.tab) {
    console.log("received message: ", msg);
    if (msg.type === "OPENCERTS") {
      if (!msg.fileType) {
        return;
      }

      let certificate = document.getElementById("rendered-certificate");

      if (
        !certificate ||
        !certificate.children ||
        certificate.children.length === 0
      ) {
        return;
      }

      let pages = Array.from(certificate.children[0].children).filter(
        (node) => node.nodeName !== "P"
      ) as HTMLElement[];

      if (pages.length === 0) {
        return;
      }

      let tasks = [];

      for (let i = 0; i < pages.length; i++) {
        tasks.push(downloadNode(pages[i]));
      }

      let results: {
        uri: string;
        orientation: "p" | "portrait" | "l" | "landscape";
      }[] = await Promise.all(tasks);

      if (msg.fileType === "PNG") {
       
        results.forEach((result, index) => {
          const { uri } = result;
          chrome.runtime.sendMessage(
            {
              type: "DOWNLOAD",
              fileType: msg.fileType,
              uri,
              filename: `document-page-${index}.png`
            },
            function (res) {
              console.log(
                "received response on sending download message: ",
                res
              );
            }
          );
        });
      } else if (msg.fileType === "PDF") {
        
        let uri = handleDownloadPdf(results);
        chrome.runtime.sendMessage(
          {
            type: "DOWNLOAD",
            fileType: msg.fileType,
            uri,
          },
          function (res) {
            console.log("received response on sending download message: ", res);
          }
        );
      }
    }
  }
});


function handleDownloadPng(
  dataUri: string,
  width: number,
  height: number,
  orientation: "p" | "portrait" | "l" | "landscape" = "p"
) {
  chrome.downloads.download({
    url: dataUri,
    filename: "document.png", // Optional
  });
}

function handleDownloadPdf(
  data: {
    uri: string;
    orientation: "p" | "portrait" | "l" | "landscape";
  }[]
) {
  let doc = new jsPDF({
    unit: "cm",
    orientation: data[0].orientation,
  });

  for (let i = 0; i < data.length; i++) {
    let orientation = data[i].orientation;
    if (i !== 0) {
      doc.addPage((orientation = orientation));
    }

    console.log(data[i].uri);
    doc.addImage({
      imageData: data[i].uri,
      x: 0,
      y: 0,
      width: orientation === "p" ? 21 : 29.7,
      height: orientation === "p" ? 29.7 : 21,
    });
  }

  let pdfBlob = new Blob([doc.output("blob")], { type: "application/pdf" });
  return URL.createObjectURL(pdfBlob);
}