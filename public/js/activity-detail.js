

window.onload = async () => {
  
    
    const generateActivities = async () => {
  
    const savedButtons = document.querySelectorAll(".saved-activitydetails-button");
 

  
  
    savedButtons.forEach((button)=>{
      button.addEventListener("click", async (event)=>{
        // Getting the id of the 
        const id = event.currentTarget.children[0].innerHTML;
       
         // Removing activity from bookmark model
        await axios.post(`http://localhost:3000/a/${id}/unregister`);
        window.location= "/profile";
  
    });
  });
 
  };
  
  generateActivities();
  
  
  };
  