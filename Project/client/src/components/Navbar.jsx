import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        Blog <span style={{ color: '#FFD600' }}>App</span>
      </Typography>
      <Divider />
      <List>
        {token ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/create" sx={{ textAlign: 'center' }}>
                <ListItemText primary="Create Blog" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/my-blogs" sx={{ textAlign: 'center' }}>
                <ListItemText primary="My Blogs" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ textAlign: 'center' }}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login" sx={{ textAlign: 'center' }}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/signup" sx={{ textAlign: 'center' }}>
                <ListItemText primary="Signup" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ background: '#1976d2' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'white',
              fontWeight: 800,
              letterSpacing: 1,
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Blog <span style={{ color: '#FFD600' }}>App</span>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {token ? (
              <>
                <Button
                  component={Link}
                  to="/create"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    marginRight: 2,
                    background: '#1565c0',
                    '&:hover': { background: '#0d47a1' }
                  }}
                  variant="contained"
                >
                  Create Blog
                </Button>
                <Button
                  component={Link}
                  to="/my-blogs"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    marginRight: 2,
                    background: '#00897b',
                    '&:hover': { background: '#00695c' }
                  }}
                  variant="contained"
                >
                  My Blogs
                </Button>
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    background: '#FF6D00',
                    '&:hover': { background: '#E65100' }
                  }}
                  variant="contained"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    marginRight: 2,
                    background: '#1565c0',
                    '&:hover': { background: '#0d47a1' }
                  }}
                  variant="contained"
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    color: '#1565c0',
                    fontWeight: 600,
                    background: '#FFD600',
                    '&:hover': { background: '#FFEA00' }
                  }}
                  variant="contained"
                >
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* This Toolbar acts as a spacer for the fixed AppBar */}
      <Toolbar />

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </React.Fragment>
  );
}
