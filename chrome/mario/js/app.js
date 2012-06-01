/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var App = function() {
    
    var off = true;
    
    // experimental: listen for link clicks and delay so I can play the animation before moving on
    var detectClick = function() {
        console.debug('setting event');
        var links = $('#pageFrame').contents().find('a');
        
        links.on('click', function(evt) {
            evt.preventDefault();
            var dest = evt.currentTarget.href;
            console.debug(dest);
        });
    }
    
    var inject = function() {
        
        $(document).ready(function() {
            var loc = window.location.href;
            var b = $('body');
            var head = $('head');
            var w = $(document).width();
            var h = $(document).height();
            
            var cHeaderWrap = chrome.extension.getURL('images/header/top-bar-repeat.jpg'),
                cHeader = chrome.extension.getURL('images/header/top-bar.png'),
                cScore = chrome.extension.getURL('images/header/score-placeholder.png'),
                cOnButton = chrome.extension.getURL('images/header/on-button.png'),
                cOffButton = chrome.extension.getURL('images/header/off-button.png'),
                cOnText = chrome.extension.getURL('images/header/on-placeholder.png'),
                cOffText = chrome.extension.getURL('images/header/on-placeholder.png'),
                cMarioHead = chrome.extension.getURL('images/header/mario-head.png');
            
            var styles =    '<style>';
                
                styles +=       '.coins-on-button {';
                styles +=           'background: url('+cOnButton+') scroll no-repeat transparent;';
                styles +=       '}';
                
                styles +=       '.coins-off-button {';
                styles +=           'background: url('+cOffButton+') scroll no-repeat transparent;';
                styles +=       '}';
                
                styles +=       '.coins-on-text {';
                styles +=           'background: url('+cOnText+') scroll no-repeat transparent;';
                styles +=       '}';
                
                styles +=       '.coins-off-text {';
                styles +=           'background: url('+cOffText+') scroll no-repeat transparent;';
                styles +=       '}';
                
                styles +=   '</style>';
            
            // note: I can also get the url of the image by doing chrome.extension.getURL("images/whatever.png")
            var header =    '<div id="coins-spacer"></div>';
                header +=   '<div id="coins-header-wrap" style="background: url('+cHeaderWrap+');">';
                header +=       '<div id="coins-header" style="background: url('+cHeader+');">';
                header +=           '<img id="coins-mario-head" src="'+cMarioHead+'" alt="Mario Head" />';                
                header +=           '<a href="javascript:void(0);" id="coins-on-off-button" class="coins-off-button" ></a>';
                header +=           '<div id="coins-on-off-text" class="coins-on-text"  style="background: url('+cOnText+');"></div>';
                header +=           '<div id="coins-score" style="background: url('+cScore+');"></div>';
                header +=       '</div>';
                header +=   '</div>';
            
            head.append(styles);
            b.html('<iframe id="pageFrame" src="'+loc+'" width="'+w+'" height="'+h+'" scrolling="no" frameborder="0" />');
            b.prepend(header);
            
            setTimeout(function() {
                detectClick();
            }, 1000);
        });
        
        $('#coins-on-off-button').on('click', function() {
            
            var cOnButton = chrome.extension.getURL('images/header/on-button.png'),
                cOffButton = chrome.extension.getURL('images/header/off-button.png');
            
            if($(this).hasClass('coins-off-button')) {
                $(this).removeClass('coins-off-button');
                $(this).addClass('coins-on-button');
//                $(this).css({
//                    'background' : 'url('+cOnButton+')'
//                });
            } else {
                $(this).removeClass('coins-on-button');
                $(this).addClass('coins-off-button');
//                $(this).css({
//                    'background' : 'url('+cOffButton+')'
//                });
            }
        });
        
    }
    
    var remove = function() {
        $('body').remove('#pageHeader');
    }
    
    this.init = function() {
        // on or off?
        off = (off) ? false : true;
        // if we're on
        if(!off) {
            inject();
        }
        // if we're off
        if(off) {
            remove();
        }
        
    }
}

var app = new App();

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    
    if(request.evt == 'clicked') {
        app.init();
        sendResponse({received: 'got it'});
    }
    
});