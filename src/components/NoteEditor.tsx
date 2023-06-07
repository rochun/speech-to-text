import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';

interface NoteEditorProps {
  note: string | undefined;
  handleEdit: () => Promise<void>;
  handleEditChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
export const NoteEditor = ( {note, handleEdit, handleEditChange, setToggle} : NoteEditorProps) => {
  return (
    <Stack spacing={2} sx={{ maxWidth: '400px', alignItems: 'center', border: 'solid', padding: '1em'}}>
    Edit Note:
      <TextField
          id="filled-multiline-static"
          multiline
          rows={4}
          value={note}
          onChange={handleEditChange}
          variant="filled"
      />
      {note?.length ? <LoadingButton variant={"contained"} color={"success"} size="large" onClick={handleEdit}>Save</LoadingButton> : null}
      <LoadingButton variant={"contained"} color={"error"} size="large" onClick={() => setToggle(true)}>Record New Note</LoadingButton>
    </Stack>
  );
}