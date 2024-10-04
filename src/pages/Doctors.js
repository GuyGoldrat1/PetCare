import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getDocs, collection, query, where, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import ChooseDoctor from '../components/ChooseDoctor'; // Import your new DataGrid component

const Doctors = () => {
  const { currentUser } = useAuth();
  const [vets, setVets] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState('');
  const [selectedVet, setSelectedVet] = useState(null);

  useEffect(() => {
    const fetchVets = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'vet'));
      const querySnapshot = await getDocs(q);
      const vetsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVets(vetsList);
    };

    const fetchRecommendations = async () => {
      const q = query(collection(db, 'recommendations'));
      const querySnapshot = await getDocs(q);
      const recommendationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecommendations(recommendationsList);
    };

    fetchVets();
    fetchRecommendations();
  }, []);

  const handleAddRecommendation = async () => {
    if (newRecommendation && selectedVet) {
      const docRef = await addDoc(collection(db, 'recommendations'), {
        vetId: selectedVet.id,
        vetName: selectedVet.name,
        recommendation: newRecommendation,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
      });
      setRecommendations([...recommendations, { id: docRef.id, vetId: selectedVet.id, vetName: selectedVet.name, recommendation: newRecommendation, userId: currentUser.uid, userName: currentUser.displayName || 'Anonymous' }]);
      setNewRecommendation('');
      setOpen(false);
      alert('Recommendation added successfully');
    }
  };

  const handleDeleteRecommendation = async (id) => {
    await deleteDoc(doc(db, 'recommendations', id));
    setRecommendations(recommendations.filter(rec => rec.id !== id));
  };

  const HandleClick = (vet) => {
    // Add logic to delete the appointment by id from Firestore
    console.log('Deleting appointment with id:', vet);
  };

  return (
    <Box sx={{ p: 3, }}>
      <ChooseDoctor vets={vets} HandleClick={HandleClick} />
      
      <Box sx={{ p: 3}}>
        <Typography variant="h5" gutterBottom>
          Recommendations
      </Typography>
        <Grid container spacing={2}>
          {recommendations.map((rec) => (
            <Grid item xs={12} md={12} lg={12} key={rec.id}  >
              <Card >
                <CardContent>
                  <Typography variant="body1">
                    <strong>{rec.vetName}:</strong> {rec.recommendation}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    - {rec.userName}
                  </Typography>
                  {rec.userId === currentUser.uid && (
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRecommendation(rec.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Box>


      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Recommendation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Recommendation"
            type="text"
            fullWidth
            value={newRecommendation}
            onChange={(e) => setNewRecommendation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddRecommendation}>Add Recommendation</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Doctors;
