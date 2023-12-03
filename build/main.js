"use strict";
function addPose() {
    let gc = new Map();
    var x = document.getElementById("form").elements;
    for (const i of x) {
        console.log(i.name, i.value);
        gc.set(i.name, i.value);
    }
    let pose_name = gc.get("pose_name");
    if (pose_name in ["defaultMouthScale", "defaultPose"]) {
        alert("Please select a different pose name");
    }
    if (pose_name in json["poses"]) {
        let c = confirm("Are you sure you want to overwrite existing pose: " + pose_name + "?");
        if (!c) {
            return;
        }
    }
    if (!character) {
        alert("Please upload a pose image");
    }
    let pose = {
        image: img_name,
        x: mouth_pos[0] - border,
        y: mouth_pos[1] - border,
        mouthScale: int(mScale.value()) / 100,
        facingLeft: mirror_mouth,
    };
    json["poses"]["defaultPose"] = gc.get("defaultPose");
    json["poses"][pose_name] = pose;
    console.log(json);
}
function highlight() {
    dropzone.style("background-color", "#ccc");
}
function unhighlight() {
    dropzone.style("background-color", "#fff");
}
function hovering() {
    return (border < mouseX &&
        mouseX < width - border &&
        border < mouseY &&
        mouseY < height - border);
}
function mouseWheel(event) {
    if (hovering()) {
        mScale.value(int(mScale.value()) - event.deltaY / 10);
    }
}
function mousePressed() {
    mouse_down = true;
}
function mouseReleased() {
    mouse_down = false;
}
let dropzone;
let mdrop;
let cnv;
let json_made = false;
let border = 10;
let mouse_down = false;
let character;
let img_name;
let json_name = "character.json";
let json = {};
let mouth_pos = [0, 0];
let mouth_image;
let mirror_mouth = false;
let mScale;
function setup() {
    mScale = createSlider(1, 1000, 100);
    mScale.parent("canvas");
    cnv = createCanvas(0, 0);
    cnv.parent("canvas");
    stroke(0);
    strokeWeight(1);
    dropzone = select("#dropzone");
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile, unhighlight);
    rectMode(CENTER);
    mouth_image = loadImage("mouths/Adown.png");
    json["schema"] = 5;
    json["poses"] = {};
    json["poses"]["defaultMouthScale"] = 1;
}
function draw() {
    if (character) {
        fill(200, 0, 0);
        rect(0, 0, width * 2, height * 2);
        image(character, border, border);
        drawMouth(mouth_pos[0], mouth_pos[1]);
    }
    if (mouse_down && hovering()) {
        mouth_pos = [mouseX, mouseY];
    }
    var x = document.getElementById("form").elements;
    mirror_mouth = x["facingLeft"].checked;
}
function gotFile(file) {
    if (file.type === "image") {
        img_name = file.name;
        character = createImg(file.data, "");
        character.hide();
        background(0);
        cnv = createCanvas(character.width + 2 * border, character.height + 2 * border);
        console.log(character.width + 2 * border);
        cnv.parent("canvas");
    }
}
function mgotFile(file) {
    if (file.type === "image") {
        mouth_image = createImg(file.data, "");
        mouth_image.hide();
    }
}
function drawMouth(x, y) {
    imageMode(CENTER);
    if (mirror_mouth) {
        push();
        scale(-1, 1);
        image(mouth_image, -x, y, (mouth_image.width * int(mScale.value())) / 100, (mouth_image.height * int(mScale.value())) / 100);
        pop();
    }
    else {
        image(mouth_image, x, y, (mouth_image.width * int(mScale.value())) / 100, (mouth_image.height * int(mScale.value())) / 100);
    }
    imageMode(CORNER);
}
//# sourceMappingURL=../src/src/main.js.map