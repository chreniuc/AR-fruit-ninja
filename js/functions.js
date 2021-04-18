function createEntity(fruit)
{
  let entity_node = document.createElement("a-entity");
  entity_node.setAttribute("class", "fruit");
  entity_node.setAttribute("id", fruit.name);
  entity_node.setAttribute("rotation", "0 0 0");
  entity_node.setAttribute("position","0 0 3");
  entity_node.setAttribute("scale", fruit.scale);
  entity_node.setAttribute("data-aabb-collider-dynamic", "true")
  entity_node.setAttribute("animation__rotate", fruit.rotate_animation)
  entity_node.setAttribute("animation__fall", "property: position; to: 0 0 2; dur: 3000; easing: linear; loop: false")
  entity_node.setAttribute("aabb-collider", "objects: #knife;")
  entity_node.setAttribute("gltf-model", fruit.gltf_model)
  return entity_node
}

//Get a random number
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInteger( max) {
  return Math.floor(Math.random() * max); 
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function printSlicedValue()
{
  slicedNode.setAttribute("text",
  "value: " + String(sliced)  + "; color: green");
}

function printMissedValue()
{
  missedNode.setAttribute("text",
  "value: " + String(missed)  + "; color: red");
}

function printFruitsValue()
{
  fruitsNode.setAttribute("text",
  "value: " + String(fruitsGeneratedUntilNow)  + "; color: blue");
}

function checkGameOver()
{
  if(gameOver || gameWon)
  {
    // We already ended the game
    return;
  }
  if(missed < GameOverLimitMissed)
  {
    return;
  }
  gameOver = true;

  let entity_node = document.createElement("a-entity");
  entity_node.setAttribute("id", "gameOverLabel");
  entity_node.setAttribute("text","value: GAME OVER; color: red");
  entity_node.setAttribute("position","2.6 0.2 -9");
  entity_node.setAttribute("scale","8 8 8");
  scene.appendChild(entity_node);
  console.debug("Created game over label entity.")
  clearInterval(intervalId) 
}

function checkGameWon()
{
  if(gameOver || gameWon)
  {
    // We already ended the game
    return;
  }
  if(sliced < GameWinLimitSliced)
  {
    return;
  }
  gameWon = true;

  let entity_node = document.createElement("a-entity");
  entity_node.setAttribute("id", "gameOverLabel");
  entity_node.setAttribute("text","value: GAME WON; color: green");
  entity_node.setAttribute("position","2.6 0.2 -9");
  entity_node.setAttribute("scale","8 8 8");
  scene.appendChild(entity_node);
  console.debug("Created game won label entity.")
  clearInterval(intervalId) 
}

function generateFallingFruits()
{
  if(gameOver || gameWon)
  {
    // We already ended the game
    return;
  }
  //random x: -3 3
  const min_x = -3.0;
  const max_x = 3.0;

  //random y: 4 ... 7
  const min_y = 4.0;
  const max_y = 7.0;

  //random z: -9 ... -6
  const min_z = -9.0;
  const max_z = -6.0;
  const nr_fruits_to_be_generated = NumberOfFruitGeneratedAtOnce;
  
  for (let i = 0; i < nr_fruits_to_be_generated; i++) {
    let fruit_index = getRandomInteger(fruits.length );
    let newFruit = createEntity(fruits[fruit_index])
    fruitsGeneratedUntilNow = fruitsGeneratedUntilNow + 1;
    printFruitsValue()
    let id = fruits[fruit_index].name + String(fruitsGeneratedUntilNow)
    newFruit.setAttribute("id", id);
    console.debug("Creating fruit: " + id)

    newFruit.setAttribute("sliced", "false");

    let random_x = getRandomArbitrary(min_x, max_x);
    let random_y = getRandomArbitrary(min_y, max_y);
    let random_z = getRandomArbitrary(min_z, max_z);

    let tmpStartPosition = random_x + " " + random_y + " " + random_z;
    let tmpEndPosition = random_x + " -4 " + random_z;

    let random_duration = intervalFallFactor* 1000 * getRandomArbitrary(3, 6);

    newFruit.addEventListener('hitstart', (event) => {

        //We set the collected attribute of the apple to false when the collision starts.
        //The actual collection of the apple will be realised later
        event.target.setAttribute("collected", "false");
        console.debug("hitstart called")
    });

    newFruit.addEventListener('animationcomplete', (event) => {
      console.debug("Finished animation for "  + event.target.getAttribute("id") + ". We will remove this.")
      if(event.target.setAttribute("sliced") !== "true")
      {
        missed = missed+1;
        printMissedValue();
        checkGameOver();
      }
      event.target.remove()
  });

    newFruit.setAttribute("position", tmpStartPosition);
    newFruit.setAttribute("animation__fall",
        "property: position; to: " + tmpEndPosition + "; dur: " +
        random_duration + "; easing: linear; loop: false")
    scene.appendChild(newFruit);
  }
}