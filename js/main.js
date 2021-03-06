$(document).ready(function(){

    //keep track of the number of times a key is pressed
    //used to keep track of added DOM elements
    //should be reset after a certain count to not overload browser 
    //used when automode is initialized
    var timer;

    //if automode is turned on, start it right away!
    var autostatus = localStorage.getItem("autostatus");
    if (autostatus == 1){
        autoclick();
         $("#auto").prop("checked", true);
    }

    //if record is set, display is right away!
    var record = localStorage.getItem("record");
    if(record == 1){
        $("#record").prop("checked", true);
        updaterecord();
    }

    //used to keep track of high total of smahes
    var record;

    //array of the type of events that can take place when a key is pressed
    var events = new Array("sound", "shape", "letter", "color", "animation");

    //a group of colors to refer to randomly
    var colors = new Array("ff0007", "ffcc00", "832f01", "800080", "06923e", "3f6fff", "ff6f37", "f13690", "ffffff", "000000", "b0b0b0");

    //array of alphabet letters
    var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"); 

    //array of file locations for the sounds to play
    var sounds = new Array();
    sounds[0] = "#sound_one";
    sounds[1] = "#sound_two";
    sounds[2] = "#sound_three";
    sounds[3] = "#sound_four";
    
    //array of the shapes that are possible to be displayed
    var shapes = new Array("triangle", "square", "circle");
     
    //update the record box!
    function updaterecord(){
        $("#recordcount").html( localStorage.getItem("recordcount") );
    }
      
    //simulate a keypress event every second
    function autoclick(){
        $(document).trigger("keypress");
        timer = setTimeout(autoclick, 1000);
    }; 
    
    //logic for starting/stoping the auto mode
    $("#auto").on("click", function(){
        var autostatus = $(this).is(":checked");
        
        if(autostatus == 1){
            //start click loop
            autoclick();
            localStorage.setItem("autostatus", 1);
        }else{
            //end click loop
            clearTimeout(timer);
            localStorage.setItem("autostatus", 0);
        }
    });
    
    //start/stop the auto mode
    $("#record").on("click", function(){
        var record = $(this).is(":checked");
        
        if(record == 1){
            //start recording keypresses
            localStorage.setItem("record", 1);
            localStorage.setItem("recordcount", 0);
        }else{
            //confirm deletion
            var answer = confirm("You're about to delete your record. Are you sure?");
            if(answer){
                localStorage.setItem("record", 0);
                localStorage.removeItem("recordcount");
                $("#recordcount").empty();
            }
        }
    });
    
    $(document).on('keypress touchend', function(event){
        event.stopPropagation();
    
        var event = events[Math.floor(Math.random() * events.length)];
        
        switch(event){
        
            //SOUND
            case 'sound':
                    var sound = sounds[Math.floor(Math.random()*sounds.length)];
                    var soundelement = $(sound)[0];
                    soundelement.play();
                    if(localStorage.getItem("record") == 1){
                        localStorage.setItem(
                            "recordcount", 
                            Number(localStorage.getItem("recordcount")) + 1
                        );
                        updaterecord();
                    }
            break;
            
            //SHAPE
            case 'shape':
                    var shape = shapes[Math.floor(Math.random()*shapes.length)];
                    var color = colors[Math.floor(Math.random()*colors.length)];
                    var position_top = Math.floor(Math.random()*101);
                    var position_left = Math.floor(Math.random()*101);
                    if(localStorage.getItem("record") == 1){
                        localStorage.setItem(
                            "recordcount", 
                            Number(localStorage.getItem("recordcount")) + 1
                        );
                        updaterecord();
                    }
                    
                    switch(shape){
                        case 'circle':
                            var circle = "<div class='circle' ";
                            circle += "style='position:absolute;top:"+position_top+"%;";
                            circle += "left:"+position_left+"%;background-color:#"+color+";'></div>";
                            $('body').append(circle);
                        break;
                        
                        case 'square':
                            var square = "<div class='square' ";
                            square += "style='position:absolute;top:"+position_top+"%;";
                            square += "left:"+position_left+"%;background-color:#"+color+";'></div>";
                            $('body').append(square);
                        break;
                        
                        case 'triangle':
                            var triangle = "<div class='triangle' ";
                            triangle += "style='position:absolute;top:"+position_top+"%;";
                            triangle += "left:"+position_left+"%;border-bottom-color:#"+color+";'></div>";
                            $('body').append(triangle);
                        break;
                    }
                    
            break;
            
            //COLOR
            case 'color':
                    var color = colors[Math.floor(Math.random()*colors.length)];
                    $('#colorboard').css("background-color", "#" + color);
                    if(localStorage.getItem("record") == 1){
                        localStorage.setItem(
                            "recordcount", 
                            Number(localStorage.getItem("recordcount")) + 1
                        );
                        updaterecord();
                    }
            break;
            
            //ANIMATION
            case 'animation':
                    var position_left = Math.floor(Math.random() * 1000);
                    var position_top = Math.floor(Math.random() * 1000);
            
                    var $objects = $(".triangle, .circle, .square .letter");
                    $objects.eq(Math.floor(Math.random() * $objects.length)).animate({ left: position_left + "px", top: position_top + "px" }, "slow");
                    
                    if(localStorage.getItem("record") == 1){
                        localStorage.setItem(
                            "recordcount", 
                            Number(localStorage.getItem("recordcount")) + 1
                        );
                        updaterecord();
                    }
            break;
            
            //LETTER
            case 'letter':
                var letter = letters[ Math.floor(Math.random() * 26) ];
                var color = colors[Math.floor(Math.random() * colors.length)];
                var position_top = Math.floor(Math.random() * 101);
                var position_left = Math.floor(Math.random() * 101);
                
                var span = "<span class='letter' style='position:absolute;top:"+position_top+"%; ";
                span += "left: " + position_left + "%;color:#"+color+"'>" + letter + "</span>";
                $('body').append(span);
                if(localStorage.getItem("record") == 1){
                        localStorage.setItem(
                            "recordcount", 
                            Number(localStorage.getItem("recordcount")) + 1
                        );
                        updaterecord();
                }
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
