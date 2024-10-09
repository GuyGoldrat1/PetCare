import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  TextField,
} from "@mui/material";

const DoctorList = ({ vets, HandleClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVetId, setSelectedVetId] = useState(null); // Track selected doctor

  const filteredVets = vets.filter((vet) =>
    vet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleVetClick = (vet) => {
    setSelectedVetId(vet.id); // Set the selected doctor ID
    HandleClick(vet); // Call the parent handler
  };

  return (
    <Box sx={{ p: 3, maxWidth: "100%" }}>
      <Typography variant="h3" gutterBottom>
        Veterinarians
      </Typography>
      <TextField
        label="Search by Doctor's Name"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearch}
        size="small"
      />
      <Box
        sx={{ display: "flex", overflowX: "auto", gap: 2, py: 2, padding: 1 }}
      >
        {filteredVets.map((vet) => (
          <Card
            key={vet.id}
            onClick={() => handleVetClick(vet)}
            sx={{
              width: 200,
              height: 200,
              cursor: "pointer",
              transition: "transform 0.3s, background-color 0.3s",
              transform: selectedVetId === vet.id ? "scale(1.05)" : "scale(1)",
              backgroundColor:
                selectedVetId === vet.id ? "#f5f5f5" : "background.paper", // Highlight selected vet
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <CardContent>
              <Avatar
                src={vet.vetImageUrl || ""}
                sx={{ width: 100, height: 100, mx: "auto" }}
              />
              <Typography variant="h5" align="center" sx={{ mt: 1 }}>
                {vet.name}
              </Typography>
              <Typography variant="body1" align="center" color="text.secondary">
                {vet.location}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default DoctorList;
