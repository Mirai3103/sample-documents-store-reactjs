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
      <img
        alt="anh"
        src="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.6435-9/167018959_1234469226951266_3674830128936029280_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=0debeb&_nc_ohc=QSoRXxS14qQAX8MR8vW&_nc_ht=scontent.fsgn5-7.fna&oh=00_AT_qIUWMOih-zFGPClyJXOb4iDx5cYLKlWZG1bf5chNFOA&oe=627E7843"
      />
    </Box>
  );
}
