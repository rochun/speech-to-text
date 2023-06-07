import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';

interface NoteEditorProps {
  note: string | undefined;
  handleEdit: () => Promise<void>;
  handleEditChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
export const NoteEditor = ( {note, handleEdit, handleEditChange} : NoteEditorProps) => {
  return (
    <Stack spacing={2} sx={{ maxWidth: '400px', alignItems: 'center', border: 'solid', padding: '1em'}}>
    Notes:
      <TextField
          id="filled-multiline-static"
          multiline
          rows={4}
          value={note}
          onChange={handleEditChange}
          variant="filled"
      />
      {note?.length ? <LoadingButton variant={"contained"} color={"success"} size="large" onClick={handleEdit}>Save</LoadingButton> : null}
    </Stack>
  );
}