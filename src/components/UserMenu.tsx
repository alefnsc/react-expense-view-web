import { IconButton, Icon, Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { signOutEndpoint } from "../services/backend";
import { useAuthContext } from "../hooks/authContext";
import { IUser } from "../types/userType";

export function UserMenu({ onSignIn }: { onSignIn: (user: IUser) => void }) {
  const { user } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function signOut() {
    await signOutEndpoint();
    onSignIn(null);
  }

  return (
    <div className="fixed top-0 right-0 pr-20">
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar>
          <Icon>{user.nome}</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.nome}</div>
          <small>{user.email}</small>
        </div>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
