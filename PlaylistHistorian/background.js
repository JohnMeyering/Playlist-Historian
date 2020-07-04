'use strict';

chrome.runtime.onInstalled.addListener(function() {
  
  //    "Use the chrome.declarativeContent API to take actions depending on the
  //    content of a page, without requiring permission to read the page's content."
  // https://developer.chrome.com/extensions/declarativeContent
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() 
  {
      chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher(
        {
          pageUrl: {
            hostEquals: 'www.youtube.com',
            urlContains: "playlist"
          },
        }
        )],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});