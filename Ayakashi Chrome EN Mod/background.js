var ZG_UA='Mozilla/5.0 (Linux; U; Android 2.3.4; zh-cn; GT-I9100 Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 ZyngaBundleIdentifier/com.zynga.zjayakashi ZyngaBundleVersion/1.7.0';

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders[i].value=ZG_UA;
        break;
      }
    }
    return {requestHeaders: details.requestHeaders};
  },
  {urls: [
    "http://zc2.ayakashi.zynga.com/*"]},
  ["blocking", "requestHeaders"]);