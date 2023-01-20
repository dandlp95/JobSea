import React, { useEffect, useState } from "react";
import appCSS from "./App.module.css";
import { TypeAnimation } from "react-type-animation";

function App() {
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();

  const login = () => {};

  return (
    <div className={appCSS.appCSS}>
      <div className={appCSS.appGrid}>
        <div className={appCSS.pageTitle}>
          <h2 className={appCSS.title}>JobSea</h2>
          <div className={appCSS.typeAnimation}>
            <TypeAnimation
              sequence={[
                "Easy to use...",
                1000,
                "No more spreadsheets...",
                1000,
                "No more messiness...",
                1000,
                "No more stress...",
                1000,
              ]}
              speed={50} // Custom Speed from 1-99 - Default Speed: 40
              style={{ fontSize: "2em" }}
              wrapper="span" // Animation will be rendered as a <span>
              repeat={0} // Repeat this Animation Sequence infinitely
            />
          </div>
        </div>
        <div className={appCSS.registrationDiv}>
          <form onSubmit={(e) => e.preventDefault} className={appCSS.loginForm}>
            <div className={appCSS.inFormContainer}>
              <div className={appCSS.loginInputDiv}>
                <input
                  required
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                />
                <label for="username" className={appCSS.floatingLabel}>
                  Username:{" "}
                </label>
              </div>
              <div className={appCSS.loginInputDiv}>
                <input
                  required
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for="password" className={appCSS.floatingLabel}>
                  Password:{" "}
                </label>
              </div>
              <button className={appCSS.loginBtn}>Log in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
