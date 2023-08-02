import { useState, useEffect } from "react";
import axios from "axios";
import { useLoadScript, GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";

export default function BookingMap() {
    const [apiKey, setApiKey] = useState("AIzaSyD3uhYvzkVZMfY3aiNpsvp9opMGFiaDmNk");
    const [markerOpen, setMarkerOpen] = useState(false);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
    });

    const basePosition = {
        lat: 50.65422287639508,
        lng: 17.905023525353826,
      };

    const [center, setCenter] = useState(basePosition);

    const [markers, setMarkers] = useState([
      { id: "base", position: basePosition, title: "CarRental - baza" },
    ]);

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markerAddresses, setMarkerAddresses] = useState({});

    const updateMarkerAddresses = (updatedMarkers) => {
        const newAddresses = {};
      
        updatedMarkers.forEach(async (marker) => {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
              latlng: `${marker.position.lat},${marker.position.lng}`,
              key: apiKey,
            },
          });
      
          const address = response.data.results[0]?.formatted_address || 'Nie znaleziono adresu';
          newAddresses[marker.id] = address;
        });
      
        setMarkerAddresses(newAddresses);
      };

    const handleMapClick = (e) => {
      if (markers.length < 3) {
        const newMarker = {
          id: Date.now(),
          position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          title: markers.length === 1 ? "ODBIÓR" : "ZWROT",
        };
        console.log(e.latLng + ", " + e.latLng);
        setMarkers([...markers, newMarker]);
        setSelectedMarker(null);
      }
    };
  
    const handleMarkerClick = (marker) => {
      setSelectedMarker(marker);
    };
  
    const handleMarkerDoubleClick = (markerId) => {
      if (markerId === "base") {
        return;
      }
    
      const odbiorMarker = markers.find(marker => marker.title === "ODBIÓR");
      const zwrotMarker = markers.find(marker => marker.title === "ZWROT");
    
      if (markerId === odbiorMarker?.id) {
        if (zwrotMarker) {
          setMarkers(markers.filter(marker => marker.id !== odbiorMarker.id && marker.id !== zwrotMarker.id));
        } else {
          setMarkers(markers.filter(marker => marker.id !== odbiorMarker.id));
        }
      } else if (markerId === zwrotMarker?.id) {
        if (odbiorMarker) {
          setMarkers(markers.filter(marker => marker.id !== zwrotMarker.id));
        }
      } else {
        setMarkers(markers.filter((marker) => marker.id !== markerId));
      }
    };
  
    const handleMarkerDrag = (markerId, position) => {
      if (markerId !== "base") {
        setMarkers((prevMarkers) =>
          prevMarkers.map((marker) =>
            marker.id === markerId ? { ...marker, position } : marker
          )
        );
      }
    };

    if (loadError) {
        return <div>Błąd wczytywania mapy.</div>;
    }

    if (!isLoaded) {
        return <div>Ładowanie...</div>;
    }

    return (
    <div>
        <GoogleMap
            zoom={13}
            center={center}
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
                ],
                streetViewControl: false,
                keyboardShortcuts: false,
                mapTypeControl: false,
                mapTypeControlOptions: {
                    mapTypeIds: []
                },
                mapTypeId: "roadmap"
            }}
            onClick={handleMapClick}
        >
            {markers.map((marker) => (
                <MarkerF
                    key={marker.id}
                    position={marker.position}
                    draggable={true}
                    onClick={() => handleMarkerClick(marker)}
                    onDblClick={() => handleMarkerDoubleClick(marker.id)}
                    onDragEnd={(e) => handleMarkerDrag(marker.id, e.latLng.toJSON())}
                >
                    {selectedMarker === marker && (
                        <InfoWindowF onCloseClick={() => setSelectedMarker(null)}>
                        <div>
                            <strong>{marker.title}</strong>
                        </div>
                        </InfoWindowF>
                    )}
                </MarkerF>
            ))}
        </GoogleMap>
        <div className="mt-4">
            <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-2">
                {markers.slice(1).map((marker) => (
                    <div key={marker.id}>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://maps.google.com?q=${marker.position.lat},${marker.position.lng}`}
                            className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-blue-600 transition duration-300 block text-center flex items-center justify-center"
                        >
                            Wybrane miejsce: {marker.title}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}




