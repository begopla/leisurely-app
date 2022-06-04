


window.onload = async () => {
    // const response = await axios.get('http://localhost:3000/profile/json-list');
    
    const generateActivities = async () => {
  
    const savedButtons = document.querySelectorAll(".profile-activities");
     
    savedButtons.forEach((button)=>{
      button.addEventListener("click", async (event)=>{
        // Getting the id of the 
        const id = event.currentTarget.children[0].innerHTML;
       console.log(id)
         // Removing activity from bookmark model
        await axios.post(`http://localhost:3000/a/${id}/save`);
        window.location = "/profile/savedactivities";
    });
  });
  };

 
  generateActivities();
  
  
  };
  