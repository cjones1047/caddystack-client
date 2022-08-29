import './Header.css'
// import React, { Fragment } from 'react'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

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
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import { Divider } from '@mui/material';

const profileLinkStyle = {
	color: 'black',
	textDecoration: 'none'
}

const authenticatedOptions = [
	{str: 'Change Password', link: 'change-password'},
	{str: 'Logout', link: 'sign-out'}
	
]

const unauthenticatedOptions = [
	{str: 'Sign Up', link: 'sign-up'},
	{str: 'Sign In', link: 'sign-in'}
]

let pages = [
	{ str: 'Find A Course', link: 'find-a-course'},
]

const Header = ({ user }) => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	let navigate = useNavigate()

	useEffect(() => {
		const userOptions = [
			{ str: 'Find A Course', link: 'find-a-course' },
			{ str: 'My Courses', link: 'my-courses' },
			{ str: 'My Tee Times', link: 'my-teetimes' }
		]

		const userNullOptions = [
			{ str: 'Find A Course', link: 'find-a-course' }
		]

		if(user && user._id) {
			pages = userOptions
		} else pages = userNullOptions

	}, [user])

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
					<SportsGolfIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
						CADDYSTACK
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
							{pages.map((page, i) => {
								const pageStr = page.str
								const pageLink = page.link
								return (
									<MenuItem 
										key={i}
										onClick={() => {
											handleCloseNavMenu()
											navigate(`/${pageLink}`, {replace: false})
										}}
										divider={i > (pages.length) - 2 ? false : true}
										style={{width: '70vw', maxWidth: '300px'}}
										>
											<Typography
												textAlign="center"
												// style={profileLinkStyle}
											>
												{pageStr}
											</Typography>
									</MenuItem>
								)
							})}
						</Menu>
					</Box>
					<SportsGolfIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
						CADDYSTACK
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page, i) => {
							const pageStr = page.str
							const pageLink = page.link
							return (
								<Button
									key={i}
									className="appbarButton"
									onClick={() => {
										handleCloseNavMenu()
										navigate(`/${pageLink}`, {replace: false})
									}}
									sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold' }}
								>
									{pageStr}
								</Button>
							)
						})}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open account menu">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt={ user ? user.email : user } src='null'/>
							</IconButton>
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
								<div style={{display: 'flex', justifyContent: 'left', fontWeight: 'bold', margin: '10px', marginLeft: '15px', marginTop: '5px'}}>
									Welcome {user.email}
								</div>
							)}
							{/* {alwaysOptions} */}
							{user ?
								authenticatedOptions.map((option, i) => {
									return (
										<MenuItem
											key={i}
											onClick={() => {
												handleCloseUserMenu()
												navigate(`/${option.link}`, {replace: false})
											}}
										>
												{option.str}
										</MenuItem>
									)
								})
								:
								unauthenticatedOptions.map((option, i) => {
									return (
										<MenuItem
											key={i}
											onClick={() => {
												handleCloseUserMenu()
												navigate(`/${option.link}`, {replace: false})
											}}
										>
												{option.str}
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
