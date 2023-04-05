img=""
objects=[];
status="";

function preload()
{
    song=loadSound('abcd.mp3');
}

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function StartButton()
{
ObjectDetector=ml5.objectDetector('cocossd',ModelLoaded);
    document.getElementById("Status").innerHTML="Status:Detecting Objects";
}

function ModelLoaded()
{
    console.log("ModelLoaded");
    status=true;
    
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects=results
}

function draw()
{
    image(video,0,0,480,480);
    if(status!="")
    {
        ObjectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++)
        {
            r=random(255);
            g=random(255);
            b=random(255);
            document.getElementById("Status").innerHTML="Object Detected";
            document.getElementById("number_of_objects").innerHTML="The number of objects detected are "+objects.length;
            fill(r,g,b);
            percentage=floor(objects[i].confidence *100);
            text(objects[i].label+" "+percentage+ "%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="baby")
            {
                document.getElementById("number_of_objects").innerHTML="Baby has been Found";
                song.play();
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML="Baby not Found";
                song.stop();  
            }
        }
        
    }
}

