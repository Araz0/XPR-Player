export const PROGRAM_THUMBNAILS_BUCKET = 'program-thumbnails'
export const UPLOADS_FOLDER_PATH = `${
  import.meta.env.VITE_SUPABASE_URL
}/storage/v1/object/public/${PROGRAM_THUMBNAILS_BUCKET}/`
