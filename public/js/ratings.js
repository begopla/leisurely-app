const ratings = document.querySelectorAll(".rating");
const ratingsContainer = document.querySelector(".ratings-container");
const panel = document.querySelector("#panel");
let selectedRating = "Happy";

// ratingsContainer.addEventListener("click", (e) => {
//   if (e.target.parentNode.classList.contains("rating")) {
//     removeActive();
//     e.target.parentNode.classList.add("active");
//     selectedRating = e.target.nextElementSibling.innerHTML;
//   }
// });

// function removeActive() {
//   for (let i = 0; i < ratings.length; i++) {
//     ratings[i].classList.remove("active");
//   }
// }
