/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "assets/images/logo.svg";
import { MdLogout } from "react-icons/md";
import { FaUser, FaEdit } from "react-icons/fa";

import { useUserContext } from "context/user/user.context";

import styles from "./navDesktop.module.scss";

const NavDesktop = () => {
  const { logout, user } = useUserContext();
  const navigate = useNavigate();

  const username =
    user?.username && user.username.length > 20
      ? `${user?.username.substring(0, 17)}...`
      : user?.username;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <Link to="/">
          <Logo className={styles.logo} />
        </Link>
        <div className={styles.userData}>
          <Link to="notes/edit">
            <div className={styles.userData__link}>
              <FaEdit /> Manage Notes
            </div>
          </Link>
          <div className={styles.userData__name}>
            <FaUser />
            {username}
          </div>
          <button onClick={handleLogout} className={styles.userData__logout}>
            Log out <MdLogout />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavDesktop;
