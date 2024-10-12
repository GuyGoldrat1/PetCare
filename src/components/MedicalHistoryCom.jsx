import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  TextField,
  IconButton,
  Link,
} from "@mui/material";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ClearIcon from "@mui/icons-material/Clear";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const MedicalHistoryComponent = ({ currentUser }) => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      if (currentUser) {
        const q = query(
          collection(db, "medicalRecords"),
          where("clientId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const records = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
          if (records.length > 0) {
            const sortedRecords = records.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
              );
              setMedicalRecords(sortedRecords);
              setFilteredRecords(sortedRecords);
          }

        
      }
    };

    fetchMedicalRecords();
  }, [currentUser]);

  useEffect(() => {
    let filtered = medicalRecords;

    if (searchText) {
      filtered = filtered.filter(
        (record) =>
          record.summary.toLowerCase().includes(searchText.toLowerCase()) ||
          record.vetName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      filtered = filtered.filter((record) => record.date === dateStr);
    }

    setFilteredRecords(filtered);
  }, [searchText, selectedDate, medicalRecords]);

  const handleClearFilters = () => {
    setSearchText("");
    setSelectedDate(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Medical Bag
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ mr: 2 }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mr: 2 }}
          />
        </LocalizationProvider>
        <IconButton onClick={handleClearFilters} sx={{ ml: 2 }}>
          <ClearIcon />
        </IconButton>
      </Box>
      {filteredRecords.length > 0 ? (
        <List>
          {filteredRecords.map((record) => (
            <ListItem key={record.id}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="h6">{record.summary}</Typography>
                      <Typography variant="body2">
                        Date: {record.date}
                      </Typography>
                      <Typography variant="body2">
                        Vet: {record.vetName}
                      </Typography>
                    </Box>
                    <Box sx={{ mr: 1}}>
                      {record.pdfUrl && (
                        <Link
                          href={record.pdfUrl}
                          target="_blank"
                          rel="noopener"
                          sx={{ display: "flex", alignItems: "center", mt: 2 }}
                        >
                          <PictureAsPdfIcon
                            sx={{ fontSize: 40, color: "primary.main", mr: 1 }}
                          />
                          <Typography variant="body1" color="primary">
                            View PDF
                          </Typography>
                        </Link>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No medical records found</Typography>
      )}
    </Box>
  );
};

export default MedicalHistoryComponent;
