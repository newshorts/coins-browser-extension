/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var App = function() {
    
    var detectClick = function() {
        console.debug('setting event');
        var links = $('#pageFrame').contents().find('a');
        
        links.on('click', function(evt) {
            evt.preventDefault();
            console.dir(evt);
            alert('clicked' + evt.currentTarget);
        });
    }
    
    this.init = function() {
        var loc = window.location.href;
        
        var w = $(document).width();
        var h = $(document).height();
        
        $('body').html('<iframe id="pageFrame" src="'+loc+'" width="'+w+'" height="'+h+'" />');
        
        $('body').prepend('<div id="test"></div>');
        
        setTimeout(function() {
            detectClick();
        }, 1000);
        
    }
}

var app = new App();
app.init();