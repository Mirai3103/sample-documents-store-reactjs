import { Icon } from '@iconify/react';
import { useContext, useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { useNavigate } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Avatar, Box, Button, Divider, MenuItem, Typography } from '@mui/material';
// components
import { MIconButton } from '../../components/@material-extend';
import MenuPopover from '../../components/MenuPopover';
import { AuthContext } from '../../contexts/AuthProvider';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  { id: 1, label: 'Home', icon: homeFill, linkTo: '/home' },
  { id: 2, label: 'Kho lưu trữ', icon: personFill, linkTo: 'https://facebook.com/mirai1309' },
  { id: 3, label: 'Góp ý', icon: settings2Fill, linkTo: '#' }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const AuthData = useContext(AuthContext);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (id) => {
    switch (id) {
      case 1:
        navigate('/home');
        break;
      case 2:
        alert('Đang phát triển');
        // window.open('https://facebook.com/mirai1309');
        break;
      case 3:
        break;
      default:
        break;
    }
    handleClose();
  };
  const handleLogin = () => {
    navigate('/login');
  };
  return AuthData.user.displayName === undefined ? (
    <Box sx={{ p: 2, pt: 1.5 }}>
      <Button fullWidth color="secondary" variant="outlined" onClick={handleLogin}>
        Log in
      </Button>
    </Box>
  ) : (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar alt="My Avatar" src={AuthData.user.photoURL} />
      </MIconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {AuthData.user.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {AuthData.user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.id}
            // to="#"
            // component={RouterLink}
            onClick={() => handleClick(option.id)}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
