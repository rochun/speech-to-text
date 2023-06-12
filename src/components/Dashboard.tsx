import { useEffect, useState } from 'react';
import { useWhisper } from '@chengsokdara/use-whisper';
import { createNotes } from '../server/userNotes';
import { useAuth } from '../context/AuthProvider';
import { NotesList } from './NotesList';
import { getNotes, deleteNotes, updateNotes } from '../server/userNotes';
import { AudioRecorder } from './AudioRecorder';
import { NoteEditor } from './NoteEditor';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export const Dashboard = () => {
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    nonStop: true,
    removeSilence: true,
  });
  const { user } = useAuth();
  const [ note, setNote ] = useState<string | undefined>('');
  const [ notesList, setNotesList ] = useState<{ [x: string]: any; }[] | null | undefined>(null);
  const [ selectedNote, setSelectedNote ] = useState<{ [x: string]: any; } | null | undefined>(null);
  const [ toggle, setToggle ] = useState<boolean>(false);

  useEffect(() => {
    setNote(transcript.text);
  }, [transcript]);

  useEffect(() => {
    retrieveNotes();
  }, []);

  const retrieveNotes = async () => {
    const data = await getNotes();
    data?.sort((a: any, b: any) => (Number(new Date(b.updated_at)) - Number(new Date(a.updated_at))));
    setNotesList(data);
  };

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = event.target.value;
    setNote(val);
  };

  const handleEditChange = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = event.target.value;
    setSelectedNote(prevState => ({
      ...prevState,
      note: val,
    }));
    console.log(selectedNote);
  };

  const handleDelete = async (note_id : string) => {
    if (note_id === selectedNote?.id) {
      setSelectedNote(null);
    }
    await deleteNotes(note_id);
    const newList = notesList?.filter((note) => note.id !== note_id);
    newList?.sort((a: any, b: any) => (Number(new Date(b.updated_at)) - Number(new Date(a.updated_at))));
    setNotesList(newList);
  };

  const handleSave = async () => {
    await createNotes(user?.id, note);
    setNote('');
    retrieveNotes();
  };

  const handleEdit = async () => {
    await updateNotes(selectedNote?.id, selectedNote?.note);
    retrieveNotes();
  };

  return (
    <div style={{ marginTop: '2em'}}>
      <Box width="100%" maxWidth='800px' margin='0 auto'>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2
        }}>
          <Box sx={{
            gridColumn: {xs: 'span 3', md: 'span 2'}
          }}>
            {
              !selectedNote || toggle ?
              <AudioRecorder
                note={note}
                recording={recording}
                speaking={speaking}
                transcribing={transcribing}
                startRecording={startRecording}
                stopRecording={stopRecording}
                handleSave={handleSave}
                handleInputChange={handleInputChange}
              /> :
              < NoteEditor
                note={selectedNote.note}
                handleEdit={handleEdit}
                handleEditChange={handleEditChange}
                setToggle={setToggle}
              />
            }
          </Box>
          <Box sx={{
            gridColumn: {xs: 'span 3', md: 'span 1'}}}>
            <NotesList notes={notesList} handleDelete={handleDelete} setSelectedNote={setSelectedNote} selectedNote={selectedNote} setToggle={setToggle}/>
          </Box>
        </Box>
      </Box>
    </div>
  )
};