import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

interface NotesProps {
  note: {[x: string]: any;} | null | undefined;
  handleDelete: (note_id: string) => Promise<void>;
  setSelectedNote: React.Dispatch<React.SetStateAction<{[x: string]: any;} | null | undefined>>;
  selected: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Note = ({ note, handleDelete, setSelectedNote, selected, setToggle } : NotesProps) => {

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon onClick={() => {handleDelete(note?.id)}}/>
        </IconButton>
      }
      divider={true}
      sx={{
        '&:hover': {
          backgroundColor: '#D3D3D3',
        },
      }}
      disablePadding
    >
      <ListItemButton
        sx={{
          height: '100%',
        }}
        onClick={() => {
          console.log(note);
          setSelectedNote(note);
          setToggle(false);
        }}
        selected={selected}
      >
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {new Date(note?.updated_at).toDateString()}
              </Typography>
              {note?.note ? ' - '+ note.note.substr(0, 100) + '...' : null}
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}