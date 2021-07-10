import domtoimage from 'dom-to-image';

const SCALE = 3;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log("received message: ", msg);

  if (!sender.tab) {
    if (msg.type === "OPENCERTS") {
      if (!msg.fileType) {
        return;
      }

      let articles = document.body.getElementsByTagName('article');
      if (articles.length === 0) {
        return;
      }
  
      let node = articles[0].parentElement;

  
      if (node) {
        let originalMargin = node.style.margin;
        let originalPadding = node.style.padding;
        let originalBoxShadow = node.style.boxShadow;

        node.style.margin = 'unset';
        node.style.padding = 'unset';
        node.style.boxShadow = 'none';

        function resetStyles() {
          if (node) {
            node.style.margin = originalMargin;
            node.style.padding = originalPadding;
            node.style.boxShadow = originalBoxShadow;
          }
        }

        domtoimage.toBlob(node, {
          width: node.clientWidth * SCALE,
          height: node.clientHeight * SCALE,
          style: {
            transform: 'scale(' + SCALE + ')',
            transformOrigin: 'top left'
          }
        }).then(function (blob) {
          let url = URL.createObjectURL(blob);
          let orientation = node!.clientWidth > node!.clientHeight ? 'l' : 'p';
          resetStyles();
          chrome.runtime.sendMessage(
            {
              type: 'DOWNLOAD',
              fileType: msg.fileType,
              dataUri: url,
              width: orientation === 'p' ? 21 : 29.7,
              height: orientation === 'p' ? 29.7 : 21,
              orientation
            }, function(res) {
              console.log("received response on sending download message: ", res);
            }
          );
        },);
      }
    }
  }
 
});
