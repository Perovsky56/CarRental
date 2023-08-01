import { useState, useEffect } from "react";
import axios from "axios";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";

export default function BookingMap() {
  const [apiKey, setApiKey] = useState("AIzaSyD3uhYvzkVZMfY3aiNpsvp9opMGFiaDmNk");

//   useEffect(() => {
//     axios.get("/api/getMapApiKey")
//       .then(response => {
//         setMapApiKey(response.data);
//       })
//       .catch(error => {
//         console.error("Błąd podczas pobierania klucza API: ", error);
//       });
//   }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });
  
  if (loadError) {
    return <div>Error loading Google Maps. Please try again later.</div>;
  }
  if (!isLoaded) return <div>Ładowanie...</div>;

  return <Map />;
};

function Map(){
    return (
        <GoogleMap
            zoom={10}
            center={{ lat: 50.65422287639508, lng: 17.905023525353826 }}
            mapContainerClassName="w-full h-80"
            options={{
                styles: [
                    {
                        "featureType": "all",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "color": "#878787"
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#f9f5ed"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#c9c9c9"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#aee0f4"
                            }
                        ]
                    }
                ]
            }}
        >
            <MarkerF position={{ lat: 50.65422287639508, lng: 17.905023525353826 }} ></MarkerF>
        </GoogleMap>
    );
}