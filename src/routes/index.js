import { Suspense, lazy, useContext } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts

import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import { StoreContext } from '../store';
// IMPORT COMPONENTS
import SearchPage from '../pages/SearchPage';
// Dashboard

// ----------------------------------------------------------------------
const data = [];
const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component data={data} {...props} />
    </Suspense>
  );
};

export default function Router() {
  const [storeState, dispatch] = useContext(StoreContext).data;
  const allTagsChill = storeState.allTags.map((tag) => ({
    path: `${tag.tag_id}`,
    element: <PageTag key={tag.tag_id} id={tag.tag_id} title="Trending" />
  }));
  // console.log(allTagsChill);
  return useRoutes([
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home" replace /> },
        { path: 'home', element: <PageHome /> },
        { path: '1', element: <PageTag id={1} title="cho wibu" /> },
        { path: '2', element: <PageTag id={2} title="Chửi nhau" /> },
        { path: '3', element: <PageTag id={3} title="Khiến người khác khó chịu" /> },
        { path: '4', element: <PageTag id={4} title="Văn học & nghệ thuật" /> },
        { path: '5', element: <PageTag id={5} title="Bày tỏ cảm xúc" /> },
        { path: '6', element: <PageTag id={6} title="Trending" /> },
        // { path: 'advancedSearch', element: <PageFour /> },
        {
          path: 'app',
          children: [{ element: <Navigate to="/app/four" replace /> }, ...allTagsChill]
        },
        { path: 'search', element: <SearchPage /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

const PageHome = Loadable(lazy(() => import('../pages/PageHome')));
const PageTag = Loadable(lazy(() => import('../pages/PageTag')));
// const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
// const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
// const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
// const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
// const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Main
// const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
