import React from "react";
import { Outlet } from "react-router-dom";

// Import Layout components
import Header from "../components/header";
import Footer from "../components/footer";

// Import styles
import styles from "./layout.module.scss";

function Layout() {
    return (
      <div className={styles.layout}>
        <Header />
        <div className={styles.outlet}>
            <Outlet />
        </div>
        <Footer />
      </div>
    );
  }

export default Layout;