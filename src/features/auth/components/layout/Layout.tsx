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
} from "@mui/material";
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Work as WorkIcon,
    School as SchoolIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function Layout() {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((o) => !o);
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={toggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        University Management System
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer open={open} onClose={toggle}>
                <Box sx={{ width: 240 }} role="presentation" onClick={toggle}>
                    <List>
                        <ListItemButton component={NavLink} to="/">
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>

                        <ListItemButton component={NavLink} to="/miniprojects">
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
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>

            {/* page content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
