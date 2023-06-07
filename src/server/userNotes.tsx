import { supabase } from './client';

export const getNotes = async () => {
  const { data: { user } }  = await supabase.auth.getUser();

  if (!user?.id) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user?.id);

      if (error) {
        throw error;
      } else {
        return [ ...data ];
      }

  } catch (error) {
    throw error;
  }
}

export const createNotes = async (user: string | undefined, text: string | undefined) => {
  const response = await supabase.from('notes').insert({
    user_id: user,
    note: text,
  });

  return response;
}

export const deleteNotes = async (note_id: string) => {

  const response = await supabase
    .from('notes')
    .delete()
    .eq('id', note_id);

  return response;
}

export const updateNotes = async (note_id: string, text: string | undefined) => {
  const response = await supabase
    .from('notes')
    .update({ note: text})
    .eq('id', note_id);

    return response;
}