import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import Header from "../../components/Header";
import { mockClientData } from "../../data/mockData";

const ClientTable = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredData = mockClientData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.dogName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  return (
    <Box m="20px">
      <Header title="Client Table" subtitle="List of Clients" />
      <Box mb="20px">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Dog Name</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.surname}</TableCell>
                <TableCell>{client.dogName}</TableCell>
                <TableCell>{client.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Client List" subtitle="List of Clients" />
      <Box height="75vh">
        <ClientTable />
      </Box>
    </Box>
  );
};

export default Bar;

               
