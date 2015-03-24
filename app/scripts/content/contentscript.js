'use strict';
(function() {
    var name = document.querySelector('.full-name');
    var plusModal = false;
    var previewModal = false;
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
        Profile.added = true;
        Storage.setProfile(Profile, function(res) {
            console.log(res);
            plusModal.classList.remove('show');
        });
    };
    var propagateTemplates = function() {
        return new Promise(function(resolve) {
            plusModal = Transparency.render(document.querySelector('#linkedInExt-personForm'), Profile);
            if (Profile.added) {
                previewModal = Transparency.render(document.querySelector('#linkedInExt-personPreview'), Profile);
                previewModal.classList.add('show');
            }
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
        id: null,
        img:null,
        name: null,
        email: null,
        city: null,
        status: null,
        comment: null,
        tags: [],
        added: false
    };
    var setProfile = function(data) {
        if (!data) {
            Profile.name = document.querySelector(NAME_EL).textContent;
            Profile.city = document.querySelector(LOCAL_EL).textContent;
            Profile.img = document.querySelector(IMG_EL).src;
        } else {
            Profile = data;
        }
    };
    var init = function() {
        var profileId = window.location.search.match(/id=(\d+)/)[1];
        Profile.id = profileId;
        Storage.getProfile(profileId, function(res) {
            console.log(res);
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