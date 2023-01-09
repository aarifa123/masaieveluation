// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://127.0.0.1:${ import.meta && import.meta.env && import.meta.env.REACT_APP_JSON_SERVER_PORT ? import.meta.env.REACT_APP_JSON_SERVER_PORT : 9090 }`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const catsURL = `${baseServerURL}/cats`;
const recipieURL = `${baseServerURL}/recipeIngredients?_limit=25&_page=1`
let mainSection = document.getElementById("data-list-wrapper");

let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");

let fetchRecipesBtn = document.getElementById('fetch-recipes');
let fetchEmployeesBtn = document.getElementById('fetch-employees');

let filterLessThan50Btn = document.getElementById("filter-less-than-50");
let filterMoreThanEqual50Btn = document.getElementById("filter-more-than-equal-50");

let catsData = [];
window.addEventListener("load",()=>{
    fetch(catsURL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      let cardData = data.map(item => {
        return {
          title: item.name,
          description: item.description ? item.description.substring(0,70) : "No description available.",
          cost:item.cost,
        //   linkText: 'Read more',
        //   linkUrl: 'https://google.com',
          imageUrl: `${baseServerURL}${item.image}`,
        }
      })


      
      renderCards(cardData)

      
    });
});


fetchRecipesBtn.addEventListener("click",()=>{
    fetch(recipieURL)
    .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
  
        let cardData = data.map(item => {
            let arr=["200","900","876"]
            for(let i=0;i<=arr.length-1;i++){
                return {
                    title: item.name,
                    description:"",
                    cost:arr[i+1],
                  
                    imageUrl: `${baseServerURL}${item.image}`,
                  }
            }
         
        })
  
  
        
        renderCards(cardData)
  
        
      });

})

function renderCards(cardData) {

  let cardList = `
    <div class="card-list">
      ${ cardData.map(item => getCard(item.title, item.description,item.cost, item.imageUrl)).join('') }
    </div>
  `

  mainSection.innerHTML = cardList;
}

function getCard(title, desc, cost, imageUrl){
  let card = `
      <div class="card">
        <div class="card__img">
        <img src=${imageUrl} alt="food" />
        </div>
        <div class="card__body">
          <h3 class="card__item card__title">${title}</h3>
          <div class="card__item card__description">
            ${desc}
          </div>
          
          <h5 class="card__item card__title">${cost}</h5>
        </div>
      </div>
  `
  return card


}