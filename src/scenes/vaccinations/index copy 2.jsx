import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataVaccinationHistory } from "../../data/mockData"; // updated import
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const VaccinationHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "vacType",
      headerName: "Vaccination Type",
      flex: 1,
    },
    {
      field: "vacDate",
      headerName: "Vaccination Date",
      flex: 1,
    },
    {
      field: "clinic",
      headerName: "Clinic",
      flex: 1,
    },
    {
      field: "ageAtVac",
      headerName: "Age at Vaccination",
      flex: 1,
    },
        {
      field: "price",
      headerName: "Price",
      flex: 1,
    }

  ];

  return (
    <Box m="20px">
      <Header
        title="VACCINATION HISTORY"
        subtitle="List of Vaccinations for Dog"
      />
      <Box
        m="20px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: '1rem'
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontSize: '1.2rem'
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
        <DataGrid
          rows={mockDataVaccinationHistory}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default VaccinationHistory;
