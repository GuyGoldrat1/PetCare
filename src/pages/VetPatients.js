import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel, Input } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '../context/AuthContext';
import { getDoc, doc,getDocs, collection, query, where, addDoc } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import PetsIcon from '@mui/icons-material/Pets';

const VetPatients = () => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [treatmentType, setTreatmentType] = useState('');
  const [date, setDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [vetInfo, setVetInfo] = useState({});


  useEffect(() => {
        const fetchVetInfo = async () => {
          if (currentUser) {
            const vetDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (vetDoc.exists()) {
              setVetInfo(vetDoc.data());
            }
          }
        };


    const fetchPatients = async () => {
      if (currentUser) {
        const q = query(collection(db, 'users'), where('role', '==', 'pet-owner'));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPatients(users);
        setFilteredPatients(users);
      }
    };
    
    fetchVetInfo();
    fetchPatients();
  }, [currentUser]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredPatients(patients.filter(patient => 
      (patient.email.toLowerCase().includes(query) || (patient.petName && patient.petName.toLowerCase().includes(query)))
    ));
  };

  const handlePdfUpload = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleAddSummary = async () => {
    try {
      let pdfUrl = '';
      if (pdfFile) {
        const storageRef = ref(storage, `medical_summaries/${currentUser.uid}/${pdfFile.name}`);
        await uploadBytes(storageRef, pdfFile);
        pdfUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "medicalRecords"), {
        clientId: selectedPatient.id,
        vetId: currentUser.uid,
        vetName: currentUser.displayName || vetInfo.name,
        summary,
        treatmentType,
        date: date.toISOString().split("T")[0],
        pdfUrl,
      });

      setOpen(false);
      setSummary('');
      setTreatmentType('');
      setDate(new Date());
      setPdfFile(null);
      alert('Medical summary added successfully');
    } catch (error) {
      console.error('Error adding summary:', error);
      alert('Failed to add medical summary. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Patients
      </Typography>
      <TextField
        label="Search Patients"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />
      <Grid container spacing={3}>
        {filteredPatients.map(patient => (
          <Grid item xs={12} sm={6} md={4} key={patient.id}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 70, height: 70, mb: 2 }}>
                  <PetsIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {patient.petName || 'Unknown'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {patient.email}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => { setSelectedPatient(patient); setOpen(true); }}
                >
                  Add Medical Summary
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Medical Summary</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Treatment Type</InputLabel>
            <Select
              value={treatmentType}
              onChange={(e) => setTreatmentType(e.target.value)}
            >
              <MenuItem value="Vaccination">Vaccination</MenuItem>
              <MenuItem value="Treatment">Treatment</MenuItem>
              <MenuItem value="Surgery">Surgery</MenuItem>
              <MenuItem value="Medical Examine">Medical Examine</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Medical Summary"
            type="text"
            fullWidth
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
            />
          </LocalizationProvider>
          <Input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSummary}>Add Summary</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VetPatients;
