import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Typography } from '@mui/material';

interface NoteEditorProps {
  note: string | undefined;
  handleEdit: () => Promise<void>;
  handleEditChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
export const NoteEditor = ( {note, handleEdit, handleEditChange, setToggle} : NoteEditorProps) => {
  return (
    <Stack spacing={2} sx={{ width: '100%', height: '30em', alignItems: 'center', border: 'solid', borderRadius: '16px',}}>
      <Typography variant='h6' paddingTop='15px' fontWeight='bold'>
        Edit Mode
      </Typography>
      <TextField
          id="filled-multiline-static"
          multiline
          rows={8}
          value={note}
          onChange={handleEditChange}
          variant="filled"
          sx={{
            width: '70%'
          }}
      />
      {note?.length ? <LoadingButton variant={"contained"} color={"success"} size="large" onClick={handleEdit}>Save</LoadingButton> : null}
      <LoadingButton variant={"contained"} color={"error"} size="large" onClick={() => setToggle(true)}>Record New Note</LoadingButton>
    </Stack>
  );
}