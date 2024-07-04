import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Paper, Button, Avatar } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import blackDot from '/Users/admin/learning-react/src/assests/placeholder.png'; 
import blueDot from '/Users/admin/learning-react/src/assests/placeholder (1).png'; 
import melsterImage from '/Users/admin/learning-react/src/assests/Melser_Logo_Color.png'; 

// Icons for the markers
const blackDotIcon = new L.Icon({
  iconUrl: blackDot, 
  iconSize: [20, 20],
});

const blueDotIcon = new L.Icon({
  iconUrl: blueDot, 
  iconSize: [30, 30],
});

const vetData = [
  { id: 1, name: 'Veterinary Clinic - Yad Eliyahu', position: [32.072929, 34.776306], image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Noga - Veterinary Clinic', position: [32.060821, 34.765030], image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Vetrinar Bamerkaz', position: [32.074361, 34.781155], image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Vets4Pets', position: [32.051619, 34.749856], image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Dr. Benny Sofer', position: [32.063087, 34.773336], image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Mirpaa Bashdera', position: [32.090092, 34.774760], image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Dr. Sapir Hanoch', position: [32.071948, 34.801833], image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Gilad and Daniel Veterinary Clinic', position: [32.086857, 34.780446], image: 'https://via.placeholder.com/150' },
  { id: 9, name: 'Dr. Tali Avraham', position: [32.092360, 34.773600], image: 'https://via.placeholder.com/150' },
  { id: 10, name: 'The Clinic - Veterinary Center', position: [32.094292, 34.782002], image: 'https://via.placeholder.com/150' },
  { id: 11, name: 'The Veterinary Clinic - Ramat Aviv', position: [32.100512, 34.782854], image: 'https://via.placeholder.com/150' },
  { id: 12, name: 'Dr. Yaron Vinkler', position: [32.080735, 34.773822], image: 'https://via.placeholder.com/150' },
  { id: 13, name: 'Ahavat Hachai', position: [32.043638, 34.759401], image: 'https://via.placeholder.com/150' },
  { id: 14, name: 'My Vet - Dr. Shelly Einav', position: [32.087162, 34.775695], image: 'https://via.placeholder.com/150' },
  { id: 15, name: 'Dr. Ruby Tel-Ari', position: [32.080760, 34.776572], image: 'https://via.placeholder.com/150' },
  { id: 16, name: 'Dr. Moshe Ben Ari', position: [32.111840, 34.801360], image: 'https://via.placeholder.com/150' },
  { id: 17, name: 'Dr. Nir Geva', position: [32.097650, 34.791670], image: 'https://via.placeholder.com/150' },
  { id: 18, name: 'Dr. Shmuel Shilanski', position: [32.109225, 34.823572], image: 'https://via.placeholder.com/150' },
  { id: 19, name: 'Dr. Ofer Israeli', position: [32.114946, 34.819892], image: 'https://via.placeholder.com/150' },
  { id: 20, name: 'Lachayot BeAhava', position: [31.894206, 34.804582], image: 'https://via.placeholder.com/150' }, // הרצל 87, רחובות
  { id: 21, name: 'Home Pet Center', position: [32.028891, 34.845234], image: 'https://via.placeholder.com/150' }, // האוניברסיטה, אור יהודה
  { id: 22, name: 'Dr. Zohar and Yael Goldman Pet Clinic', position: [31.964772, 34.799731], image: 'https://via.placeholder.com/150' }, // טביב 14, ראשון לציון
  { id: 23, name: 'Dr. Ronen Meltzer', position: [31.964850, 34.803781], image: '/Users/admin/learning-react/src/assests/Melser_Logo_Color.png' }, // ירושלים 88, ראשון לציון
  { id: 24, name: 'Dr. Kaplan', position: [31.965642, 34.796013], image: 'https://via.placeholder.com/150' }, // הרצל 126, ראשון לציון
  { id: 25, name: 'Dr. Ohav Shalom Guy', position: [31.965762, 34.800235], image: 'https://via.placeholder.com/150' }, // הרצל 83, ראשון לציון
  { id: 26, name: 'Dr. Nachman Meidan', position: [31.965261, 34.798751], image: 'https://via.placeholder.com/150' }, // הרצל 95, ראשון לציון
  { id: 27, name: 'Dr. Orit Tadmur Yahalom', position: [32.058492, 34.854416], image: 'https://via.placeholder.com/150' }, // הכלנית 7, קרית אונו
  { id: 28, name: 'Dr. Sharon Regev', position: [32.071545, 34.828505], image: 'https://via.placeholder.com/150' }, // הכבאים 9, רמת גן
  { id: 29, name: 'Haverim', position: [32.057483, 34.853057], image: 'https://via.placeholder.com/150' }, // ירושלים 4, קרית אונו
  { id: 30, name: 'Veterinary Clinic', position: [32.055581, 34.863991], image: 'https://via.placeholder.com/150' }, // הרי יהודה 54, גני תקווה
  { id: 31, name: 'VetCare Veterinary Center - Dr. Shagi Levy', position: [32.055399, 34.851693], image: 'https://via.placeholder.com/150' }, // מרזוק ועזר 7, קרית אונו
  { id: 32, name: 'Billinson for Animals and Birds', position: [32.058086, 34.851209], image: 'https://via.placeholder.com/150' }, // שדרות בן גוריון 6, קרית אונו
  { id: 33, name: 'Dr. Tzachi Ben David', position: [32.057627, 34.855257], image: 'https://via.placeholder.com/150' }, // הזמיר, קרית אונו
  { id: 34, name: 'Dr. Tami Siniver', position: [32.059394, 34.853580], image: 'https://via.placeholder.com/150' }, // הקשת 2, קרית אונו
  { id: 35, name: 'Dr. Shlomo Elbagli', position: [32.034294, 34.889794], image: 'https://via.placeholder.com/150' }, // יצחק שדה 15, יהוד מונוסון
  { id: 36, name: 'The CATVET', position: [32.071545, 34.828505], image: 'https://via.placeholder.com/150' }, // הכבאים 9, רמת גן
  { id: 37, name: 'Dr. Sivan Hod', position: [32.057823, 34.854072], image: 'https://via.placeholder.com/150' }, // המעגל 48, קרית אונו
  { id: 38, name: 'Veterinary Clinic - Dr. Tali Stein', position: [32.081408, 34.792804], image: 'https://via.placeholder.com/150' }, // ההסתדרות 2, פתח תקווה
  { id: 39, name: 'Dr. Sharon Regev', position: [32.071545, 34.828505], image: 'https://via.placeholder.com/150' }, // הכבאים 9, רמת גן
  { id: 40, name: 'Dr. Tzachi Tivoli', position: [32.080455, 34.816937], image: 'https://via.placeholder.com/150' }, // חיים לנדאו 7, רמת גן (עופר מרום)
  { id: 41, name: 'Amigo Veterinary Clinic', position: [32.091855, 34.885362], image: 'https://via.placeholder.com/150' }, // קפלן 43, פתח תקווה
];


const SetMapCenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [map, position]);
  return null;
};

const Appointments = () => {
  const [selectedVet, setSelectedVet] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );
  }, []);

  return (
    <Container sx={{ background: 'linear-gradient(to bottom, #f0f8ff, #ffffff)', minHeight: '100vh', pt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">Select a vet from the map to make an appointment</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MapContainer center={currentPosition || [32.072929, 34.776306]} zoom={13} style={{ height: '400px', borderRadius: '8px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {currentPosition && (
              <Marker position={currentPosition} icon={blueDotIcon}>
                <Popup>Your current location</Popup>
              </Marker>
            )}
            {vetData.map(vet => (
              <Marker key={vet.id} position={vet.position} icon={blackDotIcon} eventHandlers={{ click: () => setSelectedVet(vet) }}>
                <Popup>{vet.name}</Popup>
              </Marker>
            ))}
            <SetMapCenter position={currentPosition} />
          </MapContainer>
        </Grid>
        {selectedVet && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Avatar src={selectedVet.image} alt={selectedVet.name} sx={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6">{selectedVet.name}</Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Make an Appointment
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Appointments;
