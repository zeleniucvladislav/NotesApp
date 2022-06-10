import { BrowserRouter as Router } from "react-router-dom";

import { UseRoutes } from "routes";
import { Notification } from "shared";

import { UserProvider } from "context/user/user.provider";
import { NotificationProvider } from "context/notification/notification.provider";
import { ModalProvider } from "context/modal/modal.provider";

import "./styles/index.scss";

const App = () => {
  return (
    <UserProvider>
      <NotificationProvider>
        <ModalProvider>
          <Router>
            <Notification />
            <UseRoutes />
          </Router>
        </ModalProvider>
      </NotificationProvider>
    </UserProvider>
  );
};

export default App;
