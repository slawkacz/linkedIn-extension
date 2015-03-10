'use strict';
(function(){

  var name = document.querySelector('.full-name');
  var plusModal = null;
  var showPlusModal = function(){

  };
  var addPlusButton = function(){
    var button = document.createElement('button');
    button.textContent = "+";
    button.addEventListener('click',showPlusModal);
    name.parentNode.appendChild(button);
  };
  var addPlusModal = function(){
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = plusModalTemplate;
    console.log(tempDiv.childNodes[0]);
    document.body.appendChild(tempDiv.childNodes[0]);
  };

  var init = function(){
    getTemplates();
    addPlusButton();
    addPlusModal();
  };
  var getTemplates = function(){
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    console.log(chrome);
    xmlHttp.open( "GET", chrome.extension.getURL ("scripts/content/templates.html"), false );
    xmlHttp.send( null );
    var inject  = document.createElement("div");
    inject.innerHTML = xmlHttp.responseText;
    document.body.insertBefore (inject, document.body.firstChild);

  };
  init();

})();

