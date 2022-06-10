import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { MdLogout } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { useUserContext } from "context/user/user.context";

import styles from "./navMobile.module.scss";

const NavMobile = () => {
  const { logout } = useUserContext();

  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <Link to="notes/edit">
          <div className={styles.link}>
            <FaEdit />
          </div>
        </Link>
        <Link to="/">
          <Logo className={styles.logo} />
        </Link>
        <MdLogout onClick={logout} className={styles.logout} />
      </nav>
    </div>
  );
};

export default NavMobile;
