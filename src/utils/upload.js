import { supabase } from '../supabaseClient';

const BUCKET = 'photos';

export async function uploadPhoto(file) {
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

  // 1. Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw uploadError;

  // 2. Insert record in photos table
  const { error: dbError } = await supabase
    .from('photos')
    .insert({ file_path: fileName });

  if (dbError) throw dbError;
  return fileName;
}
