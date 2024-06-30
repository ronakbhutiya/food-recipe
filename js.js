const searchBox = document.querySelector(".searchbox");
const searchbtn = document.querySelector(".searchbtn");
const recipe_container = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
//function get recipe
const fetchRecipe = async (query) => {
  recipe_container.innerHTML = "<h2>Fectching Recipes..</h2>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query} `
    );
    const respose = await data.json();
    // console.log(respose);
    recipe_container.innerHTML = "";
    respose.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> </p>

    `;
      const button = document.createElement("button");
      button.textContent = "View Recipe";
      //adding event listener to recipe btn\
      button.addEventListener("click", () => {
        opemRecipePop(meal);
      });
      recipeDiv.appendChild(button);
      recipe_container.appendChild(recipeDiv);
    });
  } catch (error) {
    recipe_container.innerHTML = "<h2>Error in  Fectching Recipes..</h2>";
  }
};

searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipe_container.innerHTML = `<h2>Type the meal in search box.</h2>`;
    return;
  }
  fetchRecipe(searchInput);
});
const fetchIngredents = (meal) => {
  let ingredientsList = "";
  for (i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};
const opemRecipePop = (meal) => {
  recipeDetailsContent.innerHTML = `
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredients:</h3>
  <ul class="ingredentlist">${fetchIngredents(meal)}</ul>
    <div class="recipeinstructions">
    <h3>Instruction:</h3>
    <p>${meal.strInstructions}</p>
  </div>

  `;

  recipeDetailsContent.parentElement.style.display = "block";
};
recipeCloseBtn.addEventListener("click", (e) => {
  recipeDetailsContent.parentElement.style.display = "none";
});
