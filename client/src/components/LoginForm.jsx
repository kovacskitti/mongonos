import React, { useState } from "react";
import LoginField from "./LoginField";

function LoginForm({setUserId, userId, logInputFields, setPasswordCorrect }) {
  const [accForm, setAccForm] = useState({
    username: "",
    password: "",
  });

  const handleAccChange = function (event) {
    const id = event.target.id;
    const value = event.target.value;

    setAccForm((prevForm) => {
      return {
        ...prevForm,
        [id]: value,
      };
    });
  };

  const submitLogin = () => {
    const newAccForm = {
      username: accForm.username,
      password: accForm.password,
    };
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccForm),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.success); // ehhez kell majd egy useState amit be lehet rakni ternarybe, hogy tovább engedjen vagy hibaüzenet

        console.log("Login complete!");
      })
      .catch((error) => console.log(error));

    console.log(newAccForm);
    console.log("Login complete!");
  };

  const loginSubmit = (event) => {
    event.preventDefault();

    const newAccForm = {
      username: accForm.username,
      password: accForm.password,
    };

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccForm),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.success);
        console.log(response.user)
        setPasswordCorrect(response.success);
        setUserId(response.user)
        console.log("Login complete!");
      })
      .catch((error) => console.log(error));

    console.log(newAccForm);
    console.log("Login complete!");
  };

  return (
    <form onSubmit={loginSubmit} className="logCard">
      {logInputFields.map((inputField, index) => (
        <LoginField
          key={index}
          className={inputField.className}
          type={inputField.type}
          label={inputField.label}
          handleChange={handleAccChange}
          id={inputField.id}
        />
      ))}
      <button type="submit" onClick={submitLogin}>
        Login
      </button>
    </form>
  );
}

export default LoginForm;
