import { Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { CloseOutlined, TurnedInNot } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';
import { changeMenuState } from '../../store/journal';

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } =  useSelector( state => state.auth )
    const { notes } = useSelector( state => state.journal )
    const { displayedMenu } = useSelector( state => state.journal )
       
    const dispatch = useDispatch();

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{ 
                    display:  displayedMenu ? 'block' : 'none'  ,
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        { displayName }
                    </Typography>
                    <IconButton
                        onClick={()=>dispatch( changeMenuState() )}
                        sx={{ display: { md: 'none' } }}
                    >
                        <CloseOutlined />
                    </IconButton>
                </Toolbar>
                <Divider />

                <List
                    
                >
                    {
                        notes.map( note => (
                            <SideBarItem key={ note.id } { ...note } />
                        ))
                    }
                </List>
                
            </Drawer>

        </Box>
    )
}
