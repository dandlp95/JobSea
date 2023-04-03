import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App"
import Jobs from "./pages/jobs"

const router = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/jobs" element={<Jobs/>}/>
            </Routes>
        </Router>
    )
}

export default router;