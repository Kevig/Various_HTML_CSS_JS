

function changeStyle(cssFile) {
	var _head = document.getElementsByTagName('head')[0];
        
        var newlink = document.createElement('link');
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFile);

        _head.appendChild(newlink);
}
	  

if ( window.innerWidth <= 480 )
{
	changeStyle("./ECardMobileStyle.css");
}
else
{
	changeStyle("./ECardStyle.css");
}

