import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Description } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/client';

import logoNameWhite from '@assets/logo-name-white.png';
import Link from 'next/link';
import Login from 'src/pages/login';
import { NavLink } from './NavLink';
import { SxProps } from '@mui/system';

const drawerWidth = 240;

const headerHeight = '64px';

const menuNavigation = [
  {
    name: 'Projects',
    path: '/projects',
    icon: <Description />,
  },
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: 'nowrap',
//   boxSizing: 'border-box',
//   ...(open && {
//     ...openedMixin(theme),
//     '& .MuiDrawer-paper': openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     '& .MuiDrawer-paper': closedMixin(theme),
//   }),
// }));

// type LayoutProps = {
//   children: React.ReactNode;
// };

// export function Layout({ children }: LayoutProps) {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [session] = useSession();

//   const openDrawer = () => {
//     setOpen(true);
//   };

//   const closeDrawer = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={openDrawer}
//             edge="start"
//             sx={{
//               marginRight: '36px',
//               ...(open && { display: 'none' }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Box display="flex" justifyContent="space-between" width="100%">
//             <Typography variant="h6" noWrap component="div">
//               Mini variant drawer
//             </Typography>
//             <Box display="flex" alignItems="center" columnGap="1rem">
//               <Avatar alt={session.user.name} src={session.user.image} />
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={() => signOut()}
//               >
//                 Sign Out
//               </Button>
//             </Box>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={closeDrawer}>
//             {theme.direction === 'rtl' ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {menuNavigation.map((menuItem, index) => (
//             <Link key={menuItem.name} href={menuItem.path} passHref>
//               <a>
//                 <ListItem button>
//                   <ListItemIcon>{menuItem.icon}</ListItemIcon>
//                   <ListItemText primary={menuItem.name} />
//                 </ListItem>
//               </a>
//             </Link>
//           ))}
//         </List>
//       </Drawer>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, p: 3, display: 'flex', paddingTop: '88px' }}
//       >
//         <DrawerHeader />
//         {children}
//       </Box>
//     </Box>
//   );
// }

type LayoutCenterProps = {
  children: React.ReactNode;
  variant?: 'center' | 'default';
};

export function Layout({ children, variant = 'default' }: LayoutCenterProps) {
  const [session] = useSession();

  const centerLayout: SxProps =
    variant === 'center'
      ? { alignItems: 'center', justifyContent: 'center' }
      : {};

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h6" noWrap component="div">
              UNIT.e
            </Typography>
            <Box display="flex" alignItems="center" columnGap="1rem">
              {!!session && (
                <>
                  <Avatar alt={session.user?.name} src={session.user?.image} />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      signOut({
                        callbackUrl: `${window.location.origin}/login`,
                      })
                    }
                  >
                    Sair
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          marginTop: headerHeight,
          padding: '2rem',
          ...centerLayout,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
