// routes
import AccessibleIcon from '@mui/icons-material/Accessible';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import { PATH_DASHBOARD } from '../../routes/paths';
// components
// ----------------------------------------------------------------------

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Cho wibu', path: PATH_DASHBOARD.general.pageOne, icon: <AccessibleIcon /> },
      { title: 'Chửi nhau', path: PATH_DASHBOARD.general.pageTwo, icon: <ConnectWithoutContactIcon /> },
      {
        title: 'Khiến người khác khó chịu',
        path: PATH_DASHBOARD.general.pageThree,
        icon: <SentimentVeryDissatisfiedIcon />
      },
      { title: 'Văn học và nghệ thuật', path: PATH_DASHBOARD.general.pageFour, icon: <MenuBookIcon /> },
      { title: 'Bày tỏ cảm xúc', path: PATH_DASHBOARD.general.pageFive, icon: <RecordVoiceOverIcon /> },
      { title: 'Trend', path: PATH_DASHBOARD.general.pageSix, icon: <TrendingUpIcon /> }
    ]
  },
  {
    subheader: 'user',
    items: [{ title: 'Kho luu tru', path: PATH_DASHBOARD.user.storePage, icon: <AccessibleIcon /> }]
  }

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'Advanced',
  //   items: [
  //     {
  //       title: 'All Tags',
  //       path: PATH_DASHBOARD.app.root,
  //       icon: <AlignHorizontalLeftIcon />,
  //       children: [
  //         { title: 'Four', path: PATH_DASHBOARD.app.pageFour },
  //         { title: 'Five', path: PATH_DASHBOARD.app.pageFive },
  //         { title: 'Six', path: PATH_DASHBOARD.app.pageSix }
  //       ]
  //     }
  //   ]
  // }
];

export default sidebarConfig;
