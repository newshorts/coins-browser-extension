/* 
 * 
 * 
 * 
 */


(function() {
    
    var App = function() {
        
        var w, h;
        var doc, bod, head;
        var c;
        
        var setStyle = function() {
            var style =     "<style>";
                style +=        "#coins-wrapper { position: relative; top: 200px; }";
                style +=        "#coins-header { z-index: 99998; width: "+w+"; height: 200px; background-color: #FF9900; position: absolute; top: 0; left: 0; }";
                style +=        "#coins-canvas { z-index: 99999; position: absolute; top: 0; left: 0; }";
                style +=        "";
                style +=        "";
                style +=        "";
                style +=    "</style>";
                
            return style;
        }
        
        this.init = function() {
            
            alert('welcome')
            
            doc = $(document);
            bod = $('body');
            head = $('head');
            w = doc.width();
            h = doc.height();
            
            var style = setStyle();
            head.append(style);
            
            bod.wrapInner('<div id="coins-wrapper" />');
            bod.prepend('<div id="coins-header"></div>');
            bod.append('<canvas id="coins-canvas" width="'+w+'" height="'+h+'"></canvas>');
            
            c = new Coins('coins-canvas');
            c.init();
        }
        
    };
    
    if(typeof(jQuery) == 'undefined') {
        alert('jquery undefined');
    } else {
        var a = new App();
        a.init();
    }
    
})();