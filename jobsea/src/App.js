import React, { useEffect, useState } from "react";
import appCSS from "./App.module.css";
import { TypeAnimation } from "react-type-animation";
import Button from "./components/button";

function App() {
  const [loginName, setLoginName] = useState();
  const [lPassword, setLPassword] = useState();
  const [rUsername, setRUsername] = useState();
  const [rPassword, setRPassword] = useState();
  const [rPasswordConfirm, setRPasswordConfirm] = useState();
  const [rEmail, setREmail] = useState();

  const login = () => {
    // const options = {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify({ email, password, firstName, lastName, major }),
    // };
    // try {
    //   const response = await fetch(getApiRoot() + "/users/add", options);
  };
  const registration = async () => {
    const options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        Username: rUsername,
        Email: rEmail,
        Password: rPassword,
        ConfirmPassword: rPasswordConfirm,
      }),
    };

    const response = await fetch(
      "https://localhost:7283" + "/jobSea/User/AddUser",
      options
    );
    console.log(await response.json());
  };

  return (
    <div className={appCSS.appCSS}>
      <div className={appCSS.appFlexbox}>
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
          <form
            onSubmit={(e) => e.preventDefault()}
            className={appCSS.loginForm}
          >
            <div className={appCSS.inFormContainer}>
              <div className={appCSS.loginInputDiv}>
                <input
                  required
                  type="text"
                  onChange={(e) => setLoginName(e.target.value)}
                  name="loginName"
                />
                <label for="loginName" className={appCSS.floatingLabel}>
                  Username:{" "}
                </label>
              </div>
              <div className={appCSS.loginInputDiv}>
                <input
                  required
                  type="password"
                  name="lPassword"
                  onChange={(e) => setLPassword(e.target.value)}
                />
                <label for="lPassword" className={appCSS.floatingLabel}>
                  Password:{" "}
                </label>
              </div>
              <Button btnText="Log in" clickAction={login} />
            </div>
          </form>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={appCSS.registrationForm}
          >
            <div className={appCSS.inFormContainer}>
              <div className={appCSS.registrationInputDiv}>
                <input
                  type="text"
                  required
                  name="username"
                  onChange={(e) => setRUsername(e.target.value)}
                />
                <label className={appCSS.floatingLabel}>Username: </label>
              </div>
              <div className={appCSS.registrationInputDiv}></div>
              <div className={appCSS.registrationInputDiv}>
                <input
                  required
                  type="text"
                  onChange={(e) => setREmail(e.target.value)}
                  name="rEmail"
                />
                <label className={appCSS.floatingLabel}>Email: </label>
              </div>
              <div className={appCSS.registrationInputDiv}>
                <input
                  required
                  type="password"
                  onChange={(e) => setRPassword(e.target.value)}
                  name="password"
                />{" "}
                <label className={appCSS.floatingLabel}>Password: </label>
              </div>
              <div>
                <div className={appCSS.registrationInputDiv}>
                  <input
                    required
                    type="password"
                    onChange={(e) => setRPasswordConfirm(e.target.value)}
                    name="rPasswordConfirm"
                  />
                  <label className={appCSS.floatingLabel}>
                    Confirm Password:{" "}
                  </label>
                </div>
              </div>
              <Button btnText="Register" clickAction={registration} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
