import "../style/style.scss";
import {convertToCurrency} from './utils.js';
import {updateCounter} from './utils.js';
import {storage} from "./storage.js";



document.addEventListener("load",updateCounter())
// console.log(backendurl); test, on recupere l'adresse de l'api via webpack
const url = backupbackendurl;

// FOnction pour cree notre div produit
let createProductCard = function (obj) {
  const test = document.querySelector("body > main > div");
  const card =
  `<a href="product.html?id=${obj._id}" class="w-2/5 border-4 rounded-md border-black m-8 >
  <div id="articlecard1" class="w-2/5 border-4 rounded-md border-black m-8 ">
   <img src="${obj.imageUrl}" alt="">
   <h2 class="text-center text-2xl">${obj.name}</h2>
   <p class="text-center text-2xl mt-8 mb-2"> A partir de <span class="text-bold">${convertToCurrency(obj.price/100)}</span></p>
   </div>
   </a>
   `;
test.innerHTML += card;
return test
}

let produit = fetch(url)
.then(response => response.json())
.then(json => json.forEach(element=> createProductCard(element)))

// let request = new XMLHttpRequest();
// request.open("GET", url);
// request.send();
// request.onreadystatechange = function () {
//   if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//     var response = JSON.parse(this.responseText);
//     console.log(response[0]);

//     let test = document.querySelector("body > main > div");

   
// response.forEach((element) => {


//       let card =
//         `<div id="articlecard1" class="w-2/5 border-4 rounded-md border-black m-8 ">
//          <img src="${element.imageUrl}" alt="">
//          <h2 class="text-center text-2xl">${element.name}</h2>
//          <p class="text-center text-2xl mt-8 mb-2"> A partir de <span class="text-bold">${convertToCurrency(element.price/100)}</span></p>
//          </div>`;

//      test.innerHTML += card;
//     });
//   }
// };
