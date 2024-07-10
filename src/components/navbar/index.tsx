import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Avatar } from "antd";
import { IoClose, IoMenu } from "react-icons/io5";
import Profile from "../../assets/profile.jpg";
import { useMediaQuery } from "react-responsive";
import cx from "classnames";
import styles from "./index.module.scss";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: "768px" });
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      isMenuOpen &&
      !menuRef?.current?.contains(event.target as HTMLDivElement)
    ) {
      setMenuOpen(false);
    }
  };

  const handleOnLinkClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const renderPCNavlink = () => (
    <div className={styles.navMenuWrapper}>
      <Avatar src={Profile} className={styles.avatar} />
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <HashLink to="#about" smooth className="nav-link">
            About
          </HashLink>
        </li>
        <li className={styles.navItem}>
          <HashLink to="#projects" smooth className="nav-link">
            Projects
          </HashLink>
        </li>
      </ul>
    </div>
  );

  const renderMobileNavLinks = () => (
    <div className={styles.navMenuWrapper} id="nav-menu">
      <IoMenu onClick={() => handleMenuToggle()} />
      <div
        className={cx(styles.sideBar, isMenuOpen ? styles.open : "")}
        ref={menuRef}
      >
        <IoClose
          onClick={() => handleMenuToggle()}
          className={cx(styles.icon, isMenuOpen ? styles.open : "")}
        />
        <Avatar src={Profile} className={styles.avatar} />
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <HashLink
              to="#about"
              smooth
              className="nav-link"
              onClick={() => handleOnLinkClick()}
            >
              About
            </HashLink>
          </li>
          <li className={styles.navItem}>
            <HashLink
              to="#projects"
              smooth
              className="nav-link"
              onClick={() => handleOnLinkClick()}
            >
              Projects
            </HashLink>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <header className={styles.header} id="about">
      <nav className="nav container">
        {isMobile ? (
          <div className={styles.navToggle} id="nav-toggle">
            {renderMobileNavLinks()}
          </div>
        ) : (
          <>{renderPCNavlink()}</>
        )}
      </nav>
    </header>
  );
};
export default Navbar;
