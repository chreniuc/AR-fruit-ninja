// Used to generate a random falling fruit at X milliseconds.
let intervalFruitGenrator = 3000; // millisecods

// The velocity of a falling fruit. This will be multiplicated by a random value generated between 3 - 6 seconds.
let intervalFallFactor = 3; // The bigger this is the slower it will fall.
// When should the game stop? If the count of missed is this value, we will end the game.
let GameOverLimitMissed = 10;
// When should the game stop and notify the user that he/she won?
let GameWinLimitSliced = 10;
// When we generate falling fruits, how many should we generate at once?
let NumberOfFruitGeneratedAtOnce = 2;

const fruits = 
[
  // {
  //   index: 0,
  //   name: "Banana",
  //   gltf_model: "models/fruits/banana2/scene.gltf",
  //   scale: "0.5 0.5 0.5",
  //   rotate_animation: "property: rotation; to: 0 0 0; dur: 1000; easing: linear; loop: true"
  // },
  {
    index: 1,
    name: "Orange",
    gltf_model: "models/fruits/orange/scene.gltf",
    scale: "0.05 0.05 0.05",
    rotate_animation: "property: rotation; to: 360 0 0; dur: 1000; easing: linear; loop: true"
  },
  {
    index: 2,
    name: "Watermelon",
    gltf_model: "models/fruits/watermelon/scene.gltf",
    scale: "0.008 0.008 0.008",
    rotate_animation: "property: rotation; to: 360 0 0; dur: 1000; easing: linear; loop: true"
  }
]