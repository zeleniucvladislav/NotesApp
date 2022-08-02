import { Routes, Route } from "react-router-dom";
import { Auth, NotesEdit, Note, Notes, EmailConfirmation } from "pages";
import { useUserContext } from "context/user/user.context";
import Layout from "layout";
import { NotFound } from "shared";
import withSuspense from "utils/hoc/withSuspense";

export const UseRoutes = () => {
  const { isAuthentificated } = useUserContext();

  if (isAuthentificated) {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={withSuspense(Notes)} />
          <Route path="notes/edit" element={withSuspense(NotesEdit)} />
          <Route path="notes/:id" element={withSuspense(Note)} />
          <Route path="*" element={withSuspense(NotFound)} />
        </Routes>
      </Layout>
    );
  }

  return (
    <Routes>
      <Route path="/" element={withSuspense(Auth)} />
      <Route path="verify/:id" element={withSuspense(EmailConfirmation)} />
      <Route path="*" element={withSuspense(NotFound)} />
    </Routes>
  );
};
