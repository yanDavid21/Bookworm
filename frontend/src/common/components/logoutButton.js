import LogoutIcon from '@mui/icons-material/Logout';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography"; 

async function logoutUser(token) {
    return fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token)
    })
   }

const LogoutButton = ({token, setToken}) => {
    const handleLogout = async e => {
      e.preventDefault();
      setToken({token: null});
      localStorage.removeItem("token");
      await logoutUser({
          token
      });
    }
  
    // if(!token) {
    //   return (
    //     <Navigate to="/"/>
    //   );
    // }
  
    return (
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
              <LogoutIcon></LogoutIcon>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Log Out
                </Typography>
              }
            />
        </ListItem>
      </List>
    );
  }

  export default LogoutButton;