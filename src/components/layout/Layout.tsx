import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Divider,
    Avatar,
    Menu,
    MenuItem,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Work as WorkIcon,
    School as SchoolIcon,
    ExitToApp as LogoutIcon,
    AccountCircle as AccountIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../store/slices/authSlice";
import {
    clearError as clearMiniprojectError,
    clearCurrentMiniproject,
} from "../../store/slices/miniprojectSlice";

const drawerWidth = 240;

export default function Layout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Clear miniproject state
        dispatch(clearMiniprojectError());
        dispatch(clearCurrentMiniproject());

        // Logout
        dispatch(logout());
        navigate("/login");
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    UMS
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItemButton component={NavLink} to="/" end>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tableau de bord" />
                </ListItemButton>

                {/* <ListItemButton component={NavLink} to="/miniprojects">
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Miniprojets" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="/thesis">
                    <ListItemIcon>
                        <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mémoires" />
                </ListItemButton> */}

                <ListItemButton component={NavLink} to="/students">
                    <ListItemIcon>
                        <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="Étudiants" />
                </ListItemButton>
                <ListItemButton component={NavLink} to="/miniprojects">
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Miniprojets" />
                </ListItemButton>
                <ListItemButton component={NavLink} to="/memoires">
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mémoires" />
                </ListItemButton>
                <ListItemButton component={NavLink} to="/documents">
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Documents" />
                </ListItemButton>
                <ListItemButton component={NavLink} to="/notifications">
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                </ListItemButton>
                <ListItemButton component={NavLink} to="/soutenances">
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Soutenances" />
                </ListItemButton>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Système de Gestion des Besoins Estudiantins
                    </Typography>
                    {user && (
                        <>
                            <IconButton
                                size="large"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountIcon />
                                <Typography sx={{ ml: 1 }}>
                                    {user.firstName} {user.lastName}
                                </Typography>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    Mon profil
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <LogoutIcon sx={{ mr: 1 }} />
                                    Déconnexion
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
