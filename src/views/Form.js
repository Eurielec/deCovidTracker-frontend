import React, { useState } from "react";

function Form(props) {
  const associationName = process.env.REACT_APP_ASSOCIATION_NAME || "Local";
  const url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [nifNie, setNifNie] = useState(localStorage.getItem("nifNie") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const validateNifNie = nifNie => {
    nifNie = nifNie.replace(/[-, ]/g, "");
    const letter = nifNie.slice(-1);
    const _letter = "TRWAGMYFPDXBNJZSQVHLCKE"[
      parseInt(nifNie.slice(0, -1)) % 23
    ];
    return _letter === letter;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateNifNie(nifNie)) {
      alert("Please provide a valid NIF/NIE");
      return;
    }
    // Save inputs in local storage
    localStorage.setItem("email", email);
    localStorage.setItem("nifNie", nifNie);

    let date = new Date();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        nif_nie: nifNie,
        email: email,
        type: props.operation === "access" ? "access" : "exit",
        time: new Date(date.valueOf() - date.getTimezoneOffset() * 60000)
      })
    };
    let response = await fetch(`https://${url}/event`, requestOptions);
    const statusCode = await response.status;
    // 202 Accepted
    if (statusCode === 202) {
      props.setState("success");
      return;
    }
    // 409 Conflict with Server's state
    if (statusCode === 409) {
      props.setState("full");
      return;
    }
    // Any others
    else {
      props.setState("failure");
      return;
    }
  };
  return (
    <div className="form-container">
      {props.operation === "access" ? (
        <div className="head-container">
          <h1 className="title">Welcome</h1>
          <p className="subtitle">
            Register your <span className="highlight-yellow">access</span> to{" "}
            {associationName}{" "}
          </p>
        </div>
      ) : (
        <div className="head-container">
          <h1 className="title">Bye</h1>
          <p className="subtitle">
            Register your <span className="highlight-yellow">exit</span> from{" "}
            {associationName}{" "}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <label>NIF/NIE</label>
        <input
          required
          className="input-text"
          type="text"
          placeholder="DNI"
          value={nifNie}
          onChange={e => setNifNie(e.target.value)}
          pattern="^[0-9]{8,8}[-, ]?[A-Za-z]$"
        />
        <label>Email</label>
        <input
          required
          className="input-text"
          type="text"
          placeholder="email@alumnos.upm.es"
          value={email}
          onChange={e => setEmail(e.target.value)}
          pattern=".*@(?:alumnos.upm.es|upm.es|.*.upm.es)$"
        />
        <div className="input-button-container">
          <input className="input-button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default Form;
