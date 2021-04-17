document.addEventListener("DOMContentLoaded", () => {
  let scene = document.getElementById("primary_scene");
  products.forEach(product => {
    // create marker
    let marker_node = document.createElement("a-marker");
    marker_node.setAttribute("preset", product.preset);
    let entity_node = document.createElement("a-entity");
    entity_node.setAttribute("id", product.entity_name);
    entity_node.setAttribute("rotation", "-90 0 0");
    entity_node.setAttribute("htmlembed","");
    entity_node.setAttribute("position","0 0.5 0");
    marker_node.appendChild(entity_node);
    scene.appendChild(marker_node);

    marker_node.addEventListener("markerFound", (event) => {
        console.log(product.name + " found!");
    });
    marker_node.addEventListener("markerLost", (event) => {
        console.log(product.name +" lost!");
    });
    display_product(product);
  });

});

function display_product( product_info)
{
  let entity =  document.getElementById(product_info.entity_name);
  let product = document.getElementById('product1');
  let product_copy = product.cloneNode(true);

  let title = Utils.findChildById(product_copy, "title", true);
  title.innerHTML = product_info.name;
  Utils.findChildById(product_copy, "product_image", true).src = product_info.img_src;
  Utils.findChildById(product_copy, "price-value", true).innerHTML = product_info.price;
  Utils.findChildById(product_copy, "description-value", true).innerHTML = product_info.description;
  
  let reviews = Utils.findChildById(product_copy, "all_reviews", true);

  reviews.innerHTML = '';
  product_info.reviews.forEach(element => {
    new_review = document.createElement("div");
    new_review.innerHTML = element;
    reviews.appendChild(new_review);
    new_hr = document.createElement("hr");
    new_hr.setAttribute("class", "line2");
    reviews.appendChild(new_hr);
  });
  entity.appendChild(product_copy);
}






var _Utils = function ()
{
    this.findChildById = function (element, childID, isSearchInnerDescendant) // isSearchInnerDescendant <= true for search in inner childern 
    {
        var retElement = null;
        var lstChildren = isSearchInnerDescendant ? Utils.getAllDescendant(element) : element.childNodes;

        for (var i = 0; i < lstChildren.length; i++)
        {
            if (lstChildren[i].id == childID)
            {
                retElement = lstChildren[i];
                break;
            }
        }

        return retElement;
    }

    this.getAllDescendant = function (element, lstChildrenNodes)
    {
        lstChildrenNodes = lstChildrenNodes ? lstChildrenNodes : [];

        var lstChildren = element.childNodes;

        for (var i = 0; i < lstChildren.length; i++) 
        {
            if (lstChildren[i].nodeType == 1) // 1 is 'ELEMENT_NODE'
            {
                lstChildrenNodes.push(lstChildren[i]);
                lstChildrenNodes = Utils.getAllDescendant(lstChildren[i], lstChildrenNodes);
            }
        }

        return lstChildrenNodes;
    }        
}
var Utils = new _Utils;