import { useEffect, useState } from 'react';
import { useWhisper } from '@chengsokdara/use-whisper';
import { createNotes } from '../server/userNotes';
import { useAuth } from '../context/AuthProvider';
import { NotesList } from './NotesList';
import { getNotes, deleteNotes, updateNotes } from '../server/userNotes';
import { AudioRecorder } from './AudioRecorder';
import { NoteEditor } from './NoteEditor';

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
  const [ notesList, setNotesList ] = useState<{ [x: string]: any; }[] | null | undefined>([]);
  const [ selectedNote, setSelectedNote ] = useState<{ [x: string]: any; } | null | undefined>(null);
  const [toggle, setToggle] = useState<boolean>(false);

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
    const response = await deleteNotes(note_id);
    const newList = notesList?.filter((note) => note.id !== note_id);
    console.log(response);
    newList?.sort((a: any, b: any) => (Number(new Date(b.updated_at)) - Number(new Date(a.updated_at))));
    setNotesList(newList);
  };

  const handleSave = async () => {
    const response = await createNotes(user?.id, note);
    setNote('');
    console.log(response);
    retrieveNotes();
  };

  const handleEdit = async () => {
    const response = await updateNotes(selectedNote?.id, selectedNote?.note);
    console.log(response);
    retrieveNotes();
  };

  return (
    <div>
        <p>Recording: {recording.toString()}</p>
        <p>Speaking: {speaking.toString()}</p>
        <p>Transcribing: {transcribing.toString()}</p>
        {note}

      {
        !selectedNote ?
        <AudioRecorder
          note={note}
          recording={recording}
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
        />
      }



      <NotesList notes={notesList} handleDelete={handleDelete} setSelectedNote={setSelectedNote} selectedNote={selectedNote} />
    </div>
  )
};