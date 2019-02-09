var mainMenu = {
	'id': "lookupDictionary",
	'title': "Lookup Dictionary",
	"contexts": ["selection"]
};
var cambridgeItem = {
	'id': "lookupCambridge",
	'title': "Lookup Cambridge",
	'parentId': "lookupDictionary",
	"contexts": ["selection"]
};

var collinsItem = {
	'id': "lookupCollins",
	'title': "Lookup Collins",
	'parentId': "lookupDictionary",
	"contexts": ["selection"]
};

var merriamItem = {
	'id': "lookupMerriamWebster",
	'title': "Lookup Merriam Webster",
	'parentId': "lookupDictionary",
	"contexts": ["selection"]
};

var longmanItem = {
	'id': "lookupLongman",
	'title': "Lookup Longman",
	'parentId': "lookupDictionary",
	"contexts": ["selection"]
};

var arr = [];
const KEY = 'dictionary_list';

chrome.contextMenus.removeAll(function(){
	chrome.contextMenus.create(mainMenu);
	chrome.contextMenus.create(cambridgeItem);
	chrome.contextMenus.create(collinsItem);
	chrome.contextMenus.create(merriamItem);
	chrome.contextMenus.create(longmanItem);
});

chrome.contextMenus.onClicked.addListener(function (clickData){
	if (clickData.menuItemId == 'lookupCambridge' && clickData.selectionText) {
		var myWindow = window.open("https://dictionary.cambridge.org/dictionary/english/"+clickData.selectionText, "", "width=500,height=500");
		var isExist = 0;
		for (var i =0; i < arr.length; i++) {
			if (arr[i].word === clickData.selectionText) {
				arr[i].count = arr[i].count + 1;
				isExist = 1;
			}
		}
		if (!isExist) {
			arr.push({'word': clickData.selectionText, 'count': 1});
		}
		var obj = {};
		obj[KEY] = arr;
		chrome.storage.local.set(obj, function(){});
	}
	if (clickData.menuItemId == 'lookupCollins' && clickData.selectionText) {
		var myWindow = window.open("https://www.collinsdictionary.com/dictionary/english/"+clickData.selectionText, "", "width=500,height=500");
	}
	if (clickData.menuItemId == 'lookupMerriamWebster' && clickData.selectionText) {
		var myWindow = window.open("https://www.merriam-webster.com/dictionary/"+clickData.selectionText, "", "width=500,height=500");
	}
	if (clickData.menuItemId == 'lookupLongman' && clickData.selectionText) {
		var myWindow = window.open("https://www.ldoceonline.com/dictionary/"+clickData.selectionText, "", "width=500,height=500");
	}
});

// chrome.commands.onCommand.addListener(function(command) {
// 	if (command == 'open-cambridge') {
// 		window.open("https://dictionary.cambridge.org/dictionary/english/"+window.getSelection().toString(), "", "width=500,height=500");
// 	}
// });