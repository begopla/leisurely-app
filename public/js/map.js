const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYnBsYXJ1YmkiLCJhIjoiY2w0MmgyazF1NGo2NDNjbDhwY3dsYzBmYyJ9.xISr4Zkte7OxTKBLzEp7Ug';

const main = async () => {
    mapboxgl.accessToken =  MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({

       container: 'map', //contanier ID
       style: 'mapbox://styles/mapbox/streets-v11',
       center: [-74.5, 40], // starting position [lng, lat]
       zoom: 9 // starting zoom
    });
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          (position) => {
        
            const coordinates = [position.coords.longitude, position.coords.latitude];
            map.setCenter(coordinates);
          },
          () => console.log("Your browser doesn't support geolocation")
        )
    } else {
        console.log("Your browser doesn't support geolocation")
    }
    
    const res = await axios.get("http://localhost:3000/json-list");
    
    res.data.forEach(element => {
        console.log(element)
    const mapboxClient = mapboxSdk({ accessToken: MAPBOX_ACCESS_TOKEN });
    mapboxClient.geocoding
        .forwardGeocode({
        query: element.location,
        autocomplete: false,
        limit: 1
        })
    .send()
    .then((response) => {
        if (
            !response ||
            !response.body ||
            !response.body.features ||
            !response.body.features.length
        ) {
        console.error('Invalid response:');
        console.error( response);
        return;
        }
        const feature = response.body.features[0];
        console.log(response)
        const coordinates = feature.geometry.coordinates;

        
        const popup = new mapboxgl.Popup().setHTML(
            
            `<h4>${element.name}</h4>
            <p>${element.description}</p>
            <a href="/a/${element._id}">See details</a>
            `
            );
            new mapboxgl.Marker({color:"red"})
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(map);
        })
    });
}
window.addEventListener('load',main);
