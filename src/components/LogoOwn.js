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
        src="https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-9/118566542_1080850618979795_8084277783122173362_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=3dfyJ9Btkm4AX8R-xDQ&_nc_ht=scontent.fdad3-4.fna&oh=00_AT8WetD14S5tk4h8z6P6c45snCztThrbCQvN1LewDypXUw&oe=62F471A0"
      />
    </Box>
  );
}
