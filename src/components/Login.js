import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        // Validate email and password
        if (email !== "cmadaoua@gmail.com" || password !== "Madaoua12?") {
            alert("Incorrect Email and Password do not match");
            return;
        }

        try {
            // Simulate API call success
            const res = { data: { message: "Login Success" } };

            console.log(res.data);

            if (res.data.message === "Login Success") {
                navigate('/home');
            } else {
                alert("Incorrect Email and Password do not match");
            }
        } catch (err) {
            console.error(err);
            alert("Login successfully!!!");
        }
    };

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
            className="login-container"
        >
            <div
                style={{
                    width: "300px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
                className="login-form"
            >
                <h2 style={{ textAlign: "center", color: "#333" }}>Login</h2>
                <hr />
                <form>
                    <div style={{ marginBottom: "15px" }} className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "14px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(event) => handleInputChange(event, setEmail)}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }} className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "14px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event) => handleInputChange(event, setPassword)}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={handleLogin}
                    >
                        LOGIN
                    </button>
                    
                </form>
            </div>
        </div>
    );
}

export default Login;
