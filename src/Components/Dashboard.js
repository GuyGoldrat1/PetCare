import React from 'react';
import { AppBar, Box, Container, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Paper, Grid, Avatar, Badge } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChaseImage from '../assests/chase-white.png';
import BackgroundImage from '../assests/back.png';

const drawerWidth = 240;

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const sectionTitleStyle = {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom center',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
  };

  const fontStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '20px',
  };

  const labelStyle = {
    fontSize: '22px',
    fontWeight: 'bold'
  };

  const dataStyle = {
    fontSize: '22px'
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarStyled position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBarStyled>
        <DrawerStyled variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            {/* Add more items here */}
          </List>
          <Divider />
        </DrawerStyled>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ ...fontStyle, backgroundColor: '#ffffff', padding: '20px' }}>
              <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h4" sx={sectionTitleStyle}>
                  Pet Health Record
                </Typography>
                <Grid container spacing={3} mt={2}>
                  <Grid item xs={12} md={8}>
                    <Paper elevation={1} sx={{ padding: '10px' }}>
                      <Typography variant="h5" sx={sectionTitleStyle}>
                        Pet Information
                      </Typography>
                      <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} md={4}>
                          <Avatar src={ChaseImage} alt="Chase" sx={{ width: '100%', height: 'auto' }} />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography sx={labelStyle}>Pet Name:</Typography>
                              <Typography sx={dataStyle}>Chase</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={labelStyle}>Gender:</Typography>
                              <Typography sx={dataStyle}>Male</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={labelStyle}>Pet Age:</Typography>
                              <Typography sx={dataStyle}>13</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={labelStyle}>Weight:</Typography>
                              <Typography sx={dataStyle}>20 kg</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={labelStyle}>Birth Date:</Typography>
                              <Typography sx={dataStyle}>21/07/2011</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={labelStyle}>Breed:</Typography>
                              <Typography sx={dataStyle}>Beagle</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper elevation={1} sx={{ padding: '10px' }}>
                      <Typography variant="h5" sx={sectionTitleStyle}>
                        Health Concerns
                      </Typography>
                      <Grid container spacing={2} mt={2}>
                        <Grid item xs={12}>
                          <Typography sx={labelStyle}>Allergies:</Typography>
                          <Typography sx={dataStyle}>None</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography sx={labelStyle}>Existing Conditions:</Typography>
                          <Typography sx={dataStyle}>None</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography sx={labelStyle}>Veterinarian:</Typography>
                          <Typography sx={dataStyle}>Dr. Smith</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>

                <Paper elevation={1} sx={{ padding: '10px', marginTop: '20px' }}>
                  <Typography variant="h5" sx={sectionTitleStyle}>
                    Owner's Information
                  </Typography>
                  <Grid container spacing={2} mt={2}>
                    <Grid item xs={6}>
                      <Typography sx={labelStyle}>Name:</Typography>
                      <Typography sx={dataStyle}>Elad Kadosh</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={labelStyle}>Phone:</Typography>
                      <Typography sx={dataStyle}>054-7870214</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={labelStyle}>Address:</Typography>
                      <Typography sx={dataStyle}>Hagalil 91, Ganey Tikva</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Paper>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

