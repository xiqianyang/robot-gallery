import React, { useContext } from "react";
import styles from './Robot.module.css'
import { appContext, appSetStateContext } from "../AppState";
import { useAddToCart } from "./AddToCart";


interface RobotProps {
  id: number;
  name: string;
  email: string;
}

const RobotDiscount: React.FC<RobotProps> = ({ id, name, email, }) => {
  const value = useContext(appContext);
  const addToCart = useAddToCart();


  return (

    <div className={styles.cardContainer}>
      <img alt="robot" src={`https://robohash.org/${id}`} />
      <h2>Discount items</h2>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>Author: {value.username}</p>
      <button onClick={() => addToCart(id, name)}>add to cart</button>
    </div>

  );
};

export default RobotDiscount;