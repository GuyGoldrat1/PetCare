// src/pages/Invoices.jsx

import { Box, Typography, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, Paper, colors } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataVisitHistory } from "../../data/mockData";
import Header from "../../components/Header";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {db} from "../../firebase-config";
import {collection, getDocs, onSnapshot, query} from "firebase/firestore";
import SetTheme from "../../components/UseTheme";

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell>{row.veterinarian}</TableCell>
        <TableCell>{row.diagnosis}</TableCell>
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Tests</TableCell>
                    <TableCell>Results</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Medication</TableCell>
                    <TableCell>Comments</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.tests}</TableCell>
                    <TableCell>{row.results}</TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell>{row.medication}</TableCell>
                    <TableCell>{row.comments}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

class InvoiceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitHistory: [],
      colors: tokens(props.mode)
    };
  }

  componentDidMount() {
    const visitCollection = query(collection(db, "appointments"), []);
    const visits = [];
    this.setState({
      updateListener: onSnapshot(visitCollection, (visitSnapshot) => {
        visitSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          const visit = {
            id: doc.id,
            date: data.date,
            veterinarian: data.veterinarian,
            description: data.description,
            diagnosis: data.diagnosis,
            tests: data.tests,
            results: data.results,
            action: data.action,
            medication: data.medication,
            comments: data.comments
          };
          visits.push(visit);
        });
        this.setState({visitHistory: visits});
      })
    });
  }

  setTheme(theme) {
    this.setState({theme: theme, colors: tokens(theme.palette.mode)});
  }

  render() {
    const columns = [
      { field: "id", headerName: "ID" },
      {
        field: "description",
        headerName: "Description",
        flex: 1,
      },
      {
        field: "date",
        headerName: "Date",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "veterinarian",
        headerName: "Veterinarian",
        flex: 1,
      },
      {
        field: "diagnosis",
        headerName: "Diagnosis",
        flex: 1,
      },
    ];
    
    
    
    return (
      <Box m="20px">
        
        <Header title="VISIT HISTORY" subtitle="Dog's Visit History at the Vet" />
        <Box
          m="20px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: this.state.colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: this.state.colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: this.state.colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: this.state.colors.blueAccent[700],
            },
          }}
        >
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow sx={{ backgroundColor: this.state.colors.blueAccent[700] }}>
                  <TableCell />
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Veterinarian</TableCell>
                  <TableCell>Diagnosis</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.visitHistory.map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }
}

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "veterinarian",
      headerName: "Veterinarian",
      flex: 1,
    },
    {
      field: "diagnosis",
      headerName: "Diagnosis",
      flex: 1,
    },
  ];

  
  
  
  
  return (
    <Box m="20px">
      <Header title="VISIT HISTORY" subtitle="Dog's Visit History at the Vet" />
      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ backgroundColor: colors.blueAccent[700] }}>
                <TableCell />
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Veterinarian</TableCell>
                <TableCell>Diagnosis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockDataVisitHistory.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default InvoiceTable;
