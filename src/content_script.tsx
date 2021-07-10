import domtoimage from 'dom-to-image';

type PageInfo = {
  uri: string;
  orientation: "p" | "portrait" | "l" | "landscape";
}

async function downloadNode(node: HTMLElement) {
  let scale = 2;
  chrome.storage.sync.get(["storedResolution"],
    (items) => {
      scale = items.storedResolution;
    }
  );
  let orientation = node.clientWidth > node.clientHeight ? 'l' : 'p';

  let originalMargin = node.style.margin;
  let originalPadding = node.style.padding;
  let originalBoxShadow = node.style.boxShadow;

  node.style.margin = 'unset';
  node.style.padding = 'unset';
  node.style.boxShadow = 'none';

  node.style.width = orientation === 'p' ? '21cm' : '29.7cm';
  node.style.height = orientation === 'p' ? '29.7cm' : '21cm';
  

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
      transform: 'scale(' + scale + ')',
      transformOrigin: 'top left'
    }
  });

  let uri = URL.createObjectURL(blob);
    
  resetStyles();
  return {
    uri, 
    orientation
  } as PageInfo;
}

chrome.runtime.onMessage.addListener(async function (msg, sender, sendResponse) {
  if (!sender.tab) {
    console.log("received message: ", msg);
    if (msg.type === "OPENCERTS") {
      if (!msg.fileType) {
        return;
      }

      let certificate = document.getElementById('rendered-certificate');

      if (!certificate || !certificate.children || certificate.children.length === 0) {
        return;
      }

      let pages = Array.from(certificate.children[0].children).filter((node) => node.nodeName !== 'P') as HTMLElement[];

    
      if (pages.length === 0) {
        return;
      }
      
      let tasks = [];

      for (let i = 0; i < pages.length; i++) {
        tasks.push(downloadNode(pages[i]));
      }

      let results: {
        uri: string
        orientation: "p" | "portrait" | "l" | "landscape"
      }[] = await Promise.all(tasks);
      
      if (msg.fileType === "PNG") {
        results.forEach((result) => {
          const { uri, orientation } = result;
          chrome.runtime.sendMessage(
            {
              type: 'DOWNLOAD',
              fileType: msg.fileType,
              dataUri: uri,
              width: orientation === 'p' ? 21 : 29.7,
              height: orientation === 'p' ? 29.7 : 21,
              orientation
            }, function(res) {
              console.log("received response on sending download message: ", res);
            }
          );
        })
      } else if (msg.fileType === "PDF") {
        chrome.runtime.sendMessage(
          {
            type: 'DOWNLOAD',
            fileType: msg.fileType,
            data: results
          }, function(res) {
            console.log("received response on sending download message: ", res);
          }
        );
      }

  

    }
  }
 
});
