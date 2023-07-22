import NavigationBar from "../components/NavigationBar";
import Beranda from "../components/Beranda";
import TentangKami from "../components/TentangKami";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import defaultImage from "../assets/img/avatar.png";
import "../styles/style.css";

const Home = ({ email, setEmail, noHp, setNoHp, password, setPassword, isLogin, setIsLogin, pelanggan_id, set_pelanggan_id, aksesToken, setAksesToken, urlGambar, refreshToken }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("no_hp", noHp);
    formData.append("password", password);

    try {
      const response = await fetch(defaultImage);
      const blob = await response.blob();

      formData.append("file", blob, "default.png");

      await axios.post("http://localhost:5000/register", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setEmail("");
      setNoHp("");
      setPassword("");
      navigate("/");
      handleCloseSignUp();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log("ini response login", response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setEmail(decoded.email);

      setIsLogin(true);
      navigate("/");
      handleCloseSignIn();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const logout = async (e) => {
    e.preventDefault();

    try {
      axios.delete("http://localhost:5000/logout");

      setEmail("");
      setNoHp("");
      setPassword("");
      setIsLogin(false);

      navigate("/");
      handleCloseSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
    setEmail("");
    setPassword("");
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false);
  };

  const handleShowSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
    setEmail("");
    setPassword("");
    setNoHp("");
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
    setEmail("");
    setPassword("");
    refreshToken();
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <div>
      <div className="mainbg">
        <NavigationBar
          email={email}
          setEmail={setEmail}
          noHp={noHp}
          setNoHp={setNoHp}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
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
        <Beranda />
      </div>
      <div className="tentangkamibg">
        <TentangKami
          email={email}
          setEmail={setEmail}
          noHp={noHp}
          setNoHp={setNoHp}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
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
          pelanggan_id={pelanggan_id}
        />
      </div>
    </div>
  );
};

export default Home;
