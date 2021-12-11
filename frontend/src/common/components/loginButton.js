import LoginIcon from '@mui/icons-material/Login';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography"; 
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginButton = ({ setHistory }) => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setHistory(location.pathname);
    navigate('/login');
  }

    return (
      <List>
          <Link to="/login" className="no-text-decoration">
        <ListItem button onClick={handleLogin}>
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