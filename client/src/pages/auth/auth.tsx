import { useState } from "react";
import { Register } from "./register/register";
import { Login } from "./login/login";

import styles from "./auth.module.scss";
import { AuthViewSelector } from "./components/authViewSelector";

const Auth = () => {
  const [loginSelected, setLoginSelected] = useState<boolean>(true);

  return (
    <div className={styles.container}>
      <AuthViewSelector
        loginSelected={loginSelected}
        setLoginSelected={setLoginSelected}
      />
      {loginSelected ? <Login /> : <Register setLogin={setLoginSelected} />}
    </div>
  );
};

export default Auth;
