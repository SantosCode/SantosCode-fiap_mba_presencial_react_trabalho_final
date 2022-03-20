import React, { ReactElement, useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material"
import {
  Menu as MenuIcon,
} from '@mui/icons-material';
import { styles } from "./header-view.styles"
import { useRouter } from 'next/router';
import { Routes } from '../../../utils/routes';
import Storage from "../../../utils/storage"

interface Props {
  currentRoute: Routes;
  userName?: string;
  lastName?: string;
  title: string;
}

const HeaderView = ({ currentRoute, userName, lastName, title }: Props): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = anchorEl !== null;
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter()
  const storage = new Storage();

  const handleLogout = (): void => {
    storage.removeItem();
    router.replace("/")
  }

  const handleFavoritesItemPress = (): void => {
    handleClose()
    router.push(Routes.FAVORITES)
  }

  const handleHomeItemPress = (): void => {
    handleClose()
    router.push(Routes.HOME)
  }

  const renderMenuItems = (): ReactElement => {
    if (currentRoute === Routes.HOME) {
      return (
        <MenuItem onClick={handleFavoritesItemPress}>Favoritos</MenuItem>
      )
    }

    if (currentRoute === Routes.FAVORITES) {
      return (
        <MenuItem onClick={handleHomeItemPress}>Produtos</MenuItem>
      )
    }

    return (
      <>
        <MenuItem onClick={handleFavoritesItemPress}>Favoritos</MenuItem>
        <MenuItem onClick={handleHomeItemPress}>Produtos</MenuItem>
      </>
    )
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <div style={{
          display: "flex",
          flex: "1",
          alignItems: "center",
        }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {renderMenuItems()}
          </Menu>
          <Typography margin={1}>{title}</Typography>
        </div>
        <div style={styles.headerTrailingContent}>
          <Typography margin={1}>{userName?.split(" ")[0].toLocaleUpperCase()}</Typography>
          <Button color="inherit" onClick={handleLogout}>Sair</Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderView