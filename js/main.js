$(document).ready(function(){

    //keep track of the number of times a key is pressed
    //used to keep track of added DOM elements
    //should be reset after a certain count to not overload browser 
    var keypress; 

    //array of the type of events that can take place when a key is pressed
    var events = new Array("sound", "shape", "color", "animation");

    //a group of colors to refer to randomly
    var colors = new Array("ff0007", "ffcc00", "832f01", "800080", "06923e", "3f6fff", "ff6f37", "f13690", "ffffff", "000000", "b0b0b0");
    
    //array of file locations for the sounds to play
    var sounds = new Array();
    sounds[0] = "#sound_one";
    sounds[1] = "#sound_two";
    sounds[2] = "#sound_three";
    sounds[3] = "#sound_four";
    
    //array of the shapes that are possible to be displayed
    var shapes = new Array("triangle", "square", "circle");
    
    $('body').keypress(function(){
    
        var event = events[Math.floor(Math.random()*events.length)];
        console.log(event);
        
        switch(event){
            case 'sound':
                    var sound = sounds[Math.floor(Math.random()*sounds.length)];
                    var soundelement = $(sound)[0];
                    
                    console.log(soundelement);
                    soundelement.play();
                        
                    keypress++;
            break;
            
            case 'shape':
                    var shape = shapes[Math.floor(Math.random()*shapes.length)];
                    var color = colors[Math.floor(Math.random()*colors.length)];
                    var position_top = Math.floor(Math.random()*101)
                    var position_left = Math.floor(Math.random()*101)
                    keypress += 1;
                    
                    switch(shape){
                        case 'circle':
                            var circle = "<div class='circle' id='"+keypress+"' ";
                            circle += "style='position:absolute;top:"+position_top+"%;";
                            circle += "left:"+position_left+"%;background-color:#"+color+";'></div>";
                            $('body').append(circle);
                        break;
                        
                        case 'square':
                            var square = "<div class='square' id='"+keypress+"' ";
                            square += "style='position:absolute;top:"+position_top+"%;";
                            square += "left:"+position_left+"%;background-color:#"+color+";'></div>";
                            $('body').append(square);
                        break;
                        
                        case 'triangle':
                            var triangle = "<div class='triangle' id='"+keypress+"' ";
                            triangle += "style='position:absolute;top:"+position_top+"%;";
                            triangle += "left:"+position_left+"%;border-bottom-color:#"+color+";'></div>";
                            $('body').append(triangle);
                        break;
                    }
                    
            break;
            
            case 'color':
                    var color = colors[Math.floor(Math.random()*colors.length)];
                    $('body').css("background-color", "#" + color);
            break;
            
            case 'animation':
                    //console.log("animation");
            break;
        }
    
    //reset all variables that were used
    var event = null;
    var triangle = null;
    var square = null;
    var circle = null;
    var position_top = null;
    var position_left = null;
    var color = null;
    var sound = null;
    
    });
});
