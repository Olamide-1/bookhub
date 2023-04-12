import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../img/svgs/google.svg";
import Input from "./../Components/Input";
import Label from "./../Components/Label";
import Error from "./../Components/Error";
import Message from "./../Components/Message";
import { useFetch } from "./../Context/FetchContext";
import LoginSpinner from "./../Components/LoginSpinner";
import { useBook } from "./../Context/BookContext";
import { PATHS } from "./../Routes/urls";
import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  const nameRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const { postData, setToken, setLoggedIn } = useFetch();
  const navigate = useNavigate();
  const { book } = useBook();
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [status, setStatus] = useState("normal");
  const [success, setSuccess] = useState(false);
  const [oauthSuccess, setOauthSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleBlankInput = (objRef, setErrorObj, errorMessage) => {
    /**
     * objRef: Used to check the inputs value
     * setErrorObj: Used to set the error state of the input
     * errorMessage: Error message to set in state
     */
    if (objRef.current.value.trim() === "") {
      setErrorObj(() => errorMessage);
    } else {
      setErrorObj(() => "");
    }
  }

  const handleEmail = (e) => {
    /**
     * Handling email validity
     */
    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    
    if (emailRef.current.value.trim() === "") {
      setEmailError(() => "Email is required");
    } else if (emailRegex.test(emailRef.current.value) === false) {
      setEmailError(() => "Invalid email address");
    } else {
      setEmailError(() => "");
    }
  };

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

    if (emailRef.current.value.trim() === "") {
      emailRef.current.focus();
      setEmailError(() => "Email is required");
      bug = true;
    } else {
      setEmailError(() => "");
    }

    if (lastNameRef.current.value.trim() === "") {
      lastNameRef.current.focus();
      setLastNameError(() => "Last name is required");
      bug = true;
    } else {
      setLastNameError(() => "");
    }

    if (firstNameRef.current.value.trim() === "") {
      firstNameRef.current.focus();
      setFirstNameError(() => "First name is required");
      bug = true;
    } else {
      setFirstNameError(() => "");
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
      email: emailRef.current.value.trim(),
      first_name: firstNameRef.current.value.trim(),
      last_name: lastNameRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    }

    try {
      // Send request and await response
      const response = await postData(data, PATHS.register);

      if (response.status === 201) { // Successfully created
        setSuccess(() => true);
        setMessage(() => "Account creacted!");

        setStatus(() => "normal");
        nameRef.current.value = "";
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";

        // Redirect to login after 2 seconds
        setTimeout(() => {

          navigate("/login");
        }, 2000);
      }
    } catch(error) {
        const errors = error.response.data;
        if (errors.email) {
            setEmailError(() => errors.email[0]);
        }
        if (errors.username) {
            setNameError(() => errors.username[0]);
        }

        if (errors.first_name) {
            setFirstNameError(() => errors.first_name[0]);
        }

        if (errors.password) {
          setPasswordError(() => errors.password[0]);
        }

        if (errors.last_name) {
          setLastNameError(() => errors.last_name[0]);
        }
        setError(() => `${error.response.statusText}!`)  
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
      setError(() => "An error occured, try again.");
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
            <section id="register">
              <div className="container mx-auto flex min-h-[80vh]">
                <article className="w-1/2 bg-slate-100 flex items-center justify-center">
                  <div className="bg-gradient-to-t from-slate-200 to-primary h-60 w-60 rounded-full">&nbsp;</div>
                </article>

                <article className="w-1/2 py-20 px-10 flex flex-col items-center justify-center">
                    <h1 className="font-serif text-left w-full text-3xl font-extrabold">Create an account</h1>
                    <p className="w-full mt-2">Join us today!</p>

                    <div className="w-full mt-2">
                      <div className="flex flex-col gap-4">
                        <button onClick={() => {
                          setStatus(() => "loading");
                          login();
                        }} className="group text-google text-xl py-3 px-5 rounded-md 
                            border border-google flex gap-6 w-max">
                          <img src={googleLogo} className="h-6 w-6 transition-transform" alt="Google logo" />
                          <span className="group-hover:underline">Signup with Google</span>
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} id="register" method="post" className="w-full mt-6 space-y-4 sm:space-y-6">
                      {
                        /** Error message */
                        error && (
                          <Message type="error" message={error} status={true} />
                        )
                      }
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="username" text="Username" />
                        <div>
                          <Input type="text" disabled={status === "loading"} placeholder="Username" name="username" id="username" reff={nameRef} handleChange={() => handleBlankInput(nameRef, setNameError, "Name is required")} error={nameError !== ""} />
                          <Error active={nameError} text={nameError} />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="firstname" text="First name" />
                        <div>
                          <Input type="text" disabled={status === "loading"} placeholder="First name" name="firstname" id="firstname" reff={firstNameRef} handleChange={() => handleBlankInput(firstNameRef, setFirstNameError, "First name is required")} error={firstNameError !== ""} />
                          <Error active={firstNameError} text={firstNameError} />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="lastname" text="Last name" />
                        <div>
                          <Input type="text" disabled={status === "loading"} placeholder="Last name" name="lastname" id="lastname" reff={lastNameRef} handleChange={() => handleBlankInput(lastNameRef, setLastNameError, "Last name is required")} error={lastNameError !== ""} />
                          <Error active={lastNameError} text={lastNameError} />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="email" text="Email" />
                        <div>
                          <Input type="text" disabled={status === "loading"} placeholder="Email" name="email" id="email" reff={emailRef} handleChange={handleEmail} error={emailError !== ""} />
                          <Error active={emailError} text={emailError} />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                          <Label htmlFor="password" text="Password" />
                        <div>
                          <Input type="password" disabled={status === "loading"} placeholder="Password" name="password" id="password" reff={passwordRef} handleChange={() => handleBlankInput(passwordRef, setPasswordError, "Password is required")} error={passwordError !== ""} />
                          <Error active={passwordError} text={passwordError} />
                        </div>
                      </div>
                      <div className="flex justify-center mt-8 sm:mt-10">
                        <button type="submit" disabled={status === "loading"}
                            className="flex flex-row items-center text-base font-semibold px-5 py-4 bg-primary rounded-md w-full justify-center
                              text-white gap-x-2 drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed outline-offset-2 outline-primary outline-1 focus:outline
                              active:drop-shadow-none hover:bg-primaryDark">
                          <span className={`text-lg sm:text-xl`}>{status === "loading" ? "Registering...." : "Register"}</span>
                        </button>
                      </div>
                    </form>
                    <p className="mt-4">
                      Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link>
                    </p>
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
        )}
    </>

  )
}

export default Login