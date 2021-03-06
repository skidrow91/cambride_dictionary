var mainMenu = {
	'id': "lookupDictionary",
	'title': "Lookup Dictionary",
	"contexts": ["selection"]
};
var oxfordItem = {
	'id': "lookupOxford",
	'title': "Lookup Oxford",
	'parentId': "lookupDictionary",
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

// var longmanItem = {
// 	'id': "lookupLongman",
// 	'title': "Lookup Longman",
// 	'parentId': "lookupDictionary",
// 	"contexts": ["selection"]
// };

var arr = [];
const KEY = 'dictionary_list';

chrome.contextMenus.removeAll(function(){
	chrome.contextMenus.create(mainMenu);
	chrome.contextMenus.create(oxfordItem);
	chrome.contextMenus.create(cambridgeItem);
	chrome.contextMenus.create(collinsItem);
	chrome.contextMenus.create(merriamItem);
	// chrome.contextMenus.create(longmanItem);
});

chrome.contextMenus.onClicked.addListener(function (clickData){
	if (clickData.menuItemId == 'lookupOxford' && clickData.selectionText) {
		window.open("https://www.oxfordlearnersdictionaries.com/definition/english/"+clickData.selectionText, "", "width=500,height=500");
		addToList(clickData.selectionText)
	}
	if (clickData.menuItemId == 'lookupCambridge' && clickData.selectionText) {
		window.open("https://dictionary.cambridge.org/dictionary/english/"+clickData.selectionText, "", "width=500,height=500");		
		addToList(clickData.selectionText)
	}
	if (clickData.menuItemId == 'lookupCollins' && clickData.selectionText) {
		window.open("https://www.collinsdictionary.com/dictionary/english/"+clickData.selectionText, "", "width=500,height=500");
		addToList(clickData.selectionText)
	}
	if (clickData.menuItemId == 'lookupMerriamWebster' && clickData.selectionText) {
		window.open("https://www.merriam-webster.com/dictionary/"+clickData.selectionText, "", "width=500,height=500");
		addToList(clickData.selectionText)
	}
	// if (clickData.menuItemId == 'lookupLongman' && clickData.selectionText) {
	// 	window.open("https://www.ldoceonline.com/dictionary/"+clickData.selectionText, "", "width=500,height=500");
	// }
});


function addToList(text)
{
	var isExist = 0;
	var count = 1;
	var maxCount = 0, posDel = 0;
	for (var i =0; i < arr.length; i++) {		
		if (arr[i].word === text) {
			arr[i].count = arr[i].count + 1;
			isExist = 1;
		}
		if (arr[i].count > maxCount)
		{
			maxCount = arr[i].count;
			posDel = i;			  
		}
		count++;
	}
	if (!isExist) {
		arr.push({'word': text, 'count': 1});
		if (count > 9)
		{
			removeElementArr(posDel);
		}
	}
	var obj = {};
	obj[KEY] = arr;
	chrome.storage.local.set(obj, function(){});
}

function removeElementArr(index)
{	
	for (let i = index; i < arr.length; i++) {
		if (i != (arr.length -1)) 
		{
			arr[i] = arr[i+1];	
		}		
	}
	arr.length = arr.length-1;
}

// chrome.commands.onCommand.addListener(function(command) {
// 	if (command == 'open-cambridge') {
// 		window.open("https://dictionary.cambridge.org/dictionary/english/"+window.getSelection().toString(), "", "width=500,height=500");
// 	}
// });