import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NavigationContext } from './Navigation';

// Vet icon for markers
const vetIcon = new L.Icon({
    iconUrl: 'https://image.flaticon.com/icons/png/512/616/616559.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const Appointments = () => {
    const [currentPosition, setCurrentPosition] = useState([32.0853, 34.7818]); // Default to Tel-Aviv coordinates
    const [nearbyVets, setNearbyVets] = useState([]);
    const [form, setForm] = useState({ name: "", date: "", time: "" });
    const { showMenu } = useContext(NavigationContext);

    useEffect(() => {
        // Get user's current location
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentPosition([position.coords.latitude, position.coords.longitude]);
        });

        // Mock nearby vets in Tel Aviv
        const mockVets = [
            { id: 1, name: "Vet Clinic 1", position: [32.0870, 34.7815] },
            { id: 2, name: "Vet Clinic 2", position: [32.0840, 34.7830] },
            { id: 3, name: "Vet Clinic 3", position: [32.0820, 34.7850] },
        ];
        setNearbyVets(mockVets);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(form);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl">Book an Appointment</h1>
            {!showMenu && (
                <MapContainer center={currentPosition} zoom={13} style={{ height: "400px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={currentPosition}>
                        <Popup>
                            Your current location.
                        </Popup>
                    </Marker>
                    {nearbyVets.map(vet => (
                        <Marker key={vet.id} position={vet.position} icon={vetIcon}>
                            <Popup>
                                {vet.name}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label className="block font-semibold">Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange} 
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Date:</label>
                    <input 
                        type="date" 
                        name="date" 
                        value={form.date} 
                        onChange={handleChange} 
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Time:</label>
                    <input 
                        type="time" 
                        name="time" 
                        value={form.time} 
                        onChange={handleChange} 
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Book Appointment</button>
            </form>
        </div>
    );
};

export default Appointments;
