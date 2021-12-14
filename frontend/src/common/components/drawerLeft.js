import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PendingIcon from "@mui/icons-material/Pending";
import LogoutButton from "./logoutButton";
import LoginButton from "./loginButton";
import HomeIcon from '@mui/icons-material/Home';
import PolicyIcon from '@mui/icons-material/Policy';

const listOfTabs = [
  { title: "Reading List", path: "#readingList", icon: <PlaylistAddIcon /> },
  { title: "In Progress List", path: "#inProgressList", icon: <PendingIcon /> },
  { title: "Finished List", path: "#finishedList", icon: <AssignmentTurnedInIcon /> },
];

const PermanentDrawerLeft = ({ drawerWidth, token, setToken, setHistory, setPrivacyOpen, userType, setUserType}) => {
  const handlePolicy = (e) => {
    e.preventDefault();
    setPrivacyOpen(true);
  }
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
      className="drawer"
    >
      <Link to="/" className="no-text-decoration">
      <Toolbar className="header">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0.5 }}
          >
            <MenuBookIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Bookworm
          </Typography>
      </Toolbar>
      </Link>
      <Divider />
      <List>
        <Link to="/home" className="no-text-decoration">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon></HomeIcon>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Home
                </Typography>
              }
            />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/search" className="no-text-decoration">
          <ListItem button>
            <ListItemIcon>
              <SearchIcon></SearchIcon>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Search
                </Typography>
              }
            />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {token && userType === 'paid'? <div>
        <List>
        {listOfTabs.map((tab, index) => (
          <Link to={`/profile${tab.path}`} className="no-text-decoration">
            <ListItem button key={tab.title}>
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {tab.title}
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        ))}
      </List> 
      <Divider/>
      </div>
      : <></>}
      {token && userType === 'free'? <div>
        <List>
      <Link to='/profile#to-read' className="no-text-decoration">
            <ListItem button key="Reading List">
              <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Reading List
                  </Typography>
                }
              />
            </ListItem>
          </Link>
          </List>
          <Divider/>
      </div> : <></>
      }
      <List>
          <ListItem button onClick={handlePolicy}>
            <ListItemIcon>
              <PolicyIcon></PolicyIcon>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Privacy
                </Typography>
              }
            />
          </ListItem>
      </List>
      <Divider />
      {token ? <LogoutButton token={token} setToken={setToken} setUserType={setUserType}/> : <LoginButton setHistory={setHistory}/>}
    </Drawer>
  );
};

export default PermanentDrawerLeft;
