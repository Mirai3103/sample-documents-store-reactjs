import { Icon } from '@iconify/react';
import { useContext, useEffect, useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import { Slide, Button, ClickAwayListener, TextField, Chip } from '@mui/material';
// components
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { MIconButton } from '../../components/@material-extend';
import { StoreContext } from '../../store';

// ----------------------------------------------------------------------
import { setAllTags, setSearchData } from '../../store/reducer';
import { BASE_URL } from '../../config';
// ----------------------------------------------------------------------
const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: 'auto',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.9)}`,
  [theme.breakpoints.up('md')]: {
    height: 'auto',
    padding: theme.spacing(0, 5)
  }
}));
export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [tagState, dispatch] = useContext(StoreContext).data;
  useEffect(() => {
    fetch(`${BASE_URL}/tag`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setAllTags(data));
      })
      .catch((e) => {
        console.log(e);
        console.log('Load data from server failed');
        dispatch(setSearchData([]));
      });
  }, [dispatch]);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  let selectedTags = [];
  const handleClose = () => {
    // if (e.target.innerText.trim() === 'Search') {
    //   axios
    //     .post('http://localhost:8081/api', {
    //       tags: selectedTags
    //     })
    //     .then((response) => console.log(response.data))
    //     .catch((error) => console.log(error));
    // }
    setOpen(false);
  };
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const handleSearch = (e) => {
    if (e.target.innerText.trim() === 'Search') {
      setButtonDisabled(true);
      axios
        .post(`${BASE_URL}/api`, {
          tags: selectedTags
        })
        .then((response) => {
          dispatch(setSearchData(response.data));
          console.log('Search success');
          navigate('/search');
          handleClose(e);
          setButtonDisabled(false);
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <div>
          {!isOpen && (
            <MIconButton onClick={handleOpen}>
              <Icon icon={searchFill} width={20} height={20} />
            </MIconButton>
          )}

          <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
            <SearchbarStyle>
              <Autocomplete
                onChange={(e, value) => {
                  selectedTags = value;
                }}
                sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
                autoFocus
                fullWidth
                multiple
                id="tags-filled"
                options={tagState.allTags}
                getOptionLabel={(option) => option.tag_name}
                // defaultValue={}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={index} variant="outlined" label={option.tag_name} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="filled" label="Search with tags name" placeholder="Nh???p tag" />
                )}
              />
              <Button variant="contained" onClick={handleSearch} disabled={buttonDisabled}>
                Search
              </Button>
            </SearchbarStyle>
          </Slide>
        </div>
      </ClickAwayListener>
    </>
  );
}
