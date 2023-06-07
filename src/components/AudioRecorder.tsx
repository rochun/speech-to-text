import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Box } from '@mui/material';

interface AudioRecorderProps {
  note: string | undefined;
  recording: boolean;
  transcribing: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  handleSave: () => Promise<void>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
export const AudioRecorder = ({ note, recording, transcribing, startRecording, stopRecording, handleSave, handleInputChange } : AudioRecorderProps) => {
  return (

    <Stack spacing={2} sx={{ maxWidth: '400px', alignItems: 'center', border: 'solid', padding: '1em'}}>
    Notes:
      <TextField
          id="filled-multiline-static"
          multiline
          rows={4}
          value={note}
          onChange={handleInputChange}
          variant="filled"
      />
      <LoadingButton loading={recording} disabled={transcribing || recording} variant="outlined" size="large" color={"error"} onClick={() => startRecording()}>Record</LoadingButton>
      <LoadingButton loading={transcribing} variant={recording ? "contained" : "outlined"} size="large" onClick={() => stopRecording()}>Stop</LoadingButton>
      {note?.length ? <LoadingButton loading={transcribing} variant={"contained"} color={"success"} size="large" onClick={handleSave}>Save</LoadingButton> : null}
    </Stack>
  );
}