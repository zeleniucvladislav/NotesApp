import { lazy } from "react";

import NotesList from "./notesList/notesList";
import Navbar from "./navbar/navbar";
import CreateNote from "./createNote/createNote";
import Notification from "./notification/notification";
import Loader from "./loader/loader";
import NoNotes from "./noNotes/noNotes";
import ScrollOnTop from "./scrollOnTop/scrollOnTop";
import PagesBar from "./pagination/pagesBar";

const NotFound = lazy(() => import("./notFound/notFound"));

export {
  NotesList,
  Navbar,
  CreateNote,
  Notification,
  Loader,
  NoNotes,
  ScrollOnTop,
  NotFound,
  PagesBar,
};
