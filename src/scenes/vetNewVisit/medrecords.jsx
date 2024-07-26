import { Box, Typography, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, Paper, Button } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataVisitHistory } from "../../data/mockData";
import Header from "../../components/Header";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow onClick={() => setOpen(!open)} sx={{
          "&:hover": {
            backgroundColor: "#f5f5f5", // Change this to the color you want
            cursor: "pointer"
          }
        }}>
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
      <TableRow>
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

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const navigate = useNavigate();
  const clientName = location.state?.clientName || "Client"; // Default to "Client" if name is not provided

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

      <Header title={clientName} subtitle="Dog's Visit History at the Vet" />

      <Box m="20px 0" display="flex" justifyContent="left">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/vet/newvisit')}
        >
          Back
        </Button>
      </Box>

        <Box m="20px 0 0 0" height="70vh">
        <Box
          sx={{
            height: '100%',
            overflow: 'auto', // Make the box scrollable
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
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
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
    </Box>
  );
};


export default Invoices;
