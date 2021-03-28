import "../style/style.scss";

console.log(backendurl);
const url = "http://localhost:3000/api/teddies/";

// let json = fetch(url).then(response => response.json());
// console.log(json)
const convertToCurrency = (price) => Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits:2 }).format(price)


let request = new XMLHttpRequest();
request.open("GET", url);
request.send();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response[0]);

    let test = document.querySelector("body > main > div");

   
response.forEach((element) => {


      let card =
        `<div id="articlecard1" class="w-2/5 border-4 rounded-md border-black m-8 ">
         <img src="${element.imageUrl}" alt="">
         <h2 class="text-center text-2xl">${element.name}</h2>
         <p class="text-center text-2xl mt-8 mb-2"> A partir de <span class="text-bold">${convertToCurrency(element.price/100)}</span></p>
         </div>`;

     test.innerHTML += card;
    });
  }
};
