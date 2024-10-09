import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import ChooseDoctor from "../components/ChooseDoctor";

const Doctors = () => {
  const { currentUser } = useAuth();
  const [vets, setVets] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState("");
  const [selectedVet, setSelectedVet] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchVets = async () => {
      const q = query(collection(db, "users"), where("role", "==", "vet"));
      const querySnapshot = await getDocs(q);
      const vetsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVets(vetsList);
    };

    const fetchRecommendations = async () => {
      const q = query(collection(db, "recommendations"));
      const querySnapshot = await getDocs(q);
      const recommendationsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecommendations(recommendationsList);
    };

    fetchVets();
    fetchRecommendations();
  }, []);

  useEffect(() => {
    if (selectedVet) {
      const filtered = recommendations.filter(
        (rec) => rec.vetId === selectedVet.id
      );
      setFilteredRecommendations(filtered);
    } else {
      setFilteredRecommendations([]);
    }
  }, [selectedVet, recommendations]);

  const handleAddRecommendation = async () => {
    if (newRecommendation && selectedVet) {
      const docRef = await addDoc(collection(db, "recommendations"), {
        vetId: selectedVet.id,
        vetName: selectedVet.name,
        recommendation: newRecommendation,
        userId: currentUser.uid,
        userName: currentUser.displayName || "Anonymous",
      });
      setRecommendations([
        ...recommendations,
        {
          id: docRef.id,
          vetId: selectedVet.id,
          vetName: selectedVet.name,
          recommendation: newRecommendation,
          userId: currentUser.uid,
          userName: currentUser.displayName || "Anonymous",
        },
      ]);
      setNewRecommendation("");
      setOpen(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide success message after 3 seconds
    }
  };

  const handleDeleteRecommendation = async (id) => {
    await deleteDoc(doc(db, "recommendations", id));
    setRecommendations(recommendations.filter((rec) => rec.id !== id));
  };

  const HandleClick = (vet) => {
    setSelectedVet(vet);
  };

  return (
    <Box sx={{ p: 3 }}>
      <ChooseDoctor vets={vets} HandleClick={HandleClick} />

      <Box sx={{ mt: 3 }}>
        {selectedVet ? (
          <>
            <Typography variant="h5" gutterBottom>
              Recommendations for Dr. {selectedVet.name}
            </Typography>
            <Grid container spacing={2}>
              {filteredRecommendations.map((rec) => (
                <Grid item xs={12} key={rec.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="body1">
                        <strong>{rec.vetName}:</strong> {rec.recommendation}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        - {rec.userName}
                      </Typography>
                      {rec.userId === currentUser.uid && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteRecommendation(rec.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  label="Write a recommendation"
                  variant="outlined"
                  fullWidth
                  value={newRecommendation}
                  onChange={(e) => setNewRecommendation(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen(true)}
                  sx={{ mt: 2 }}
                  disabled={!newRecommendation}
                >
                  Add Recommendation
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography variant="h6">Please select a doctor</Typography>
        )}
      </Box>

      {showSuccessMessage && (
        <Box sx={{ mt: 2 }}>
          <Typography color="success.main">
            Recommendation added successfully!
          </Typography>
        </Box>
      )}

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
