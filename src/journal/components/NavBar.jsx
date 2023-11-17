import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { HomeRounded, LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';
import { changeMenuState, setActiveNote } from '../../store/journal';

export const NavBar = ({ drawerWidth = 240 }) => {
    const dispatch= useDispatch();
    const onLogout = () => { 
        dispatch( startLogout() );
    };

    return (
        <AppBar 
            position='fixed'
            sx={{ 
                width: { sm: `calc(100% - ${ drawerWidth }px)` },
                ml: { sm: `${ drawerWidth }px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    onClick={()=>dispatch( changeMenuState() )}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> JournalApp </Typography>
                    <IconButton
                        onClick={()=>dispatch( setActiveNote(null) )}
                    >
                        <HomeRounded 
                            color='white'
                        />
                    </IconButton>
                    <IconButton 
                        color='error'
                        onClick={ onLogout }
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
};
