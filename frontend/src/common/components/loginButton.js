import LoginIcon from '@mui/icons-material/Login';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography"; 
import { Link } from "react-router-dom";

const LoginButton = () => {
  
    return (
      <List>
          <Link to="/login" className="no-text-decoration">
        <ListItem button>
          <ListItemIcon>
              <LoginIcon></LoginIcon>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Log In
                </Typography>
              }
            />
        </ListItem>
        </Link>
      </List>
    );
  }

  export default LoginButton;