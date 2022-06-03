

window.onload = async () => {
  // const response = await axios.get('http://localhost:3000/profile/json-list');
  // console.log(response)
  
  const generateActivities = async () => {

  const savedButtons = document.querySelectorAll(".saved-button");
  const container = document.querySelector("#savedActivitites-container");


  savedButtons.forEach((button)=>{
    button.addEventListener("click", async (event)=>{
      const id = event.currentTarget.children[0].innerHTML;
      console.log(id);
      await axios.post(`http://localhost:3000/a/${id}/unsave`);
      const response = await axios.get("http://localhost:3000/profile/json-list");
      container.innerHTML = "";
            response.data.forEach((activity) => {
                  container.innerHTML += `  
            <div class="col">
            <div class="card" style="width: 18rem ;">
            <a href="/a/${activity.id}"> <img src="${activity.imageUrl}" class="card-img-top" alt="Activity image" style="height: 30%;"></a>
         
        
            <div class="card-body">
                <div class="card-container">
                    <h5 class="card-title"><a href="/a/${activity.id}">${activity.name}</a></h5>
               
                <button type="submit" class="btn btn-default btn-sm saved-button" >Save <span class="hide">${activity.id}</span>
                
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="red" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
                    <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"></path></svg>
                    
                </button>
                </div>
                <h3 id="date-text">On ${activity.startDate} to {{activity.endDate}}</h3>
                <h3 id="grey-text">${activity.location}</h2>
                <h2 id="grey-text">${activity.price} EUR </h2>
            <hr>
            </div>
            </div>
            </div>`
          });
          generateActivities();
  })
});


}

generateActivities();


}
  //if we want to do instead a axios.post('url',{username:"", password: ""})

//   const generateActivities = async () => {
//     const savedButtons = document.querySelectorAll(".saved-button");
//     const container = document.querySelectorAll("#savedActivitites-container");
//     savedButtons.forEach((button) => {
//       button.addEventListener("click", async (event) => {
//         console.log(event.currentTarget.children[0].innerHTML);
//         const id = event.currentTarget.children[0].innerHTML;
//         await axios.post(`http://localhost:3000/a/${id}/unsave`);
//         const respose = await axios.get(
//           "http://localhost:3000/profile/json-list"
//         );
//         container.innerHTML = "";
//         respose.data.forEach((activity) => {
//           container.innerHTML += `  
//     <div class="col">
//     <div class="card" style="width: 18rem ;">
//     <a href="/a/${activity.id}"> <img src="${activity.imageUrl}" class="card-img-top" alt="Activity image" style="height: 30%;"></a>
 

//     <div class="card-body">
//         <div class="card-container">
//             <h5 class="card-title"><a href="/a/${activity.id}">${activity.name}</a></h5>
     
//         <button type="submit" class="btn btn-default btn-sm saved-button" >
       
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="red" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
//             <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"></path></svg>
//             Saved <span class="hide">${activity.id}</span>
//         </button>
//         </div>
//         <h3 id="date-text">On ${activity.startDate} to {{activity.endDate}}</h3>
//         <h3 id="grey-text">${activity.location}</h2>
//         <h2 id="grey-text">${activity.price} EUR </h2>
//     <hr>
//     </div>
//     </div>
//     </div>`;
//         });
//       generateActivities();

//       });
//     });
//   };

//   generateActivities();
// };
