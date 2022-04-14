import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Avatar, Drawer, Tooltip, CardActionArea, Button } from '@mui/material';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import LogoOwn from '../../components/LogoOwn';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import { MHidden } from '../../components/@material-extend';
import sidebarConfig from './SidebarConfig';
import DialogForm from './DialogForm';
import { AuthContext } from '../../contexts/AuthProvider';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}));

// ----------------------------------------------------------------------

IconCollapse.propTypes = {
  onToggleCollapse: PropTypes.func,
  collapseClick: PropTypes.bool
};

function IconCollapse({ onToggleCollapse, collapseClick }) {
  return (
    <Tooltip title="Mini Menu">
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          width: 18,
          height: 18,
          display: 'flex',
          cursor: 'pointer',
          borderRadius: '50%',
          alignItems: 'center',
          color: 'text.primary',
          justifyContent: 'center',
          border: 'solid 1px currentColor',
          ...(collapseClick && {
            borderWidth: 2
          })
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            transition: (theme) => theme.transitions.create('all'),
            ...(collapseClick && {
              width: 0,
              height: 0
            })
          }}
        />
      </CardActionArea>
    </Tooltip>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};
export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const AuthData = useContext(AuthContext);

  const handleClickOpenFormDialog = () => {
    if (AuthData.user.uid === undefined) {
      alert('vui long dang nhap');
      navigate('/login');
    } else {
      setOpenFormDialog(true);
    }
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };
  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center'
          })
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <LogoOwn />
          </Box>

          <MHidden width="lgDown">
            {!isCollapse && <IconCollapse onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />}
          </MHidden>
        </Stack>

        {isCollapse ? (
          <Avatar
            alt="My Avatar"
            src="https://cand.com.vn/Files/Image/vanduc/2019/09/19/thumb_660_50ba9355-64a3-41d1-a2ff-dfcad5812014.jpg"
            sx={{ mx: 'auto', mb: 2 }}
          />
        ) : (
          <Button variant="contained" onClick={handleClickOpenFormDialog} to="#">
            Đóng góp văn mẫu
          </Button>
        )}
      </Stack>
      <DialogForm
        openFormDialog={openFormDialog}
        handleCloseFormDialog={handleCloseFormDialog}
        uid={AuthData.user.uId}
      />
      <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH
        },
        ...(collapseClick && {
          position: 'absolute'
        })
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88)
              })
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
