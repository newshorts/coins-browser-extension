var Coins = function() {
    var canvas;
    var stage;

    var imgSeq = new Image();		// The image for the sparkle animation
    var bmpAnim;						// The animated sparkle template to clone
    var fpsLabel;

    this.init = function(id) {
            
            // create a new stage and point it at our canvas:
            canvas = document.getElementById(id);
            stage = new Stage(canvas);
            
            // attach mouse handlers directly to the source canvas.
            // better than calling from canvas tag for cross browser compatibility:
            canvas.onmousemove = moveCanvas;
            canvas.onclick = clickCanvas;

            // define simple sprite sheet data specifying the image(s) to use, the size of the frames,
            // and the registration point of the frame
            // it will auto-calculate the number of frames from the image dimensions and loop them
            var data = {
                    images: ["//localhost.com/GSP/clients/nintendo/sparkle/production/images/sparkle_21x23.png"],
                    frames: {width:21,height:23,regX:10,regY:11}
            }
            

            // set up an animation instance, which we will clone
            bmpAnim = new BitmapAnimation(new SpriteSheet(data));
            

            // add a text object to output the current FPS:
            fpsLabel = new Text("-- fps","bold 14px Arial","#FFF");
            stage.addChild(fpsLabel);
            fpsLabel.x = 10;
            fpsLabel.y = 20;
            
            // start the tick and point it at the window so we can do some work before updating the stage:
            Ticker.setFPS(30);
            Ticker.addListener(window);
            
    }


    var tick = function() {
        
            // loop through all of the active sparkles on stage:
            var l = stage.getNumChildren();
            for (var i=l-1; i>0; i--) {
                    var sparkle = stage.getChildAt(i);

                    // apply gravity and friction
                    sparkle.vY += 2;
                    sparkle.vX *= 0.98;

                    // update position, scale, and alpha:
                    sparkle.x += sparkle.vX;
                    sparkle.y += sparkle.vY;
                    sparkle.scaleX = sparkle.scaleY = sparkle.scaleX+sparkle.vS;
                    sparkle.alpha += sparkle.vA;

                    //remove sparkles that are off screen or not invisble
                    if (sparkle.alpha <= 0 || sparkle.y > canvas.height) {
                            stage.removeChildAt(i);
                    }
            }

            fpsLabel.text = Math.round(Ticker.getMeasuredFPS())+" fps";

            // draw the updates to stage
            stage.update();
    }
    
    window.tick = tick;

    //sparkle explosion
    var clickCanvas = function (e) {
        
            addSparkles(Math.random()*200+100|0, stage.mouseX, stage.mouseY,2);
    }

    //sparkle trail
    var moveCanvas = function (e) {
        
            addSparkles(Math.random()*2+1|0, stage.mouseX, stage.mouseY,1);
    }

    var addSparkles = function (count, x, y, speed) {
        
            //create the specified number of sparkles
            for (var i=0; i<count; i++) {
                    // clone the original sparkle, so we don't need to set shared properties:
                    var sparkle = bmpAnim.clone();
                    
                    // set display properties:
                    sparkle.x = x;
                    sparkle.y = y;

                    //sparkle.rotation = Math.random()*360;
                    sparkle.alpha = Math.random()*0.5+0.5;
                    sparkle.scaleX = sparkle.scaleY = Math.random()+0.3;

                    // set up velocities:
                    var a = Math.PI*2*Math.random();
                    var v = (Math.random()-0.5)*30*speed;
                    sparkle.vX = Math.cos(a)*v;
                    sparkle.vY = Math.sin(a)*v;
                    sparkle.vS = (Math.random()-0.5)*0.2; // scale
                    sparkle.vA = -Math.random()*0.05-0.01; // alpha

                    // start the animation on a random frame:
                    sparkle.gotoAndPlay(Math.random()*sparkle.spriteSheet.getNumFrames()|0);

                    // add to the display list:
                    stage.addChild(sparkle);
            }
    }
}

