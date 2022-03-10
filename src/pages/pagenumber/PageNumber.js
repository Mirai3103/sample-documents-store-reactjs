import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Style.css';
import { useContext } from 'react';
import { StoreContext } from '../../store';
import { setData } from '../../store/reducer';
// eslint-disable-next-line react/prop-types
export default function BasicPagination({ searchParams, pageCount, setSearchParam }) {
  const [, dispatch] = useContext(StoreContext).data;
  return (
    <Stack spacing={2}>
      <Pagination
        color="primary"
        page={Number(searchParams.get('page'))}
        size="medium"
        count={Number(pageCount)}
        onChange={(e, page) => {
          setSearchParam({ page: `${page}` });
          dispatch(setData([]));
        }}
      />
    </Stack>
  );
}
