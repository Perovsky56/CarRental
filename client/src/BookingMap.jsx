import { useState, useEffect } from "react";
import axios from "axios";
import { useLoadScript, GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";

export default function BookingMap({ onUpdateBookingInfo }) {
    const [apiKey, setApiKey] = useState("AIzaSyD3uhYvzkVZMfY3aiNpsvp9opMGFiaDmNk");
    const [routeDistances, setRouteDistances] = useState({
      pickupDistance: null,
      returnDistance: null,
    });

    const [pricePerKm, setPricePerKm] = useState(5.0);
    const [totalDistance, setTotalDistance] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
    });

    const basePosition = {
        lat: 50.65422287639508,
        lng: 17.905023525353826,
      };
    const [baseCenter, setBaseCenter] = useState(basePosition);

    const [markers, setMarkers] = useState([
      { id: "base", position: basePosition, title: "CarRental - baza" },
    ]);

    const [selectedMarker, setSelectedMarker] = useState(null);

    const updateBookingInfo = (totalDistance, totalPrice) => {
        const bookingInfo = {
          pickupCoordinates: markers.find(marker => marker.title === "ODBIÓR")?.position || null,
          returnCoordinates: markers.find(marker => marker.title === "ZWROT")?.position || null,
          totalDistance: totalDistance,
          totalPrice: totalPrice,
        };

        onUpdateBookingInfo(bookingInfo);
      };

    useEffect(() => {
      const calculateRouteDistances = async () => {
          if (markers.length > 1 ) {
              const origin = `${basePosition.lat},${basePosition.lng}`;
              const pickupMarker = markers.find(marker => marker.title === "ODBIÓR");
              const returnMarker = markers.find(marker => marker.title === "ZWROT");
              if (pickupMarker && returnMarker) {
                const pickup = `${pickupMarker.position.lat},${pickupMarker.position.lng}`;
                const returnLocation = `${returnMarker.position.lat},${returnMarker.position.lng}`;
                
                try {
                  const responsePickup = await axios.get('/calculate-distance', {
                      params: {
                          origins: origin,
                          destinations: pickup,
                          apiKey: apiKey,
                      },
                  });
  
                  const responseReturn = await axios.get('/calculate-distance', {
                      params: {
                          origins: origin,
                          destinations: returnLocation,
                          apiKey: apiKey,
                      },
                  });
  
                  const pickupDistance = responsePickup.data.rows[0]?.elements[0]?.distance?.text || "Nie znaleziono trasy";
                  const returnDistance = responseReturn.data.rows[0]?.elements[0]?.distance?.text || "Nie znaleziono trasy";

                  setRouteDistances({
                      pickupDistance: pickupDistance,
                      returnDistance: returnDistance,
                  });
                  setTotalDistance(parseFloat(pickupDistance)+parseFloat(returnDistance));
                  setTotalPrice(totalDistance * pricePerKm);
                  updateBookingInfo(totalDistance, totalPrice);
                } catch (error) {
                    console.error('Błąd podczas pobierania danych odległości z Google Maps API', error);
                }
            }
            else {
              setRouteDistances({
                pickupDistance: null,
                returnDistance: null,
              });
              setTotalDistance(0);
              setTotalPrice(0);
              updateBookingInfo(totalPrice, totalDistance);
              return;
            }
          }
      };
      calculateRouteDistances();
      updateBookingInfo(totalPrice, totalDistance);
    }, [markers, apiKey, totalPrice, totalDistance]);

    const handleMapClick = (e) => {
      if (markers.length < 3) {
        const newMarker = {
          id: Date.now(),
          position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          title: markers.length === 1 ? "ODBIÓR" : "ZWROT",
        };
        console.log(newMarker.title + ": " + e.latLng.lat() + ", " + e.latLng.lng());
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
    
      const pickupMarker = markers.find(marker => marker.title === "ODBIÓR");
      const returnMarker = markers.find(marker => marker.title === "ZWROT");
    
      if (markerId === pickupMarker?.id) {
        if (returnMarker) {
          setMarkers(markers.filter(marker => marker.id !== pickupMarker.id && marker.id !== returnMarker.id));
        } else {
          setMarkers(markers.filter(marker => marker.id !== pickupMarker.id));
        }
        
      } else if (markerId === returnMarker?.id) {
        if (pickupMarker) {
          setMarkers(markers.filter(marker => marker.id !== returnMarker.id));
        }
        } else {
          setMarkers(markers.filter((marker) => marker.id !== markerId));
        }
      updateBookingInfo(0, 0);
    };
  
    const handleMarkerDrag = (markerId, position) => {
      if (markerId !== "base") {
        setMarkers((prevMarkers) =>
          prevMarkers.map((marker) =>
            marker.id === markerId ? { ...marker, position } : marker
          )
        );
      }
      updateBookingInfo();
    };

    if (loadError) {
        return <div>Błąd wczytywania mapy.</div>;
    }

    if (!isLoaded) {
        return <div>Ładowanie...</div>;
    }

    return (
    <div className="relative z-10">
        <GoogleMap
            zoom={13}
            center={baseCenter}
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
                    icon={{
                      url: marker.title === "CarRental - baza"
                          ? "http://localhost:4000/uploads/icons/CarRental.png"
                          : marker.title === "ODBIÓR"
                          ? "http://localhost:4000/uploads/icons/arrowU.png"
                          : marker.title === "ZWROT"
                          ? "http://localhost:4000/uploads/icons/arrowD.png"
                          : "",
                      scaledSize: new window.google.maps.Size(25, 25),
                  }}
                    draggable={marker.title !== "CarRental - baza"}
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
            <div className="grid xl:grid-cols-1 2xl:grid-cols-2 gap-x-8 gap-y-2">
                {markers.slice(1).map((marker) => (
                    <div key={marker.id} className="whitespace-nowrap">
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
            <div className="mt-4 mb-2">
                {markers.length > 2 && routeDistances.pickupDistance && routeDistances.returnDistance && (
                    <div className="grid xl:grid-cols-1 2xl:grid-cols-3 gap-x-2 gap-y-4 whitespace-nowrap text-sm">
                        <div className="text-center shadow shadow-gray-300 rounded-xl p-2">
                          <p>
                            <span className="italic">
                              Od bazy do<br/>MIEJSCA ODBIORU:<br/>
                            </span>
                            {parseFloat(routeDistances.pickupDistance)} km
                          </p>
                        </div>
                        <div className="text-center shadow shadow-gray-300 rounded-xl p-2">
                          <p>
                            <span className="italic">
                              Od bazy do<br/>MIEJSCA ZWROTU:<br/>
                            </span>
                            {parseFloat(routeDistances.returnDistance)} km
                          </p>
                        </div>
                        <div className="text-center shadow shadow-gray-300 rounded-xl p-2">
                          <p>
                            <span className="font-bold">
                              CENA:
                              </span>
                            <br /> {totalDistance.toFixed(1)} km * {pricePerKm} zł = <br/>{totalPrice.toFixed(2)} zł
                          </p>
                        </div>               
                    </div>
                )}
              </div>
        </div>
    </div>
    );
}




