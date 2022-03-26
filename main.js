Webcam.set({
    width: 250,
    height: 200,
    image_format: 'png',
    png_quality: 90});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("preview").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tqSPKbFWw/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "It's a " + prediction1;
    speak_data2 = "Or maybe a " + prediction2 + "gesture.";
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function checkImage() {
    document.getElementById("gesture_emoji1").innerHTML = "&#128270;";
    document.getElementById("gesture_emoji2").innerHTML = "&#128270;";
    document.getElementById("gesture_name1").innerHTML = "Identifying...";
    document.getElementById("gesture_name2").innerHTML = "Identifying...";
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if(error){
        console.error(error);
    } else {
        console.log(result);
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        document.getElementById("gesture_name1").innerHTML = prediction1;
        document.getElementById("gesture_name2").innerHTML = prediction2;
        speak();

        if(prediction1 == "Victory"){
            document.getElementById("gesture_emoji1").innerHTML = "&#9996;&#127995;";
        }
        if(prediction1 == "Waves"){
            document.getElementById("gesture_emoji1").innerHTML = "&#128075;&#127995;";
        }
        if(prediction1 == "Thumbs Up"){
            document.getElementById("gesture_emoji1").innerHTML = "&#128077;&#127995;";
        }
        if(prediction1 == "Thumbs Down"){
            document.getElementById("gesture_emoji1").innerHTML = "&#128078;&#127995;";
        }

        if(prediction2 == "Victory"){
            document.getElementById("gesture_emoji2").innerHTML = "&#9996;&#127995;";
        }
        if(prediction2 == "Waves"){
            document.getElementById("gesture_emoji2").innerHTML = "&#128075;&#127995;";
        }
        if(prediction2 == "Thumbs Up"){
            document.getElementById("gesture_emoji2").innerHTML = "&#128077;&#127995;";
        }
        if(prediction2 == "Thumbs Down"){
            document.getElementById("gesture_emoji2").innerHTML = "&#128078;&#127995;";
        }
    }
}