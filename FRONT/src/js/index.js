import "../style/style.scss";
import {convertToCurrency} from './utils.js';
import {updateCounter} from './utils.js';
import {storage} from "./storage.js";



document.addEventListener("load",updateCounter())
const url = backupbackendurl;

/**
 * 
 * @param {
 * } obj 
 * @returns dom element
 */
let createProductCard = function (obj) {
  const main = document.querySelector("body > main > div");
  const card =
  `<a href="product.html?id=${obj._id}" class="w-2/5 border-4 rounded-md border-black m-8 >
  <div id="articlecard1" class="w-2/5 border-4 rounded-md border-black m-8 ">
   <img src="${obj.imageUrl}" alt="">
   <h2 class="text-center text-2xl">${obj.name}</h2>
   <p class="text-center text-2xl mt-8 mb-2"> A partir de <span class="text-bold">${convertToCurrency(obj.price/100)}</span></p>
   </div>
   </a>
   `;
main.innerHTML += card;
return main
}

fetch(url)
.then(response => response.json())
.then(json => json.forEach(element=> createProductCard(element)))

