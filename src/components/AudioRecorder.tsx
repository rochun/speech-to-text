import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Typography } from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

interface AudioRecorderProps {
  note: string | undefined;
  recording: boolean;
  transcribing: boolean;
  speaking: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  handleSave: () => Promise<void>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
export const AudioRecorder = ({ note, recording, speaking, transcribing, startRecording, stopRecording, handleSave, handleInputChange } : AudioRecorderProps) => {
  return (

    <Stack spacing={2} sx={{ width: '100%', height: '30em', alignItems: 'center', border: 'solid', borderRadius: '16px',}}>
      <Typography variant='h6' paddingTop='15px' fontWeight='bold'>
        Recording Mode {speaking ? <RecordVoiceOverIcon fontSize='small' sx={{ color: 'red '}} /> : null}
      </Typography>
      <TextField
          id="filled-multiline-static"
          multiline
          rows={8}
          value={note}
          onChange={handleInputChange}
          variant="filled"
          sx={{
            width: '70%',
          }}
      />
      <LoadingButton loading={recording} disabled={transcribing || recording} variant="outlined" size="large" color={"error"} onClick={() => startRecording()}>Record</LoadingButton>
      <LoadingButton loading={transcribing} variant={recording ? "contained" : "outlined"} size="large" onClick={() => stopRecording()}>Stop</LoadingButton>
      {note?.length ? <LoadingButton loading={transcribing} variant={"contained"} color={"success"} size="large" onClick={handleSave}>Save</LoadingButton> : null}
    </Stack>
  );
}