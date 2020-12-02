import { useRouter } from "next/router";
import { FC } from "react";
import styles from "./header.module.css";
interface HeaderProps {
  heading: string;
  showHome?: boolean;
}

const Header: FC<HeaderProps> = ({ heading, showHome }) => {
  const router = useRouter();
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100vw",
          fontSize: "2rem",
          marginTop: "30px",
        }}
      >
        {showHome && (
          <button className={styles.btn} onClick={() => router.push("/")}>
            Home
          </button>
        )}
        {!showHome && <div></div>}
        <span>{heading}</span>
        <div></div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
