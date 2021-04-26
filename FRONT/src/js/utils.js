import {storage} from './storage'

// FOnction pour afficher le prix en €

export const convertToCurrency = (price) =>
  Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price);

/** fonction pour mettre a jour le compteur de produit 
 * @returns number
*/
  export const updateCounter = function () { 
 let counter = document.querySelector("body > nav > div > a > div > p")
 counter.innerHTML = storage.gettotalquantity()
 if (storage.gettotalquantity() === 0){
   counter.classList.add("bg-red-100")
 }
 else {
   counter.classList.add("bg-green-100")
 }
 }