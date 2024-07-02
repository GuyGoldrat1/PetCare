import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { NavigationContext } from './Navigation';

// Generate random vets within a radius
const generateRandomVets = (center, count, radius) => {
    const getRandomCoordinate = (center, radius) => {
        const y0 = center[0];
        const x0 = center[1];
        const rd = radius / 111300; // Convert meters to degrees

        const u = Math.random();
        const v = Math.random();

        const w = rd * Math.sqrt(u);
        const t = 2 * Math.PI * v;
        const x = w * Math.cos(t);
        const y = w * Math.sin(t);

        const newY = y + y0;
        const newX = x + x0;

        return [newY, newX];
    };

    const vets = [];
    for (let i = 0; i < count; i++) {
        let position = getRandomCoordinate(center, radius * 1000); // radius in km
        // Ensure the vet is not placed in the sea by adjusting coordinates if necessary
        while (position[1] < center[1] - 0.1 || position[1] > center[1] + 0.1) {
            position = getRandomCoordinate(center, radius * 1000);
        }
        vets.push({
            id: i + 1,
            name: `Vet Clinic ${i + 1}`,
            position: position,
            image: 'https://via.placeholder.com/150'
        });
    }
    return vets;
};

const SetViewOnClick = ({ coords }) => {
    const map = useMap();
    map.setView(coords, 13);
    return null;
};

const Appointments = () => {
    const [currentPosition, setCurrentPosition] = useState([32.0853, 34.7818]); // Default to Tel-Aviv coordinates
    const [nearbyVets, setNearbyVets] = useState([]);
    const [selectedVet, setSelectedVet] = useState(null);
    const [form, setForm] = useState({ name: "", date: "", time: "" });
    const { showMenu } = useContext(NavigationContext);

    useEffect(() => {
        // Get user's current location
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            setCurrentPosition(userLocation);
            // Generate 20 random vets within a 10 km radius
            setNearbyVets(generateRandomVets(userLocation, 20, 10));
        });
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
            <h1 className="text-2xl font-bold mb-4">To make an appointment, click on a nearby vet on the map</h1>
            {!showMenu && (
                <MapContainer center={currentPosition} zoom={13} style={{ height: "400px", width: "100%" }} className="mb-4 rounded-lg shadow-lg">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <SetViewOnClick coords={currentPosition} />
                    <CircleMarker center={currentPosition} radius={10} color="blue">
                        <Popup>
                            Your current location.
                        </Popup>
                    </CircleMarker>
                    {nearbyVets.map(vet => (
                        <CircleMarker key={vet.id} center={vet.position} radius={5} color="black" eventHandlers={{
                            click: () => {
                                setSelectedVet(vet);
                            },
                        }}>
                            <Popup>
                                <div>
                                    <img src={vet.image} alt={vet.name} className="w-16 h-16 rounded-full mb-2" />
                                    <strong>{vet.name}</strong>
                                </div>
                            </Popup>
                        </CircleMarker>
                    ))}
                </MapContainer>
            )}
            {selectedVet && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Book an Appointment at {selectedVet.name}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Date:</label>
                            <input 
                                type="date" 
                                name="date" 
                                value={form.date} 
                                onChange={handleChange} 
                                className="border p-2 w-full rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Time:</label>
                            <select 
                                name="time" 
                                value={form.time} 
                                onChange={handleChange} 
                                className="border p-2 w-full rounded-lg"
                            >
                                <option value="">Select a time slot</option>
                                <option value="09:00">09:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="12:00">12:00 PM</option>
                                <option value="13:00">01:00 PM</option>
                                <option value="14:00">02:00 PM</option>
                                <option value="15:00">03:00 PM</option>
                                <option value="16:00">04:00 PM</option>
                                <option value="17:00">05:00 PM</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-600 transition duration-300">Book Appointment</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Appointments;
