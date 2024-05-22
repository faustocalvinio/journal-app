import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { startNewNote } from "../../store/journal/thunks";
import { useEffect } from "react";
import { changeMenuState } from "../../store/journal";

export const JournalPage = () => {
   const dispatch = useDispatch();
   const { isSaving, active = "" } = useSelector((state  ) => state.journal);

   const onClickNewNote = () => {
      dispatch(startNewNote());
   };

   useEffect(() => {
      console.log(`${window.innerWidth} size of the window ?? change to viewport !!`);
      if (window.innerWidth < 600) {
         dispatch(changeMenuState());
      }
   }, [window.innerWidth]);

   return (
      <JournalLayout>
         {!!active ? <NoteView /> : <NothingSelectedView />}

         <IconButton
            onClick={onClickNewNote}
            disabled={isSaving}
            size="large"
            sx={{
               color: "white",
               backgroundColor: "error.main",
               ":hover": { backgroundColor: "error.main", opacity: 0.9 },
               position: "fixed",
               right: 50,
               bottom: 50,
            }}
         >
            <AddOutlined sx={{ fontSize: 30 }} />
         </IconButton>
      </JournalLayout>
   );
};
