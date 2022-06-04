

window.onload = async () => {
    // const response = await axios.get('http://localhost:3000/profile/json-list');
    
    const generateActivities = async () => {
  
    const savedButtons = document.querySelectorAll(".saved-activitydetails-button");
    const container = document.querySelector(".card-container");
  
  
    savedButtons.forEach((button)=>{
      button.addEventListener("click", async (event)=>{
        // Getting the id of the 
        const id = event.currentTarget.children[0].innerHTML;
       
         // Removing activity from bookmark model
        await axios.post(`http://localhost:3000/a/${id}/unsave`);
        window.location= "/profile";
  
    });
  });
  };
  
  generateActivities();
  
  
  };
  