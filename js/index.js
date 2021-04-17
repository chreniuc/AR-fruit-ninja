// Will be used to see if the knife is in sight or not, this will be used when we do the collision.
let knife_in_sight = false;

let sliced = 0;
let missed = 0;
let slicedNode;
let missedNode;

// Initialize coliding
initializeColiding();

function createEntity(fruit)
{
  let entity_node = document.createElement("a-entity");
  entity_node.setAttribute("class", "fruit");
  entity_node.setAttribute("id", fruit.name);
  entity_node.setAttribute("rotation", "0 0 0");
  entity_node.setAttribute("position","0 0 3");
  entity_node.setAttribute("scale", fruit.scale);
  entity_node.setAttribute("data-aabb-collider-dynamic", "true")
  entity_node.setAttribute("animation__rotate", "property: rotation; to: 360 0 0; dur: 1000; easing: linear; loop: true")
  entity_node.setAttribute("animation__fall", "property: position; to: 0 0 2; dur: 3000; easing: linear; loop: true")
  entity_node.setAttribute("aabb-collider", "objects: #knife;")
  entity_node.setAttribute("gltf-model", fruit.gltf_model)
  console.log("Created fruit entity: " + fruit.name)
  return entity_node
}

document.addEventListener("DOMContentLoaded", () => {
  let scene = document.getElementById("primary_scene");

  // Create the knife marker
  {
      // create marker
    let marker_node = document.createElement("a-marker");
    marker_node.setAttribute("gltf-model", "models/knife/scene.gltf");
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", "knife");
    entity_node.setAttribute("preset", "hiro");
    entity_node.setAttribute("rotation", "0 -180 -90");
    entity_node.setAttribute("scale", "0.0003 0.0003 0.0003");
    entity_node.setAttribute("position","0 0.5 0");
    entity_node.setAttribute("aabb-collider", "objects: .fruit;")
    marker_node.appendChild(entity_node);
    scene.appendChild(marker_node);

    marker_node.addEventListener("markerFound", (event) => {
        console.log("Knife found!");
        knife_in_sight = true;
    });
    marker_node.addEventListener("markerLost", (event) => {
        console.log("Knife lost!");
        knife_in_sight = false;
    });
  }

  // Score labels:
  {
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", "slicedLabel");
    entity_node.setAttribute("text","value: Sliced:; color: green");
    entity_node.setAttribute("position","-3 2.8 -9");
    entity_node.setAttribute("scale","3 3 3");
    scene.appendChild(entity_node);
    console.log("Created sliced label entity.")
  }
  {
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", "slicedValue");
    entity_node.setAttribute("text","value: 0; color: green");
    entity_node.setAttribute("position","-2.45 2.795 -9");
    entity_node.setAttribute("scale","3 3 3");
    scene.appendChild(entity_node);
    console.log("Created sliced value entity.")
  }

  {
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", "missedLabel");
    entity_node.setAttribute("text","value: Missed:; color: red");
    entity_node.setAttribute("position","-3 2.6 -9");
    entity_node.setAttribute("scale","3 3 3");
    scene.appendChild(entity_node);
    console.log("Created missed label entity.")
  }
  {
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", "missedValue");
    entity_node.setAttribute("text","value: 0; color: red");
    entity_node.setAttribute("position","-2.45 2.595 -9");
    entity_node.setAttribute("scale","3 3 3");
    scene.appendChild(entity_node);
    console.log("Created missed value entity.")
  }

  slicedNode = document.getElementById('slicedValue');
  missedNode = document.getElementById('missedValue');

    //Get a random number
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandomInteger( max) {
    return Math.floor(Math.random() * max); 
  }

  //random x: i + (0 ... 0.5)
  const min_x = -0.5;
  const max_x = 0.5;

  //random y: 4 ... 7
  const min_y = 4.0;
  const max_y = 7.0;

  //random z: -9 ... -6
  const min_z = -9.0;
  const max_z = -6.0;
  for (let i = -3; i < 4; i++) {
    let fruit_index = getRandomInteger(fruits.length );
    let newFruit = createEntity(fruits[fruit_index])
    let id = fruits[fruit_index].name + String(i + 3)
    newFruit.setAttribute("id", id);
    console.log("Creating fruit: " + id)

    //We set the `collected` attribute to false.
    //It will become true when the apple is collected
    newFruit.setAttribute("collected", "false");

    let random_x = i + getRandomArbitrary(min_x, max_x);
    let random_y = getRandomArbitrary(min_y, max_y);
    let random_z = getRandomArbitrary(min_z, max_z);

    let tmpStartPosition = random_x + " " + random_y + " " + random_z;
    let tmpEndPosition = random_x + " -4 " + random_z;

    let random_duration = 1000 * getRandomArbitrary(2, 5);

    newFruit.addEventListener('hitstart', (event) => {

        //We set the collected attribute of the apple to false when the collision starts.
        //The actual collection of the apple will be realised later
        event.target.setAttribute("collected", "false");
    });

    newFruit.setAttribute("position", tmpStartPosition);
    newFruit.setAttribute("animation__fall",
         "property: position; to: " + tmpEndPosition + "; dur: " +
         random_duration + "; easing: linear; loop: true")
    scene.appendChild(newFruit);
  }
});