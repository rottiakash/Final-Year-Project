import { useRouter } from "next/router";
import { FC } from "react";
import styles from "./card.module.css";

interface CardProps {
  name: string;
  algorithm: number;
}

const Card: FC<CardProps> = ({ name, algorithm }) => {
  const router = useRouter();
  return (
    <section
      className={styles.card}
      onClick={() => router.push(`/input/${algorithm}`)}
    >
      <span>{name}</span>
    </section>
  );
};

export default Card;
