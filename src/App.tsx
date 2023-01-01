import React, { Component } from "react";
import logo from "./assets/images/logo.svg";
import robots from "./mockdata/robots.json";
import Robot from "./components/Robot";
import styles from "./App.module.css";
import ShoppingCart from "./components/ShoppingCart";

interface Props { }

interface State {
  robotGallery: any[];
  count: number
}

class App extends React.Component<Props, State> {
  //*first stage of life cycle: initialization
  //Initialize component "state"
  constructor(props) {
    super(props);
    this.state = {
      robotGallery: [],
      count: 0
    };
  }
  //Called after the component has created a dom element and is mounted on the page
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then((data) => this.setState({ robotGallery: data }));
  }

  //*second stage of life cycle: update
  //Called when the component receives a new prop (after update)
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
        </div>
        <button onClick={() => {
          this.setState((preState, preProps) => {
            return { count: preState.count + 1 }
          }, () => {
            console.log("count", this.state.count);
          });
          this.setState((preState, preProps) => {
            return { count: preState.count + 1 }
          }, () => {
            console.log("count", this.state.count);
          });



        }}>Click</button>
        <span>count:{this.state.count}</span>
        <ShoppingCart />
        <div className={styles.robotList}>
          {this.state.robotGallery.map((r) => (
            <Robot id={r.id} email={r.email} name={r.name} />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
