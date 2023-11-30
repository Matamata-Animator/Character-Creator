//@ts-nocheck
interface Pose {
  image: string;
  x: number;
  y: number;
  scale?: number;
  facingRight?: boolean;
  closed_mouth?: string;
}

function addPose() {
  let gc: Map<string, number> = new Map();
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
    let c = confirm(
      "Are you sure you want to overwrite existing pose: " + pose_name + "?"
    );
    if (!c) {
      return;
    }
  }

  if (!character) {
    alert("Please upload a pose image");
  }

  let pose: Pose = {
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
