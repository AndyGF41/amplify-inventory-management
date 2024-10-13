import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ThemeProvider as AmplifyThemeProvider,
  Authenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { signOut, getCurrentUser } from "aws-amplify/auth";
import Inventory from "./components/Inventory";
import Layout from "./components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Settings from "./components/Settings";
import { authComponents, authFormFields } from "./components/Auth";
import authTheme from "./style/themes/authTheme";
import theme from "./style/themes/inventoryTheme";

function App() {
  function Home() {
    const [username, setUsername] = useState<string | undefined>();
    useEffect(() => {
      async function fetchUser() {
        try {
          const user = await getCurrentUser();
          setUsername(user.username);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }

      fetchUser();
    }, []);
    console.log(username);
    return (
      <>
        <h1>Hello {username}</h1>
        <button
          onClick={async () => {
            await signOut();
          }}
        >
          Sign out
        </button>{" "}
      </>
    );
  }

  return (
    <AmplifyThemeProvider theme={authTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Authenticator
          variation="modal"
          components={authComponents}
          formFields={authFormFields}
        >
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          </Router>
        </Authenticator>
      </ThemeProvider>
    </AmplifyThemeProvider>
  );
}
export default App;
