
const armLength = 150;
const startPos = [250, 350];

let x = armLength;
let y = armLength;

let angle1 = 90;
let angle2 = 90;

let armStart = [0, 0];
let jointPos = [0, armLength];
let armEnd = [armLength, armLength];

let sliderX;
let sliderY;

function setup() {
  createCanvas(800, 400);

  frameRate(30);

  sliderX = createSlider(0.1, 300, 150, 2);
  sliderX.position(500, 550);

  sliderY = createSlider(0.1, 200, 150, 2);
  sliderY.position(700, 550);
}

function draw() {
  background(80);
  // angleMode(DEGREES);

  translate(startPos[0], startPos[1]); 
  scale(1, -1);

  x = sliderX.value();
  y = sliderY.value();

  sliderX.elt.max = Math.sqrt(sq(300) - sq(y));
  sliderY.elt.max = Math.sqrt(sq(300) - sq(x));

  // Ground
  push();
  strokeWeight(10);
  line(-startPos[0], 0, 800, 0);
  pop();

  // Calculate Joint
  let joint = calcJoint(x, y);
  jointPos = [joint[0], joint[1]];

  armEnd[0] = x;
  armEnd[1] = y;

  // Arms - Lines
  push();
  stroke(0, 150, 50);
  strokeWeight(5);

  line(armStart[0], armStart[1], jointPos[0], jointPos[1]);
  line(jointPos[0], jointPos[1], armEnd[0], armEnd[1]);
  pop();

  // Joints - Circles
  push();
  stroke(0, 10, 150);
  strokeWeight(5);
  noFill();

  circle(armStart[0], armStart[1], 15);
  circle(jointPos[0], jointPos[1], 15);
  circle(armEnd[0], armEnd[1], 15);
  pop();

  push();
  translate(-startPos[0], startPos[1]);
  scale(1, -1);
  fill('green');
  text(Math.round(mouseX - startPos[0]), 10, 15);
  text(Math.round(startPos[1] - mouseY), 40, 15);

  fill('white');
  text(Math.round(x), 10, 35);
  text(Math.round(y), 40, 35);
  pop();
}

function calcJoint(a, b) {
  let theta = Math.atan(b/a) + Math.acos((sq(a) + sq(b))/(300 * Math.sqrt(sq(a) + sq(b))));
  // let theta = Math.atan(b/a) + Math.acos(150/sqrt(sq(x) + sq(y))); // DOESNT WORK
  // console.log(degrees(theta), Math.round((150 * Math.cos(theta))), Math.round((150 * Math.sin(theta))));

  // theta = Math.atan(b/a) + Math.acos(150/sqrt(sq(x) + sq(y)));
  // console.log(degrees(theta), Math.round((150 * Math.cos(theta))), Math.round((150 * Math.sin(theta))));

  // angle1 = theta;
  // angle2 = Math.round(degrees(Math.acos(150/(sq(a) + sq(b)))));

  return [Math.round((150 * Math.cos(theta))), Math.round((150 * Math.sin(theta)))];
}