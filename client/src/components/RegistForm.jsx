import React, { useState } from "react";
import RegistInputField from "./RegistInputField";

function RegistForm({ handleSubmit, regInputFields,setSubmitted }) {
    const [regForm, setRegForm] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: ""
      });
    
      const handleRegChange = function (event) {
        const id = event.target.id;
        const value = event.target.value;
    
        setRegForm((prevForm) => {
          return {
            ...prevForm,
            [id]: value,
          };
        });
      }
    
      const submitRegistration = () => {
        const keys = Object.keys(regForm);
        let keysHaveValue = true;
    
        keys.forEach((key) => {
          if (!regForm[key]) {
            keysHaveValue = false;
          }
        });
    
        if (keysHaveValue) {
          const newRegForm = {
            name: regForm.firstName + " " + regForm.lastName,
            username: regForm.username,
            email: regForm.email,
            phone: regForm.phone,
            password: regForm.password,
          };
    
          console.log(newRegForm);
          setSubmitted(true);
    
          const data = {
            officialName: newRegForm.name,
            username: newRegForm.username,
            email: newRegForm.email,
            phone: newRegForm.phone,
            password: newRegForm.password,
          };
    
          fetch("http://localhost:3000/api/registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())             
            .then((response) => setRegForm(response))        
            .catch((error) => console.log(error));
    
          console.log("Registration complete!");
        } else {
          console.log("Not working");
        }
      };
    
      return (
        <form onSubmit={handleSubmit} className="regCard">
          {regInputFields.map((inputField, index) => (
            <RegistInputField
              key={index}
              className={inputField.className}
              type={inputField.type}
              label={inputField.label}
              handleChange={handleRegChange}
              id={inputField.id}
            />
          ))}
    
          <button type="submit" onClick={submitRegistration}>Register</button>
        </form>
      );
    }
    

export default RegistForm;
