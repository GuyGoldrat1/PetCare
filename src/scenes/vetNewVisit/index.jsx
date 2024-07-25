import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuickSearchToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarQuickFilter />
  </GridToolbarContainer>
);

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  const handleRowSelection = (selectionModel) => {
    const selectedId = selectionModel[0];
    const selectedData = mockDataContacts.find(row => row.id === selectedId);
    setSelectedRow(selectedData);
  };

  const handleButtonClick = () => {
    if (selectedRow) {
      navigate('/vet/clientrecord', { state: { clientName: selectedRow.name } });
    }
  };

  return (
    <Box m="15px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="0 0 0"
        height="60vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[500],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: QuickSearchToolbar }}
          onSelectionModelChange={handleRowSelection}
        />
      </Box>
      <Box m="20px 0" display="flex" justifyContent="right">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleButtonClick}
          sx={{
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Select client
        </Button>
      </Box>
    </Box>
  );
};

export default Contacts;
