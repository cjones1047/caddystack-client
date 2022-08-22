import './Header.css'
// import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

// import * as React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// import Badge from '@mui/material/Badge';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import MoreIcon from '@mui/icons-material/MoreVert';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Logout from '@mui/icons-material/Logout';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const profileLinkStyle = {
	color: 'black',
	textDecoration: 'none'
}

const pagesLinkStyle = {
	color: 'white',
	textDecoration: 'none'
}

const authenticatedOptions = [
	<Link to='change-password' style={profileLinkStyle}>
		Change Password
	</Link>,
	<Link to='sign-out' style={profileLinkStyle}>
		Logout
	</Link>
]

const unauthenticatedOptions = [
	<Link to='sign-up' style={profileLinkStyle}>
		Sign Up
	</Link>,
	<Link to='sign-in' style={profileLinkStyle}>
		Sign In
	</Link>
]

const pages = [
	// <Link to='/'>
	// 	Home
	// </Link>,
	{ str: 'Home', link: '/'}
]

// const Search = styled('div')(({ theme }) => ({
// 	position: 'relative',
// 	borderRadius: theme.shape.borderRadius,
// 	backgroundColor: alpha(theme.palette.common.white, 0.15),
// 	'&:hover': {
// 		backgroundColor: alpha(theme.palette.common.white, 0.25),
// 	},
// 	marginRight: theme.spacing(2),
// 	marginLeft: 0,
// 	width: '100%',
// 	[theme.breakpoints.up('sm')]: {
// 		marginLeft: theme.spacing(3),
// 		width: 'auto',
// 	},
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
// 	padding: theme.spacing(0, 2),
// 	height: '100%',
// 	position: 'absolute',
// 	pointerEvents: 'none',
// 	display: 'flex',
// 	alignItems: 'center',
// 	justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
// 	color: 'inherit',
// 	'& .MuiInputBase-input': {
// 		padding: theme.spacing(1, 1, 1, 0),
// 		// vertical padding + font size from searchIcon
// 		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// 		transition: theme.transitions.create('width'),
// 		width: '100%',
// 		[theme.breakpoints.up('md')]: {
// 			width: '20ch',
// 		},
// 	},
// }));

// export default function Header({ user }) {
// 	const [anchorEl, setAnchorEl] = React.useState(null);
// 	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

// 	const isMenuOpen = Boolean(anchorEl);
// 	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

// 	const handleProfileMenuOpen = (event) => {
// 		setAnchorEl(event.currentTarget);
// 	};

// 	const handleMobileMenuClose = () => {
// 		setMobileMoreAnchorEl(null);
// 	};

// 	const handleMenuClose = () => {
// 		setAnchorEl(null);
// 		handleMobileMenuClose();
// 	};

// 	const handleMobileMenuOpen = (event) => {
// 		setMobileMoreAnchorEl(event.currentTarget);
// 	};

// 	const menuId = 'primary-search-account-menu';
// 	const renderMenu = (
// 		<Menu
// 			anchorEl={anchorEl}
// 			anchorOrigin={{
// 				vertical: 'top',
// 				horizontal: 'right',
// 			}}
// 			id={menuId}
// 			keepMounted
// 			transformOrigin={{
// 				vertical: 'top',
// 				horizontal: 'right',
// 			}}
// 			open={isMenuOpen}
// 			onClose={handleMenuClose}
// 		>
			
// 			{user && (
// 				<MenuItem>Welcome {user.email}</MenuItem>
// 			)}
// 			{/* {alwaysOptions} */}
// 			{user ? 
// 				authenticatedOptions.map(option => {
// 					return (
// 						<MenuItem onClick={handleMenuClose}>
// 							{ option }
// 						</MenuItem>
// 					)
// 				}) 
// 				: 
// 				unauthenticatedOptions.map(option => {
// 					return (
// 						<MenuItem onClick={handleMenuClose}>
// 							{ option }
// 						</MenuItem>
// 					)
// 				}) 
// 			}
// 			{/* <MenuItem onClick={handleMenuClose}>
// 				<Link to='sign-in' style={profileLinkStyle}>Sign In</Link>
// 			</MenuItem> */}
// 		</Menu>
// 	);

// 	const mobileMenuId = 'primary-search-account-menu-mobile';
// 	const renderMobileMenu = (
// 		<Menu
// 			anchorEl={mobileMoreAnchorEl}
// 			anchorOrigin={{
// 				vertical: 'top',
// 				horizontal: 'right',
// 			}}
// 			id={mobileMenuId}
// 			keepMounted
// 			transformOrigin={{
// 				vertical: 'top',
// 				horizontal: 'right',
// 			}}
// 			open={isMobileMenuOpen}
// 			onClose={handleMobileMenuClose}
// 		>
// 			<MenuItem>
// 				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
// 					<Badge badgeContent={4} color="error">
// 						<MailIcon />
// 					</Badge>
// 				</IconButton>
// 				<p>Messages</p>
// 			</MenuItem>
// 			<MenuItem>
// 				<IconButton
// 					size="large"
// 					aria-label="show 17 new notifications"
// 					color="inherit"
// 				>
// 					<Badge badgeContent={17} color="error">
// 						<NotificationsIcon />
// 					</Badge>
// 				</IconButton>
// 				<p>Notifications</p>
// 			</MenuItem>
// 			{/* <MenuItem onClick={handleProfileMenuOpen}>
// 				<IconButton
// 					size="large"
// 					aria-label="account of current user"
// 					aria-controls="primary-search-account-menu"
// 					aria-haspopup="true"
// 					color="inherit"
// 				>
// 					<AccountCircle />
// 				</IconButton>
// 				<p>Profile</p>
// 			</MenuItem> */}
// 		</Menu>
// 	);

// 	return (
// 		<Box sx={{ flexGrow: 1 }}>
// 			<AppBar position="static" style={{backgroundColor: 'rgba(10, 10, 10, 0.5)'}}>
// 				<Toolbar>
// 					{/* <IconButton
// 						size="large"
// 						edge="start"
// 						color="inherit"
// 						aria-label="open drawer"
// 						sx={{ mr: 2 }}
// 					>
// 						<MenuIcon />
// 					</IconButton> */}
// 					<Typography
// 						variant="h6"
// 						noWrap
// 						component="div"
// 						sx={{ display: { xs: 'none', sm: 'block' } }}
// 					>
// 						MUI
// 					</Typography>
// 					<Box sx={{ flexGrow: 1 }} />
// 					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
// 						<IconButton size="large" aria-label="show 4 new mails" color="inherit">
// 							<Badge badgeContent={4} color="error">
// 								<MailIcon />
// 							</Badge>
// 						</IconButton>
// 						<IconButton
// 							size="large"
// 							aria-label="show 17 new notifications"
// 							color="inherit"
// 						>
// 							<Badge badgeContent={17} color="error">
// 								<NotificationsIcon />
// 							</Badge>
// 						</IconButton>
// 						<IconButton
// 							size="large"
// 							edge="end"
// 							aria-label="account of current user"
// 							aria-controls={menuId}
// 							aria-haspopup="true"
// 							onClick={handleProfileMenuOpen}
// 							color="inherit"
// 						>
// 							<AccountCircle />
// 						</IconButton>
// 					</Box>
// 					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
// 						<IconButton
// 							size="large"
// 							aria-label="show more"
// 							aria-controls={mobileMenuId}
// 							aria-haspopup="true"
// 							onClick={handleMobileMenuOpen}
// 							color="inherit"
// 						>
// 							<MoreIcon />
// 						</IconButton>
// 						{renderMobileMenu}
// 					</Box>
// 				</Toolbar>
// 			</AppBar>
			
// 			{renderMenu}
// 		</Box>
// 	);
// }


/////////////////////////////////////////////////////////////////////


// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = ({ user }) => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" style={{backgroundColor: 'rgba(10, 10, 10, 0.7)'}}>
			<Container maxWidth="">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="h6"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: '',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						TITLE
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{/* {pages.map((page) => (
								<MenuItem key={0} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">Home</Typography>
								</MenuItem>
							))} */}
							{pages.map((page, i) => {
								const pageStr = page.str
								const pageLink = page.link
								return (
									// <Button
									// 	key={i}
									// 	href={pageLink}
									// 	onClick={handleCloseNavMenu}
									// 	sx={{ my: 2, color: 'white', display: 'block' }}
									// >
									// 	{pageStr}
									// </Button>
									<MenuItem 
										key={i}
										onClick={handleCloseNavMenu}
										>
											<Typography textAlign="center">
												<Link to={pageLink} style={profileLinkStyle}>
													{pageStr}
												</Link>
											</Typography>
									</MenuItem>
								)
							})}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="h5"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: '',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						TITLE
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page, i) => {
							const pageStr = page.str
							const pageLink = page.link
							return (
								<Button
									key={i}
									className="appbarButton"
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									<Link className="appbarButton" to={pageLink}>
										{pageStr}
									</Link>
								</Button>
							)
						})}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open account menu">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt={ user ? user.email : user } src='null'/>
							</IconButton>

							{/* <IconButton
								// size="large"
								// edge="end"
								// aria-label="account of current user"
								// aria-controls={menuId}
								// aria-haspopup="true"
								onClick={handleOpenUserMenu}
								color="inherit"
								// sx={{ p: 0}}
							>
								<AccountCircle />
							</IconButton> */}
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{/* {settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))} */}

							{user && (
								<MenuItem>My Account</MenuItem>
							)}
							{/* {alwaysOptions} */}
							{user ?
								authenticatedOptions.map((option, i) => {
									return (
										<MenuItem
											key={i} 
											onClick={handleCloseUserMenu}>
												{option}
										</MenuItem>
									)
								})
								:
								unauthenticatedOptions.map((option, i) => {
									return (
										<MenuItem
											key={i} 
											onClick={handleCloseUserMenu}>
												{option}
										</MenuItem>
									)
								})
							}

						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;



/////////////////////////////////////////////////////////////////////
// const linkStyle = {
//     color: 'white',
//     textDecoration: 'none'
// }
// const authenticatedOptions = (
// 	<>
// 		<Nav.Item>
// 			<Link to='change-password' style={linkStyle}>
// 				Change Password
// 			</Link>
// 		</Nav.Item>
// 		<Nav.Item>
// 			<Link to='sign-out' style={linkStyle}>
// 				Sign Out
// 			</Link>
// 		</Nav.Item>
// 	</>
// )

// const unauthenticatedOptions = (
// 	<>
//         <Nav.Item>
// 		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
//         </Nav.Item>
//         <Nav.Item>
// 		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
//         </Nav.Item>
// 	</>
// )

// const alwaysOptions = (
// 	<>
// 		<Nav.Item>
// 			<Link to='/' style={linkStyle}>
// 				Home
// 			</Link>
// 		</Nav.Item>
// 	</>
// )

// const Header = ({ user }) => (
// 	<Navbar bg='primary' variant='dark' expand='md'>
// 		<Navbar.Brand>
//             <Link to='/' style={linkStyle}>
//                 react-auth-template
//             </Link>
//         </Navbar.Brand>
// 		<Navbar.Toggle aria-controls='basic-navbar-nav' />
// 		<Navbar.Collapse id='basic-navbar-nav'>
// 			<Nav className='ml-auto'>
// 				{user && (
// 					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
// 				)}
// 				{alwaysOptions}
// 				{user ? authenticatedOptions : unauthenticatedOptions}
// 			</Nav>
// 		</Navbar.Collapse>
// 	</Navbar>
// )

// export default Header
