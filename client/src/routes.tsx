import { Routes, Route, Navigate } from "react-router-dom";
import { Auth, EditNotes, Note, Notes } from "pages";
import { useUserContext } from "context/user/user.context";
import { Layout } from "layout";
import { NotFound } from "shared";

export const UseRoutes = () => {
  const { isAuthentificated } = useUserContext();

  if (isAuthentificated) {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="notes/edit" element={<EditNotes />} />
          <Route path="notes/:id" element={<Note />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};