import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img alt="anh" src="https://cdn.discordapp.com/avatars/727213979482587176/f02c49ffc7b16908bef3ddcbcbcc0aae.png" />
    </Box>
  );
}
