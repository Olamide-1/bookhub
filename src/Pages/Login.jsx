import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Input from "./../Components/Input";
import Label from "./../Components/Label";
import Error from "./../Components/Error";
import Message from "./../Components/Message";
import { useFetch } from "./../Context/FetchContext";
import googleLogo from "../img/svgs/google.svg";
import { useBook } from "./../Context/BookContext";
import { PATHS } from "./../Routes/urls";
import { useGoogleLogin } from "@react-oauth/google";
import LoginSpinner from "./../Components/LoginSpinner";


function Login() {
  const nameRef = useRef();
  const passwordRef = useRef();
  const { book } = useBook();

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [status, setStatus] = useState("normal");
  const [success, setSuccess] = useState(false);
  const [oauthSuccess, setOauthSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { postData, setToken, setLoggedIn } = useFetch();
  const navigate = useNavigate();

  const handleName = (e) => {
    if (nameRef.current.value.trim() === "") {
      setNameError(() => "Name is required");
    } else {
      setNameError(() => "");
    }
  }

  const handlePassword = (e) => {
    if (passwordRef.current.value.trim() === "") {
      setPasswordError(() => "Password is required");
    } else {
      setPasswordError(() => "");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(() => "loading");
    setSuccess(() => false);
    let bug = false;
    
    if (passwordRef.current.value.trim() === "") {
      passwordRef.current.focus();
      setPasswordError(() => "Password is required");
      bug = true;
    } else {
      setPasswordError(() => "");
    }

    if (nameRef.current.value.trim() === "") {
      nameRef.current.focus();
      setNameError(() => "Username is required");
      bug = true;
    } else {
      setNameError(() => "");
    }

    if (bug) { // Check for any error
      setStatus(() => "normal");
      return;
    }

    const data = {
      username: nameRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    }

    try {
      // Send request and await response
      const response = await postData(data, PATHS.login);

      if (response.status === 200) { // Successfully created
        setSuccess(() => true);
        setStatus(() => "Login successful!");

        setStatus(() => "normal");
        nameRef.current.value = "";
        passwordRef.current.value = "";

        const token = response.data.token;
        // Storing token
        localStorage.setItem("token", token);
        setToken(() => token);
        
        // Set LoggedIn state
        setLoggedIn(() => true);

        // Redirect to login after 2 seconds
        setTimeout(() => {
          if (Object.keys(book).length !== 0) {
            navigate("/checkout");
          } else {
            navigate("/dashboard", {replace: true});
          }
        }, 2000);
      }
    } catch(error) {
        setError(() => `Invalid username or password`)  
    }

    setStatus(() => "normal");
  }

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const data = {
        "code": codeResponse.code
      }

      setOauthSuccess(() => true);

      try {
        const response = await postData(data, PATHS.googleOAUTH);

        if (response.status === 200) {
          setSuccess(() => true);
          setMessage("Registration successful!");

          const token = response.data.token;
          // Storing token
          localStorage.setItem("token", token);
          setToken(() => token);
          
          // Set LoggedIn state
          setLoggedIn(() => true);

          if (Object.keys(book).length !== 0) {
            navigate("/checkout");
          } else {
            navigate("/dashboard", {replace: true});
          }
        }
      } catch(error) {
        setOauthSuccess(() => false);
        setError("An error occured, try again.");
        setStatus(() => "normal");
      }
    },
    onError: () => {
      setStatus(() => "normal");
      setError("An error occured, try again.");
    },
    flow: "auth-code"
  });

  return (
    <>
      {
        oauthSuccess ? (
          <LoginSpinner />
        ) : (
          <>
            <section id="login">
              <div className="container mx-auto flex min-h-[80vh]">
                <article className="w-1/2 py-20 px-10 flex flex-col items-center justify-center">
                    <h1 className="font-serif text-left w-full text-3xl font-extrabold">Welcome back</h1>
                    <p className="w-full mt-2">Welcome back! Please enter your details</p>

                    <div className="w-full mt-2">
                      <div className="flex flex-col gap-4">
                        <button onClick={() => {
                          setStatus(() => "loading");
                          login();
                        }} className="group text-google text-xl py-3 px-5 rounded-md 
                            border border-google flex gap-6 w-max">
                          <img src={googleLogo} className="h-6 w-6 transition-transform" alt="Google logo" />
                          <span className="">Login with Google</span>
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} id="login" method="post" className="w-full mt-6 space-y-4 sm:space-y-4">
                      {
                        /** Error message */
                        error && (
                          <Message type="error" message={error} status={true} />
                        )
                      }
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="username" text="Username" />
                        <div>
                          <Input type="text" disabled={status === "loading"} placeholder="Username" name="username" id="username" reff={nameRef} handleChange={handleName} error={nameError !== ""} />
                          <Error active={nameError} text={nameError} />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                          <Label htmlFor="password" text="Password" />
                        <div>
                          <Input type="password" disabled={status === "loading"} placeholder="Password" name="password" id="password" reff={passwordRef} handleChange={handlePassword} error={passwordError !== ""} />
                          <Error active={passwordError} text={passwordError} />
                        </div>
                      </div>
                      <div className="flex justify-center mt-8 sm:mt-10">
                        <button type="submit" disabled={status === "loading"}
                            className="flex flex-row items-center text-base font-semibold px-5 py-4 bg-primary rounded-md w-full justify-center
                              text-white gap-x-2 drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed outline-offset-2 outline-primary outline-1 focus:outline
                              active:drop-shadow-none hover:bg-primaryDark">
                          <span className={`text-lg sm:text-xl`}>{status === "loading" ? "Logging in...." : "Login"}</span>
                        </button>
                      </div>
                    </form>
                    <p className="mt-4">
                      Dont have an account? <Link to="/register" className="text-primary font-bold">Sign up</Link>
                    </p>
                </article>
                <article className="w-1/2 bg-slate-100 flex items-center justify-center">
                  <div className="bg-gradient-to-b from-slate-200 to-primary h-60 w-60 rounded-full">&nbsp;</div>
                </article>
              </div>
            </section>
            {
              success && (
                <div className="fixed left-4 bottom-4 flex flex-col space-y-4 z-10">
                  <Message type="success" message={message} status={success} />
                </div>
              )
            }
          </>
        )
      }
    </>
  )
}

export default Login