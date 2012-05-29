/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var App = function() {
    
    var off = true;
    
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
        var loc = window.location.href;
        var w = $(document).width();
        var h = $(document).height();
        
        $('body').html('<iframe id="pageFrame" src="'+loc+'" width="'+w+'" height="'+h+'" />');
        $('body').prepend('<div id="pageHeader"></div>');
        
        setTimeout(function() {
            detectClick();
        }, 1000);
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