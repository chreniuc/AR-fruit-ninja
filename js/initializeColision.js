/**We register a new component named collect.
  - We do this in order to have acces to the tick function of the component.
    This function is called at each frame randering and in it we will make the collision-detection more accurate.
    This is needed so the visual effect of catching an apple is more realistic.
**/
function initializeColiding()
{
  console.log("Initizlizing coliding.")
  AFRAME.registerComponent('collect', {
    //We added the aabb-collider as a dependency, as that component must be loaded first,
    //because in this component we use stuff from `aabb-collider`.
    dependencies: ["aabb-collider"],

    init: function () {
      console.log("Init")
      console.log(this.el.components);
    },

    tick: function() {
      console.log("Tick")
        //If the knife is detected on the screen and there is any collision
        if(knife_in_sight && this.el.components["aabb-collider"]["intersectedEls"].length > 0) {

            let fruitCenter = this.el.components["aabb-collider"]["boxCenter"];

            //We loop through all the objects that collide with our basket.
            for (let i = 0; i < this.el.components["aabb-collider"]["intersectedEls"].length; i++) {

                const fruit = this.el.components["aabb-collider"]["intersectedEls"][i];
                if(fruit.getAttribute('collected') === "true") {
                    continue;
                }
                let fruitCenter = fruit.object3D.boundingBoxCenter;

                //Only collect the apple if it is visually inside the basket
                if(fruitCenter.y < (basketCenter.y - 0.5) &&
                    valueBetween(fruitCenter.x, fruitCenter.x, 0.75) &&
                    valueBetween(fruitCenter.z, fruitCenter.z, 0.75)) {
                    sliced =sliced +1;
                    console.log ("collected fruit: " + fruit.id)
                    fruit.setAttribute("collected", "true");
                    fruit.components["animation__fall"].animation.restart();
                    slicedNode.setAttribute("text",
                        "value: " + String(Number(slicedNode.components["text"].attrValue.value) + 1)  + "; color: #FFF");
                }

            }
        }
    }
  });
}