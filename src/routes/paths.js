// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '';

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    pageOne: path(ROOTS_DASHBOARD, '/1'),
    pageTwo: path(ROOTS_DASHBOARD, '/2'),
    pageThree: path(ROOTS_DASHBOARD, '/3'),
    pageFour: path(ROOTS_DASHBOARD, '/4'),
    pageFive: path(ROOTS_DASHBOARD, '/5'),
    pageSix: path(ROOTS_DASHBOARD, '/6'),
    login: path(ROOTS_DASHBOARD, '/login')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    storePage: path(ROOTS_DASHBOARD, '/user/StorePage')
    // pageFive: path(ROOTS_DASHBOARD, '/app/five'),
    // pageSix: path(ROOTS_DASHBOARD, '/app/six')
  }
};
