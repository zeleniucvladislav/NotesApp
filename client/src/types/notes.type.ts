export type NotesType = {
  _id: string;
  created_at: string;
  title: string;
  text: string;
  nonpublic: boolean;
  creator?: { username: string };
};
