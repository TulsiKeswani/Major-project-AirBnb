
    mapboxgl.accessToken =  mapToken;
     console.log(coordinates);
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
});
// Custom marker ke liye ek HTML element create karein
var el = document.createElement('div');
el.className = 'custom-marker';

// Custom styling add karein
el.style.backgroundImage = 'url(/aspects/airbnb.png)';  // Yahan apni custom image ka URL daalein
el.style.width = '40px';  // Image width set karein
el.style.height = '40px';  // Image height set karein
el.style.backgroundSize = '100%';  // Background image ko element ke size ke mutabiq adjust karein


const marker1 = new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({offset:30, className: 'my-class'}).setHTML("<b><p>Exact Location provided after Booking</p></b>").setMaxWidth("500px"))
        .addTo(map);

        map.on('load', function () {
            map.addLayer({
                'id': 'circle-layer',
                'type': 'circle',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': coordinates // Replace with your coordinates
                        }
                    }
                },
                'paint': {
                    'circle-radius': 70,  // Adjust the radius
                    'circle-color': 'skyBlue',  // Red color
                    'circle-opacity': 0.5  // Adjust opacity if needed
                }
            });
        });

        
