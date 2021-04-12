// gestion du local storage
//  @return(Array)

class Storage {
  
  constructor() {
    this.name = "orinocobasket"
        if (localStorage.getItem(this.name) == null) {localStorage.setItem(this.name,"[]")}
  }


/** 
 * get all items in the basket
 * @returns Array
*/
getallitems () {
  return JSON.parse(localStorage.getItem(this.name))
}

/**
 * add param object to the basket in local storage 
 * @param {object} obj 
 * @returns Array
 */
additem (obj){ 
  
  let basket = this.getallitems()

  // produit deja dans le panier? 
  let product = basket.find(product => product._id === obj._id)
  if (product === undefined)
  {
    obj.quantity = 1
  basket.push(obj)
  }
  else 
  {
    product.quantity += 1
    console.log(basket)
  }
  localStorage.setItem(this.name,JSON.stringify(basket))

}

/** fonction pour retirer un item au panier en fonction de son ID
 * @param {Object} obj l'objet qui represente l'article a supprimer
* @return Array 
*/
removeItem (obj) {
  let basket = 'orinocobasket'
  let baskettoupdate = JSON.parse(localStorage.getItem(basket))

  delete baskettoupdate.obj
  localStorage.setItem(basket,baskettoupdate)
}
/**
 * 
 * @param {string}
 * */
clgCart () {
  console.log(localStorage.getItem(this.name))};
/**
 * fonction qui renvoi le nombre d'article dans le panier
 */
gettotalquantity () {
let basket = this.getallitems()
const valeurInitial = 0
const total = basket.reduce((acc,curr)=>acc+curr.quantity,valeurInitial)
return total
}
}
export let storage = new Storage();

