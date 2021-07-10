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

        node.style.margin = '';
        node.style.padding = '';
        node.style.boxShadow = '';

        domtoimage.toBlob(node, {
          width: node.clientWidth * SCALE,
          height: node.clientHeight * SCALE,
          style: {
            transform: 'scale(' + SCALE + ')',
            transformOrigin: 'top left'
          }
        }).then(function (blob) {
          var url = URL.createObjectURL(blob);
          console.log(url);
          chrome.runtime.sendMessage(
            {
              type: 'DOWNLOAD',
              fileType: msg.fileType,
              dataUri: url
            }, function(res) {
              console.log("received response on sending download message: ", res);
            }
          );
        });
      }
    }
  }
 
});
