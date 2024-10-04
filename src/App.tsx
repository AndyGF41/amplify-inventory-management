import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Inventory from "./components/Inventory";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";

function Home() {
  return <h2>Home Page</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </Router>
  );
}
export default withAuthenticator(App);
