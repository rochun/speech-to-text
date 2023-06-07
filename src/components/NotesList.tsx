import { Note } from './Notes';
import List from '@mui/material/List';

interface NotesListProps {
  notes: {[x: string]: any;}[] | null | undefined;
  handleDelete: (note_id: string) => Promise<void>;
  setSelectedNote: React.Dispatch<React.SetStateAction<{[x: string]: any;} | null | undefined>>;
  selectedNote: {[x: string]: any;} | null | undefined;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
export const NotesList = ({notes, handleDelete, setSelectedNote, selectedNote, setToggle} : NotesListProps ) => {
  return (
    <List sx={{
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper',
      overflow: 'auto',
      height: '30em',
      borderStyle: 'solid',
    }}>
      {notes?.length ? notes.map((note: any) => {
          let selected = false;
          if (selectedNote?.id === note.id) {
            selected = true;
          }
          return (
            <Note
              note={note}
              handleDelete={handleDelete}
              setSelectedNote={setSelectedNote}
              selected={selected}
              setToggle={setToggle}
            />)
      })
      : null}
    </List>
  );
};