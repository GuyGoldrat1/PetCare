// src/components/TopRightIcons.js
import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Notifications, Settings, LightMode, DarkMode, Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import './TopRightIcons.css'; // Import the CSS file

const TopRightIcons = () => {
  const { logout, currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = () => {
    setNotificationsOpen(true);
  };

  const handleNotificationsClose = () => {
    setNotificationsOpen(false);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  return (
    <Box className="top-right-icons">
      <IconButton color="inherit" onClick={handleNotificationsOpen}>
        <Notifications />
      </IconButton>
      <IconButton color="inherit" onClick={handleSettingsOpen}>
        <Settings />
      </IconButton>
      <Tooltip title="Account settings">
        <IconButton color="inherit" onClick={handleMenu}>
          <Avatar src={currentUser?.photoURL} alt="Account" />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={logout}>
          <Logout fontSize="small" />
          Logout
        </MenuItem>
      </Menu>
      <Dialog open={notificationsOpen} onClose={handleNotificationsClose}>
        <DialogTitle>Notifications</DialogTitle>
        <DialogContent>
          {/* Add notification content here */}
          No new notifications.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotificationsClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={settingsOpen} onClose={handleSettingsClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          {/* Add settings content here */}
          No settings available.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TopRightIcons;
