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
 }