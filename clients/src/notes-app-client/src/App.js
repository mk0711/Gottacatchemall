import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextlibs";


import "./App.css";
import Routes from "./Routes";

function App() {
  function handleLogout() {
    userHasAuthenticated(false);
  }

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"> Gotta Catch Em All</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>   
          {isAuthenticated
            ? <NavItem onClick={handleLogout}>Logout</NavItem>  
            : <>
              <LinkContainer to="/signup">
                <NavItem>Signup</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </>
          }             
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
       <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;