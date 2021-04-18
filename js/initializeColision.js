//Function that returns true if the value is between [(reference - tolerance) (reference+tolerance)]
function valueBetween(value, reference, tolerance) {
  if(value >= reference - tolerance && value <= reference + tolerance) {
      return true;
  }
  return false;
}

/**We register a new component named collect.
  - We do this in order to have acces to the tick function of the component.
    This function is called at each frame randering and in it we will make the collision-detection more accurate.
    This is needed so the visual effect of catching an apple is more realistic.
**/
function initializeColiding()
{
  console.debug("Initizlizing coliding.")
  AFRAME.registerComponent('collect', {
    //We added the aabb-collider as a dependency, as that component must be loaded first,
    //because in this component we use stuff from `aabb-collider`.
    dependencies: ["aabb-collider"],

    init: function () {
      console.debug(this.el.components);
    },

    tick: function() {
        //If the knife is detected on the screen and there is any collision
        if(knife_in_sight && this.el.components["aabb-collider"]["intersectedEls"].length > 0)
        {
          console.info("Collision detected.")
          let knifeCenter = this.el.components["aabb-collider"]["boxCenter"];

          //We loop through all the objects that collide with our knife
          for (let i = 0; i < this.el.components["aabb-collider"]["intersectedEls"].length; i++) {
              const fruit = this.el.components["aabb-collider"]["intersectedEls"][i];
              if(fruit.getAttribute("sliced") === "true")
              {
                continue;
              }

              sliced = sliced +1;
              printSlicedValue();
              console.info ("Sliced fruit: " + fruit.id);
              fruit.setAttribute("sliced", "true");
              fruit.setAttribute("visible", "false");
              let fruitNode = document.getElementById(fruit.id);
              fruitNode.remove();
              checkGameWon();
          }
        }
    }
  });
}