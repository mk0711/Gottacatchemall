import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
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
              <LinkContainer to="/inventory">
                <NavItem>Inventory</NavItem>
              </LinkContainer>

              <LinkContainer to="/pokedex">
                <NavItem>Dex</NavItem>
              </LinkContainer>

              <LinkContainer to="/team">
                <NavItem>Team</NavItem>
              </LinkContainer>

              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </>
          }             

          </Nav>
        </Navbar.Collapse>
      </Navbar>
       <Routes />
    </div>
  );
}

export default App;