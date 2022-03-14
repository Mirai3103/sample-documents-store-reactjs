import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { useNavigate } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Avatar, Box, Divider, MenuItem, Typography } from '@mui/material';
// components
import { MIconButton } from '../../components/@material-extend';
import MenuPopover from '../../components/MenuPopover';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  { id: 1, label: 'Home', icon: homeFill, linkTo: '/home' },
  { id: 2, label: 'My Profile', icon: personFill, linkTo: 'https://facebook.com/mirai1309' },
  { id: 3, label: 'Góp ý', icon: settings2Fill, linkTo: '#' }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
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
        window.open('https://facebook.com/mirai1309');
        break;
      case 3:
        break;
      default:
        break;
    }
    console.log(id);
    handleClose();
  };

  return (
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
        <Avatar
          alt="My Avatar"
          src="https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/270210023_1416346275430226_6674586463623128825_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=yCVZ7Eyw3usAX90Huhz&_nc_ht=scontent.fsgn5-13.fna&oh=00_AT9J25etbA2TmS5HdDuB80kX2rvj-7qv-YgrCIZb4ItxuQ&oe=622E6114"
        />
      </MIconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            Laffy
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            huuhoag1412@gmail.com
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

        {/* <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box> */}
      </MenuPopover>
    </>
  );
}
