import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material";
import {
   Grid,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { changeMenuState, setActiveNote } from "../../store/journal";

export const SideBarItem = ({ title, id, body, date, imageUrls = [] }) => {
   const dispatch = useDispatch();
   const onSetActiveNote = () => {
      dispatch(setActiveNote({ id, title, body, date, imageUrls }));
      console.log(window.innerWidth);
      if (window.innerWidth <= 600) {
         dispatch(changeMenuState());
      }
   };

   const newTitle = useMemo(() => {
      return title.length > 17 ? title.substring(0, 17) + "..." : title;
   }, [title]);

   return (
      <ListItem disablePadding>
         <ListItemButton onClick={onSetActiveNote}>
            <ListItemIcon>
               <TurnedInNot />
            </ListItemIcon>
            <Grid container>
               <ListItemText primary={newTitle} />
               <ListItemText secondary={body} />
            </Grid>
         </ListItemButton>
      </ListItem>
   );
};
