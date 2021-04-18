// Initialize coliding
initializeColiding();

document.addEventListener("DOMContentLoaded", () => {
  scene = document.getElementById("primary_scene");

  let knifeMarker = document.getElementById('knifeMarker');
  knifeMarker.addEventListener("markerFound", (event) => {
      console.info("Knife found!");
      knife_in_sight = true;
  });
  knifeMarker.addEventListener("markerLost", (event) => {
      console.info("Knife lost!");
      knife_in_sight = false;
  });

  // Score labels:
  {
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", "slicedLabel");
    entity_node.setAttribute("text","value: Sliced:; color: green");
    entity_node.setAttribute("position","-3 2.8 -9");
    entity_node.setAttribute("scale","3 3 3");
    scene.appendChild(entity_node);
    console.debug("Created sliced label entity.")
  }
  {
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", "slicedValue");
    entity_node.setAttribute("text","value: 0; color: green");
    entity_node.setAttribute("position","-2.45 2.795 -9");
    entity_node.setAttribute("scale","3 3 3");
    scene.appendChild(entity_node);
    console.debug("Created sliced value entity.")
  }

  {
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", "missedLabel");
    entity_node.setAttribute("text","value: Missed:; color: red");
    entity_node.setAttribute("position","-3 2.6 -9");
    entity_node.setAttribute("scale","3 3 3");
    scene.appendChild(entity_node);
    console.debug("Created missed label entity.")
  }
  {
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", "missedValue");
    entity_node.setAttribute("text","value: 0; color: red");
    entity_node.setAttribute("position","-2.45 2.595 -9");
    entity_node.setAttribute("scale","3 3 3");
    scene.appendChild(entity_node);
    console.debug("Created missed value entity.")
  }

  {
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", "fruitsLabel");
    entity_node.setAttribute("text","value: Fruits Generated:; color: blue");
    entity_node.setAttribute("position","-3 3 -9");
    entity_node.setAttribute("scale","3 3 3");
    scene.appendChild(entity_node);
    console.debug("Created fruits label entity.")
  }
  {
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", "fruitsValue");
    entity_node.setAttribute("text","value: 0; color: blue");
    entity_node.setAttribute("position","-1.95 2.995 -9");
    entity_node.setAttribute("scale","3 3 3");
    scene.appendChild(entity_node);
    console.debug("Created fruits value entity.")
  }

  slicedNode = document.getElementById('slicedValue');
  missedNode = document.getElementById('missedValue');
  fruitsNode = document.getElementById('fruitsValue');

  intervalId = window.setInterval(function(){
    generateFallingFruits();
  }, intervalFruitGenrator);
});