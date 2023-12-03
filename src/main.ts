let dropzone: p5.Element;
let mdrop: p5.Element;

let cnv: p5.Renderer;
let json_made: boolean = false;

let border = 10;

let mouse_down = false;
let character: any;
let img_name: string;
let json_name: string = "character.json";
let json: any = {};

let mouth_pos: [number, number] = [0, 0];

let mouth_image: any;
let mirror_mouth: boolean = false;
let mScale: p5.Element;
function setup() {
  mScale = createSlider(1, 1000, 100);
  mScale.parent("canvas");
  cnv = createCanvas(0, 0);
  cnv.parent("canvas");

  stroke(0);
  strokeWeight(1);

  //@ts-ignore
  dropzone = select("#dropzone");
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(gotFile, unhighlight);

  rectMode(CENTER);

  mouth_image = loadImage("mouths/Adown.png");
  // alert("If you upload an image and it does not properly display, upload it again.");

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

  //@ts-ignore
  var x = document.getElementById("form").elements;
  mirror_mouth = x["facingLeft"].checked;
}
function gotFile(file: p5.File) {
  if (file.type === "image") {
    img_name = file.name;

    character = createImg(file.data, "");
    character.hide();
    background(0);
    cnv = createCanvas(
      character.width + 2 * border,
      character.height + 2 * border
    );
    console.log(character.width + 2 * border);
    cnv.parent("canvas");
  }
}
function mgotFile(file: p5.File) {
  if (file.type === "image") {
    mouth_image = createImg(file.data, "");
    mouth_image.hide();
  }
}

function drawMouth(x: number, y: number) {
  imageMode(CENTER);
  if (mirror_mouth) {
    push();
    scale(-1, 1);
    image(
      mouth_image,
      -x,
      y,
      (mouth_image.width * int(mScale.value())) / 100,
      (mouth_image.height * int(mScale.value())) / 100
    );
    pop();
  } else {
    image(
      mouth_image,
      x,
      y,
      (mouth_image.width * int(mScale.value())) / 100,
      (mouth_image.height * int(mScale.value())) / 100
    );
  }
  imageMode(CORNER);
}
