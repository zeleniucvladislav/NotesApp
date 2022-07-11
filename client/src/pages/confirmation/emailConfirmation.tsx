import { useCallback, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdContactMail, MdHome } from "react-icons/md";

import { useAxios } from "utils/hooks/useAxios";

import styles from "./emailConfirmation.module.scss";
import { useUserContext } from "context/user/user.context";

const EmailConfirmation = () => {
  const { request } = useAxios();
  const { login } = useUserContext();

  const { id } = useParams();
  const navigate = useNavigate();

  const handleEmailConfirmation = useCallback(async () => {
    const res: any = await request(`/auth/verify/${id}`, "GET");

    if (res) {
      login(res.token, res.username);
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleEmailConfirmation();
  }, [handleEmailConfirmation]);

  return (
    <div className={styles.container}>
      <MdContactMail size={275} />

      <Link to="/">
        <button>
          Homepage <MdHome size={30} />
        </button>
      </Link>
    </div>
  );
};

export default EmailConfirmation;
