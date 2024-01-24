
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import KnownConnections from "./components/KnownConnections";


 
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="known-connections" element={<KnownConnections />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);