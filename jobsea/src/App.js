import appCSS from "./App.module.css";
import { TypeAnimation } from "react-type-animation";

function App() {
  return (
    <div className={appCSS.appCSS}>
      <div className={appCSS.appGrid}>
        <div className={appCSS.pageTitle}>
          <h2 className={appCSS.title}>JobSea</h2>
          <div className={appCSS.typeAnimation}>
            <TypeAnimation
              sequence={[
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
        <div className={appCSS.registrationDiv}>Registraion</div>
      </div>
    </div>
  );
}

export default App;
