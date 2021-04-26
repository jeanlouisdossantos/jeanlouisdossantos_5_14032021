import { convertToCurrency } from "./utils.js";
import { updateCounter } from "./utils";
import "../style/style.scss";
import { storage } from "./storage.js";

const id = new URL(document.location).searchParams.get("id");
document.addEventListener("load",updateCounter())

const createDetailedProductCard = function (obj) {
  let detailsproduit = document.getElementById("detailsproduit");
  const card = `
    <div class="productcard p-8">
            <div class="flex ">
            <img src="${obj.imageUrl}" alt="Photo d'un ours" class="w-2/5">
                <div class=" flex items-center justify text-6xl m-auto" >
                    <h2 class="product--title items-center">${obj.name}</h2>
                </div>
            </div>
            <p>${obj.description}</p>
            <p>${convertToCurrency(obj.price / 100)}</p>
            <div class="colorselector my-8">
              <select name="color" id="colorselector" class="">
                <option value="default">--- Merci de choisr la couleur ---</option>
                ${obj.colors
                  .map(
                    (color) =>
                    `<option value="${color}"> ${color}</option>`
                  )
                  .join("")}
  
              </select>
            </div>
            <div>
            <button class="p-4 bg-green-100 br-xl" id="addtocart">Ajouter au panier</button>
            </div>              
        </div>
    </div>
    `;
  detailsproduit.innerHTML += card;

  let addbutton = document.getElementById("addtocart")
  addbutton.addEventListener("click", () => {
    if(document.getElementById("colorselector").value == "default"){
      alert("merci de choisir une couleur")
    }
    else{
      storage.additem(obj)
    }
  
  updateCounter()
  })
  
}

const errorMessage = function () {
  const  detailsProduit = document.getElementById("detailsproduit");
  const card = `
      <div class="productcard">
      MESSAGE D'ERREUR reviens en arrier
      </div>
`;

  detailsProduit.innerHTML += card;
  return detailsProduit;
};
/**
 * partie qui gere le dom de la page renvoi un message d'erreur sir les paramaetre ne sont pas bon, sinon affiche le produit
 *
 */

const endpoint = backupbackendurl + "/" + id;
if (id == null) {
  errorMessage();
} else {
  fetch(endpoint)
    .then((response) => {
      if (response.ok) {
        response.json().then((json) => createDetailedProductCard(json));
      } else {
        errorMessage();
      }
    })
    .catch(() => errorMessage);
}
