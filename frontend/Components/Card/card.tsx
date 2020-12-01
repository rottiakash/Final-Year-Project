import { FC } from "react";
import styles from "./card.module.css";

interface CardProps {
  name: string;
  algorithm: number;
}

const Card: FC<CardProps> = ({ name, algorithm }) => {
  return (
    <section
      className={styles.card}
      onClick={() => window.alert(`You clicked ${algorithm}`)}
    >
      <span>{name}</span>
    </section>
  );
};

export default Card;
