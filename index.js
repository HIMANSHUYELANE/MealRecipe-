let srch = document.getElementById("srch");
let result = document.getElementById("result");

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let inp = document.getElementById("inp");
let opt = document.getElementById("opt");
let ul = document.createElement("ul");
let hide = document.getElementById("hide");
let show = document.getElementById("show");
let hbtn = document.getElementById("hbtn");
let cont = document.getElementById("content");
let sugg = document.getElementById("sugg");

inp.addEventListener("input", () => {
  let all = [];
  let count = 1;
  fetch(url + inp.value)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      let meal = data.meals;
      sugg.style.display = "block";
      meal.filter ((m)=> {
        let div = document.createElement("div");
        div.classList = "suggetion";
        if (m == div.innerText) {
          div.innerHTML = " ";
        } else {
          div.innerHTML = m.strMeal;
        }
        sugg.appendChild(div);

        div.addEventListener("click", () => {
          inp.value = div.innerText;
          sugg.style.display = "none";
          sugg.innerHTML = "";
        });
      })
   });
});

srch.addEventListener("click", () => {
  if (inp.value.length == 0) {
    result.innerHTML = "Give the input ";
    ul.innerHTML = " ";
    hide.style.display = "none";
    show.style.display = "none";
  } else {
    sugg.style.display = "none";
    fetch(url + inp.value)
      .then((response) => {
        let data = response.json();
        return data;
      })
      .then((data) => {
        let meals = data.meals[0];
        //   opt.innerHTML = meals.strMeal;
        let count = 1;
        let ingredients = [];

        for (let i in meals) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && meals[i]) {
            ingredient = meals[i];
            measure = meals[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        result.innerHTML = `<img src=${meals.strMealThumb}>
                  <div class="name">
                  <h2>${meals.strMeal}</h1>
                  <h4>${meals.strArea}</h4>
                   </div>`;

        let ingredientcon = document.getElementById("ingredient-con");

        hbtn.innerHTML = "X";
        show.style.display = "block";
        hbtn.addEventListener("click", () => {
          hide.style.display = "none";
        });

        show.addEventListener("click", () => {
          hide.style.display = "block";
        });

        cont.innerHTML = meals.strInstructions;

        ingredients.forEach((i) => {
          let li = document.createElement("li");
          li.innerText = i;
          ul.appendChild(li);
          ingredientcon.appendChild(ul);
        });
      })
      .catch((error) => {
        result.innerHTML = "Not Found";
        ul.innerHTML = " ";
        hide.style.display = "none";
        show.style.display = "none";
      });
  }
});
