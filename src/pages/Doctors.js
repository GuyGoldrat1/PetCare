import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  IconButton,
  Dialog,
  Paper,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  const [newRecommendation, setNewRecommendation] = useState("");
  const [selectedVet, setSelectedVet] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

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
      setNewRecommendation(""); // Clear the recommendation text when switching doctors
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
      setOpenSuccessDialog(true); // Show success dialog
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleDeleteRecommendation = async (id) => {
    setDeleteId(id); // Store the ID of the recommendation to be deleted
    setOpenConfirmDelete(true); // Open the delete confirmation dialog
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "recommendations", deleteId));
    setRecommendations(recommendations.filter((rec) => rec.id !== deleteId));
    setOpenConfirmDelete(false); // Close the delete confirmation dialog
  };

  const HandleClick = (vet) => {
    setSelectedVet(vet);
  };

  return (
    <Box>
      <ChooseDoctor vets={vets} HandleClick={HandleClick} />

      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {selectedVet ? (
            <>
              <Grid item xs={6} md={6}>
                  <Typography variant="h5" gutterBottom>
                    Recommendations
                  </Typography>
                  {filteredRecommendations.length > 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        overflowX: "auto",
                        overflowY: "auto",
                        maxHeight: "60vh",
                      }}
                    >
                      <Grid container spacing={2}>
                        {filteredRecommendations.map((rec) => (
                          <Grid item xs={12} md={12} key={rec.id}>
                            <Card >
                              <CardContent>
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Box>
                                    <Typography variant="body1">
                                      {rec.recommendation}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      {rec.userName}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    {rec.userId === currentUser.uid && (
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() =>
                                          handleDeleteRecommendation(rec.id)
                                        }
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    )}
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ) : (
                    <Typography variant="h5">
                      There are no recommendations for {selectedVet.name}.
                    </Typography>
                  )}
              </Grid>
            </>
          ) : (
            <Grid item xs={6} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h4" color="text.secondary">
                  Please Select A Doctor
                </Typography>
              </Paper>
            </Grid>
          )}
          <Grid item xs={6} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4">Add Recommendation</Typography>

              <TextField
                label="Recommendation"
                variant="outlined"
                fullWidth
                value={newRecommendation}
                onChange={(e) => setNewRecommendation(e.target.value)}
                disabled={!selectedVet}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddRecommendation}
                fullWidth
                sx={{ mt: 2 }}
                disabled={!newRecommendation || !selectedVet}
              >
                Add Recommendation
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Success Dialog */}
      <Dialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
      >
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>Recommendation added successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSuccessDialog(false)}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this recommendation?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {showSuccessMessage && (
        <Box sx={{ mt: 2 }}>
          <Typography color="success.main">
            Recommendation added successfully!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Doctors;
