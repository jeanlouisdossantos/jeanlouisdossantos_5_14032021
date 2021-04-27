import { storage } from "./storage";
import "../style/style.scss";
import { convertToCurrency } from "./utils";
import { updateCounter } from "./utils";

document.addEventListener("load", updateCounter());

/** fonction create row  */
const createRow = function (obj) {
  let row = `
            <tr class="table-row">
                <td class="p-4">${obj.name}</td>
                <td class="p-4 hidden md:inline-flex"><img src=${
                  obj.imageUrl
                } alt="" class="w-20 h-auto"></td>
                <td class="p-4 hidden md:inline-flex">${convertToCurrency(obj.price / 100)}</td>
                <td class="p-4 hidden md:inline-flex">${obj.quantity}</td>
                <td class="p-4">${convertToCurrency(
                  (obj.price / 100) * obj.quantity
                )}</td>
                <td class="p-4 boutonsupprimer">
                <button class="bg-blue-100 px-2 border-2 border-black rounded-lg" id=${
                  obj._id
                }> Supprimer </button>
                </td>
            </tr>`;

  return row;
};

/** fonction create basket
 * affiche les article du panier sous forme de tableau
 * @params basket un array qui represente le panier
 *
 */
const createBasket = function (array) {
  const basket = storage.getallitems();
  const basketcard = document.getElementById("panier");

  if (basket.length == 0) {
    const card = `
            <div class=" my-8 text-center text-4xl">Votre panier est vide <br>
            <a href="./index.html" class="text-red-600 text-2xl"> Cliquer ici pour revenir à l'accueil</a>
            </div>`;

    basketcard.innerHTML += card;
  } else {
    const card = `
    <table class="table-auto mx-auto mt-8">
        <tr >
            <th class="p-4">Nom</th>
            <th class="p-4 hidden md:inline-flex">Photo</th>
            <th class="p-4 hidden md:inline-flex">Prix Unitaire</th>
            <th class="p-4 hidden md:inline-flex">Quantité</th>
            <th class="p-4">Total</th>
            <th class="p-4">Enlever du panier?</th>
        </tr>
        
        ${basket.map((obj) => createRow(obj)).join("")}
            <tr class="hidden table-row" id="totalline">
                <td class="p-4"></td>
                <td class="p-4 hidden md:inline-flex"></td>
                <td class="p-4 hidden md:inline-flex"></td>
                <td class="p-4 hidden md:inline-flex"></td>
                <td class="p-4 ">${convertToCurrency(
                  storage.getbasketamount()
                )}</td>
                <td class="p-4"><Button
                        class="bg-green-100 px-2 border-2 border-black rounded-lg" id="order">Commander</Button></button>
                </td>
            </tr>
        </table>

`;
    basketcard.innerHTML += card;
  }

  if (basket.length != 0) {
    document.getElementById("totalline").classList.remove("hidden");
  }

  basket.map((obj) => {
    document.getElementById(obj._id).addEventListener("click", () => {
      storage.removeItem(obj._id);
      updateCounter();
    });
  });

  let boutoncommander = document.getElementById("order");

  boutoncommander.addEventListener("click", (e) => {
    if (storage.getallitems().length != 0) {
      document
        .querySelector("body > main > div.formulaire")
        .classList.remove("hidden");
    } else {
      console.log("le panier est vide");
    }
  });
};

/**fonction qui valide si le formulaire est bien rempli
 *
 * @params formData object
 * @returns boolean
 */
const isFormValid = function (formdata) {
  let res = [];
  let regexMail = /^[\w\-\_\.]+@{1}[\w\-\_]+\.[a-zA-Z]{2,10}$/;
  let regexname = /^[a-z\séè]+$/i;
  let regexadress = /[\w\séè]+/;



  for (let entry of formdata.entries()) {
    
    switch(entry[0]){
      case "firstName":
        res.push(regexname.test(entry[1]))
        if(!regexname.test(entry[1])){
          document.getElementById(`${entry[0]}span`).classList.remove("hidden")
          document.getElementById(`${entry[0]}span`).classList.add("text-red-900")
        }
          else {document.getElementById(`${entry[0]}span`).classList.add("hidden")}
        break
      case "lastName":
        res.push(regexname.test(entry[1]))
        if(!regexname.test(entry[1])){
          document.getElementById(`${entry[0]}span`).classList.remove("hidden")
          document.getElementById(`${entry[0]}span`).classList.add("text-red-900")
        }
          else {document.getElementById(`${entry[0]}span`).classList.add("hidden")}
        break
      case "email":
        res.push(regexMail.test(entry[1]))
        if(!regexMail.test(entry[1])){
          document.getElementById(`${entry[0]}span`).classList.remove("hidden")
          document.getElementById(`${entry[0]}span`).classList.add("text-red-900")
        }
          else {document.getElementById(`${entry[0]}span`).classList.add("hidden")}
        break
      case "address":
        res.push(regexadress.test(entry[1]))
        if(!regexadress.test(entry[1])){
          document.getElementById(`${entry[0]}span`).classList.remove("hidden")
          document.getElementById(`${entry[0]}span`).classList.add("text-red-900")
        }
          else {document.getElementById(`${entry[0]}span`).classList.add("hidden")}
      break
      case "city":
        res.push(regexadress.test(entry[1]))
        if(!regexadress.test(entry[1])){
          document.getElementById(`${entry[0]}span`).classList.remove("hidden")
          document.getElementById(`${entry[0]}span`).classList.add("text-red-900")
        }
          else {document.getElementById(`${entry[0]}span`).classList.add("hidden")}
      break

    }
    
  }

  return !res.includes(false)
};
/** fonction submit boutton
 * gere les evenement pour l'envoi de la commande vers le serveur
 */
const submitButton = function () {
  let form = document.querySelector("form");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let fd = new FormData (form)
    let requesttosend = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getOrderBodyRequest()),
    };

    const url = `${backendurl}order`;

    if(isFormValid(fd)){ 
      fetch(url, requesttosend)
      .then((res) => {
        if (res.ok) {
          res.json().then((json) => createOrderConfirmation(json));
        } else {
          let main = document.querySelector("body > main");
          main.innerHTML = `
                      <div>
                      Oups, quelquechose s'est mal passé.
                      <a href="./index.html">Retour à la page d'accueil</a>
                      </div>  
                                      
                      `;

          console.log("something went wrong");
        }
      })
      .catch((error) => {
        let main = document.querySelector("body > main");
        main.innerHTML = `
                      <div>
                      Oups, quelquechose s'est mal passé.
                      <a href="./index.html">Retour à la page d'accueil</a>
                      </div>  
                                      
                      `;
      })
      updateCounter()
  }
}
  );
};

/** creation du body de la request post a envoyer au server
 * @returns object
 */
const getOrderBodyRequest = () => {
  let body = {};
  body.contact = {};
  body.contact.firstName = document.getElementById("firstname").value;
  body.contact.lastName = document.getElementById("lastname").value;
  body.contact.address = document.getElementById("adress").value;
  body.contact.city = document.getElementById("city").value;
  body.contact.email = document.getElementById("email").value;
  body.products = storage.getallitems().map((obj) => obj._id);
  return body;
};
/**
 * Fonction qui affiche la confirmation de la commande
 * @param {*} obj objet qui contient la confirmation de la ommande renvoyé par le serveur
 */
const createOrderConfirmation = (obj) => {
  let main = document.querySelector("body > main");
  let basket = storage.getallitems();
  main.innerHTML = `
                    <div class="text-center">
                    <span>Bonjour ${obj.contact.firstName}.</span> <br/>
                    <span>Merci pour votre commande. Votre numero de confirmation est ${
                      obj.orderId
                    }</span><br/>
                    <h2>Recapitulatif de votre commande : </h2>
                    ${basket.map(
                      (produit) => `
                    <div class="flex flex-grow">
                    <span class="p-4">${produit.name}</span>
                    <img src=${produit.imageUrl} alt="" class="w-20 h-auto">
                    <span class="p-4">${convertToCurrency(
                      produit.price / 100
                    )}</span><br/>
                    <span class="p-4"> Quantité : ${
                      produit.quantity
                    }</span><br/>
                    </div>  
                    `
                    )}
                    
                    <span> montant total de la commande : ${convertToCurrency(
                      storage.getbasketamount()
                    )}</span>
                    
                    </div>                    
                    `;

  storage.clearbasket();
  updateCounter();
};

createBasket(storage.getallitems());
submitButton();
