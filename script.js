const searchBtn = document.querySelector('button');
const searchInput = document.querySelector('input[type="text"]');
const recipeContainer = document.querySelector('.recipe-container');

searchBtn.addEventListener('click', () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`)
    .then(response => response.json())
    .then(data => {
      recipeContainer.innerHTML = '';
      if (data.meals === null) {
        recipeContainer.innerHTML = '<p>No results found.</p>';
      } else {
        data.meals.forEach(meal => {
          const recipeBox = document.createElement('div');
          recipeBox.classList.add('recipe-box');
          recipeBox.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
          `;
          recipeContainer.appendChild(recipeBox);
        });
      }
    })
    .catch(error => {
      recipeContainer.innerHTML = '<p>An error occurred while searching. Please try again later.</p>';
    });
});
