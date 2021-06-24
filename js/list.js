const KEY = 'dictionary_list';

function getLists(callback) {
    chrome.storage.local.get(KEY, function(data){
        arr = data[KEY];
        callback(arr);
    });
}

function deleteAll() {
    var elm = document.getElementsByClassName('ul--list')[0];
    elm.innerHtml = "";
    chrome.storage.local.remove(KEY);
    window.location.href="list.html";
}

function loadEvent() {
    var btn = document.getElementById('deleteAll');
    if (btn) {
        btn.addEventListener('click', function() {
            deleteAll();
        });
    }
    var lookups = document.getElementsByClassName('look-up');
    if (lookups !== 'undefined' && lookups.length) {
        for (var i=0; i<lookups.length; i++) {
            lookups[i].addEventListener('click', function() {
                window.open("https://dictionary.cambridge.org/dictionary/english/"+this.getAttribute("attr-word"), "", "width=500,height=500");
            });
        }
    }
}

function run(){
    getLists(function(arr){
        var elm = document.getElementsByClassName('ul--list')[0];
        var html = "";
        if (typeof arr !== 'undefined' && arr.length > 0) {
            for (var i=0; i<arr.length; i++) {
                html = html+"<li><a href='#' class='look-up' attr-word='"+arr[i].word+"'>"+arr[i].word+" ("+arr[i].count+")"+"</a></li>"
            }
            html = html+"<li><a href='#' id='deleteAll'>Delete All</a></li>";
        }
        else {
            html = "<li><a href='#'>No Items</a></li>";
        }
        elm.innerHTML = html;
        loadEvent();
    });
}

run();