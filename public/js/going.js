

window.onload = async () => {
    // const response = await axios.get('http://localhost:3000/profile/json-list');
    
    const generateActivities = async () => {
  
    const savedButtons = document.querySelectorAll(".saved-button");
    const container = document.querySelector("#savedActivitites-container");
  
  
    savedButtons.forEach((button)=>{
      button.addEventListener("click", async (event)=>{
        // Getting the id of the 
        const id = event.currentTarget.children[0].innerHTML;
       
         // Removing activity from bookmark model
        await axios.post(`http://localhost:3000/a/${id}/unregister`);
    
  
        //Getting the activity data
        const response = await axios.get("http://localhost:3000/profile/json-list-unregister");
        console.log(response.data)
        //Deleting DOM content
        container.innerHTML = "";
  
        //Re-painting DOM content
        response.data.forEach((activity) => {
              container.innerHTML += `  
              
              <div class="col mb-4 h-100">
              <div class="card">
              <a href="/a/${activity._id}"> <img src="${activity.imageUrl}" class="card-img-top" alt="Activity image" style="height: 30%;"></a>
           
              <div class="card-body">
                  <div class="card-container">
                      <h5 class="card-title"><a href="/a/${activity._id}">${activity.name}</a></h5>
                 
                  <button type="submit" class="btn btn-default btn-sm saved-button" >Unregister <span class="hide">${activity._id}</span>
                      
                  </button>
                  </div>
                  <h3 id="date-text">On ${activity.startDate} to {{activity.endDate}}</h3>
                  <h2 id="grey-text">${activity.location}</h2>
                  <h2 id="grey-text">${activity.price} EUR </h2>
              </div>
              </div>
              </div>`
            });
            generateActivities();
    });
  });
  };
  
  generateActivities();
  
  
  };
  