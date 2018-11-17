var contextMenuItem = {
	'id': "lookupCambridge",
	'title': "Lookup Cambridge",
	"contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData){
	if (clickData.menuItemId == 'lookupCambridge' && clickData.selectionText) {
		var myWindow = window.open("https://dictionary.cambridge.org/dictionary/english/"+clickData.selectionText, "", "width=500,height=500");
	}
});