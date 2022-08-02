import { lazy } from "react";

const Auth = lazy(() => import("./auth/auth"));
const NotesEdit = lazy(() => import("./notesEdit/notesEdit"));
const Notes = lazy(() => import("./notes/notes"));
const Note = lazy(() => import("./note/note"));
const EmailConfirmation = lazy(
  () => import("./confirmation/emailConfirmation")
);

export { Auth, NotesEdit, Notes, Note, EmailConfirmation };
