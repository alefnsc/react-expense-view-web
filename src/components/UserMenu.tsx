import { IconButton, Icon, Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { signOutEndpoint } from "../services/backend";
import { useAuthContext } from "../hooks/authContext";

export function UserMenu() {
  const { user, onSignOut } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    signOutEndpoint();
    onSignOut();
  }

  return (
    <div className=" absolute top-0  right-0 border-b w-full">
      <IconButton
        className=" float-right"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar className="absolute sm:right-10 md:right-20 lg:right-40">
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
        <div className="px-10 py-5 flex flex-col flex-1 justify-center items-center">
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div className="pt-4">{user.nome}</div>
          <small>{user.email}</small>
        </div>
        <MenuItem
          className=" flex flex-col flex-1 justify-center items-center"
          onClick={signOut}
        >
          Sair
        </MenuItem>
      </Menu>
    </div>
  );
}
