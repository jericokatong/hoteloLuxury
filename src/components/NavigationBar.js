import { Navbar, Container, NavLink, Button, Modal, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../styles/style.css";

import ModalComponents from "./ModalComponents";

const NavigationBar = ({
  email,
  setEmail,
  noHp,
  setNoHp,
  password,
  setPassword,
  isLogin,
  showSignIn,
  showSignUp,
  showProfile,
  setShowProfile,
  navigate,
  register,
  login,
  logout,
  handleShowSignIn,
  handleCloseSignIn,
  handleShowSignUp,
  handleCloseSignUp,
  handleShowProfile,
  handleCloseProfile,
  notHome,
  urlGambar,
  refreshToken,
}) => {
  return (
    <>
      <Navbar>
        <Container className="d-flex justify-content-center">
          <Navbar.Brand href="/">
            <img src="Logo.png" width="120" height="20" alt="logo" />
          </Navbar.Brand>
        </Container>
        <Container className="fontnav">
          <NavLink href="/">Beranda</NavLink>
          <NavLink href="#tentangkami">Tentang Kami</NavLink>
          <NavLink href="#reservasi">Reservasi</NavLink>
          {isLogin && <NavLink onClick={handleShowProfile}>Akun Saya</NavLink>}
        </Container>
        {isLogin && (
          <Container className="d-flex justify-content-center">
            <div>{email && email}</div>
            {notHome ? (
              <Button variant="danger" size="sm" className="ms-3 signup" onClick={logout} style={{ display: "none" }}>
                Logout
              </Button>
            ) : (
              <Button variant="danger" size="sm" className="ms-3 signup" onClick={logout}>
                Logout
              </Button>
            )}
          </Container>
        )}

        {!isLogin && (
          <Container className="d-flex justify-content-center">
            <Button variant="warning" className="signin" size="sm" onClick={handleShowSignIn}>
              Sign In
            </Button>{" "}
            <Button variant="warning" size="sm" className="ms-3 signup" onClick={handleShowSignUp}>
              Sign Up
            </Button>{" "}
          </Container>
        )}
      </Navbar>
      <ModalComponents
        email={email}
        setEmail={setEmail}
        noHp={noHp}
        setNoHp={setNoHp}
        password={password}
        setPassword={setPassword}
        isLogin={isLogin}
        showSignIn={showSignIn}
        showSignUp={showSignUp}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        navigate={navigate}
        register={register}
        login={login}
        logout={logout}
        handleShowSignIn={handleShowSignIn}
        handleCloseSignIn={handleCloseSignIn}
        handleShowSignUp={handleShowSignUp}
        handleCloseSignUp={handleCloseSignUp}
        handleShowProfile={handleShowProfile}
        handleCloseProfile={handleCloseProfile}
        urlGambar={urlGambar}
        refreshToken={refreshToken}
      />
    </>
  );
};

export default NavigationBar;
