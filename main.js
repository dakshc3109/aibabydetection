var img = "";
var status = ""; 
object = [];

function setup(){
    canvas = createCanvas(500, 380);
    //canvas.center();
    canvas.position(400, 120);;
    objetDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting object";
    video = createCapture(VIDEO);
    video.size(500, 380)
    video.hide();
}

function preload(){
    sound = loadSound("loud_alarm_clock.mp3")
}

function draw(){
    image(video, 0, 0, 500, 380);
    if(status != ""){
        objetDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status: object detected";
            fill("#ff0000");
            percent = floor(object[i].confidence*100);
            console.log(percent);
            text(object[i].label+" "+percent+"%", object[i].x+5, object[i].y+15);
            console.log(object[i].label+" "+percent+"%");
            noFill();
            stroke("#ff0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            console.log(object[i].x+" "+object[i].y);
            if(object[i].label == "person"){
                document.getElementById("number-of-objects").innerHTML = "Baby Found";
                sound.stop()
            }
            else{
                document.getElementById("number-of-objects").innerHTML = "Baby Not found";
                sound.play();
            }
        }
    }
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
    objetDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error();
    }
    else{
        object = results;
        console.log(object);
    }
}