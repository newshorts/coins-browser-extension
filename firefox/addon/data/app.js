/* 
 * 
 * 
 * 
 */


(function() {
    
    var App = function() {
        
        var w, h;
        var doc, bod, head;
        
        var setStyle = function() {
            var style =     "<style>";
                style +=        "#coins-wrapper { position: relative; top: 200px; }";
                style +=        "#coins-header { z-index: 99998; width: 100%; height: 200px; background-color: #FF9900; position: absolute; top: 0; left: 0; }";
                style +=        "#coins-spacer { width: 100%; height: 200px; }";
                style +=        "#coins-canvas { z-index: 99999; position: absolute; top: 0; left: 0; }";
                style +=        "";
                style +=        "";
                style +=        "";
                style +=    "</style>";
                
            return style;
        }
        
        this.init = function() {
            
            doc = $(document);
            bod = $('body');
            head = $('head');
            w = doc.width();
            h = doc.height();
            
            var style = setStyle();
            head.append(style);
            bod.append('<canvas id="coins-canvas" width="'+w+'" height="'+h+'"></canvas>');
            bod.prepend('<div id="coins-header"></div>');
            bod.prepend('<div id="coins-spacer"></div>');
            
            var c = new Coins();
            c.init();
            
        }
        
    };
    
//    var App = {
//        w: {},
//        h: {},
//        doc: {},
//        bod: {},
//        head: {},
//        setStyle: function() {
//            var style =     "<style>";
//                style +=        "#coins-wrapper { position: relative; top: 200px; }";
//                style +=        "#coins-header { z-index: 99998; width: 100%; height: 200px; background-color: #FF9900; position: absolute; top: 0; left: 0; }";
//                style +=        "#coins-spacer { width: 100%; height: 200px; }";
//                style +=        "#coins-canvas { z-index: 99999; position: absolute; top: 0; left: 0; }";
//                style +=        "";
//                style +=        "";
//                style +=        "";
//                style +=    "</style>";
//                
//            return style;
//        },
//        init: function() {
//            this.doc = $(document);
//            this.bod = $('body');
//            this.head = $('head');
//            this.w = this.doc.width();
//            this.h = this.doc.height();
//            
//            var style = this.setStyle();
//            this.head.append(style);
//            this.bod.append('<canvas id="coins-canvas" width="'+this.w+'" height="'+this.h+'"></canvas>');
//            this.bod.prepend('<div id="coins-header"></div>');
//            this.bod.prepend('<div id="coins-spacer"></div>');
//            
//            var c = new Coins();
//            c.init();
//        }
//    }
    
    if(typeof(jQuery) == 'undefined') {
        alert('jquery undefined');
    } else {
        var a = new App();
        a.init();
//        App.init();
    }
    
})();