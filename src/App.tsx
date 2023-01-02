import React, { useState, useEffect } from "react";
import logo from "./assets/images/logo.svg";
import robots from "./mockdata/robots.json";
import Robot from "./components/Robot";
import RobotDiscount from "./components/RobotDiscount";
import styles from "./App.module.css";
import ShoppingCart from "./components/ShoppingCart";

interface Props { }

interface State {
  robotGallery: any[];
  count: number;
}

const App: React.FC = (props) => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>()

  useEffect(() => {
    document.title = `点击${count}次`;
  }, [count]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        // .then(response => response.json())
        // .then(data => setRobotGallery(data))
        const data = await responses.json();
        setRobotGallery(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>Robot name need to be long and long and long</h1>
      </div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click
      </button>
      <span>count: {count}</span>
      <ShoppingCart />
      {(!error || error !== "") && <div>website error：{error}</div>}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r, index) =>
            index % 2 == 0 ? (
              <RobotDiscount id={r.id} email={r.email} name={r.name} />
            ) : (
              <Robot id={r.id} email={r.email} name={r.name} />
            )
          )}
        </div>
      ) : (
        <h2>loading</h2>
      )}
    </div>
  );
};

export default App;
