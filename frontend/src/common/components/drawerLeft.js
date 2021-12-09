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

const listOfTabs = [
  { title: "Reading List", path: "#to-read", icon: <PlaylistAddIcon /> },
  { title: "In Progress List", path: "#in-progress", icon: <PendingIcon /> },
  { title: "Finished List", path: "#finished", icon: <AssignmentTurnedInIcon /> },
];

const PermanentDrawerLeft = ({ drawerWidth }) => {
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
    </Drawer>
  );
};

export default PermanentDrawerLeft;
