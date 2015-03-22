'use strict';
(function() {
    var name = document.querySelector('.full-name');
    var plusModal = false;
    var taggle = null;
    var showPlusModal = function() {
        if (!plusModal) {
            plusModal = document.querySelector('#linkedInExt-personForm');
        }
        plusModal.classList.add('show');
        document.querySelector('#linkedInExt-tags').innerHTML = '';
        taggle = new Taggle('linkedInExt-tags', {
            tags: Profile.tags
        });
    };
    var addPlusButton = function() {
        var button = document.createElement('button');
        button.textContent = '+';
        button.addEventListener('click', showPlusModal);
        name.parentNode.appendChild(button);
    };
    var editPerson = function(e) {
        e.preventDefault();
        Profile.email = this.querySelector('.linkedInExt-email input').value;
        Profile.status = this.querySelector('.linkedInExt-status').value;
        Profile.city = this.querySelector('.linkedInExt-city input').value;
        Profile.comment = this.querySelector('.linkedInExt-comment textarea').value;
        Profile.tags = taggle.getTags().values;
        chrome.runtime.sendMessage({
            msg: 'setProfile',
            profile: JSON.stringify(Profile)
        }, function(res) {
            plusModal.classList.remove('show');   
        });
        
    };
    var propagateTemplates = function() {
        return new Promise(function(resolve) {
            plusModal = Transparency.render(document.querySelector('#linkedInExt-personForm'), Profile);
            resolve(true);

        });
    };
    var attachTemplateEvents = function() {
        plusModal.addEventListener('submit', editPerson);
        plusModal.querySelector('.linkedInExt-close').addEventListener('click', function(e) {
            e.preventDefault();
            plusModal.classList.remove('show');
        });
    };
    var Profile = {
        id:null,
        name: null,
        email: null,
        city: null,
        status: null,
        comment: null,
        tags: [],
    };
    var setProfile = function(data) {
        if (!data) {
            Profile.name = document.querySelector(NAME_EL).textContent;
            Profile.city = document.querySelector(LOCAL_EL).textContent;
        } else {
            Profile = data;
        }
        console.log(Profile);
    };
    var init = function() {
        var profileId = window.location.search.match(/id=(\d+)/)[1];
        Profile.id = profileId;
        chrome.runtime.sendMessage({
            msg: 'getProfile',
            id: profileId
        }, function(res) {
            setProfile(res);
            getTemplates().then(propagateTemplates).then(attachTemplateEvents);
            addPlusButton();
        });
    };
    var getTemplates = function() {
        return new Promise(function(resolve, reject) {
            try {
                var xmlHttp = null,
                    scriptSrc = chrome.extension.getURL('scripts/content/templates.html');
                xmlHttp = new XMLHttpRequest();
                xmlHttp.open('GET', scriptSrc, false);
                xmlHttp.send(null);
                var inject = document.createElement('div');
                inject.innerHTML = xmlHttp.responseText;
                document.body.insertBefore(inject, document.body.firstChild);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };
    init();
})();