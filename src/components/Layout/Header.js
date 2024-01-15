import React from "react";
import styles from "../Styles/Header.module.css";
import bgImage from "../../assets/meals.jpg";
import HeaderCartButton from "../Layout/HeaderCartButton";
const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={bgImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
