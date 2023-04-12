import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { useBook } from "./../Context/BookContext";
import Spinner from "./../Components/Spinner";
import { useFetch } from "./../Context/FetchContext";
import { PATHS } from "./../Routes/urls";

function CheckoutOauth() {
    const { book } = useBook();
    const navigate = useRef(useNavigate());
    const { postWithToken, token } = useFetch();
    const [loading, setLoading] = useState(true);
    
    const postWithRef = useRef(postWithToken);
    const tokenRef = useRef(token)

    useEffect(() => {
        let ignore = false;
        const abortController = new AbortController();
        // If no book is in the cart redirect to home page
        if (Object.keys(book).length === 0) {
            navigate.current("/");
            return;
        } else {
            // Get query string
            const queryStr = window.location.search;
        
            // Extract the query strings from the query paraneters
            const urlParams = new URLSearchParams(queryStr);
        
            const code = urlParams.get("code"); // Extract code from url
        
            if (code) {
                const testTransfer = async () => {
                    const data = {
                        "code": code,
                        "book_id": book.book_id,
                    }
                    
                    try {
                        const response = await postWithRef.current(data, PATHS.walletOAUTH, tokenRef.current, abortController.signal);
            
                        if (response.status === 200) {
                            setLoading(() => false);
                            localStorage.setItem("book", "{}");
                            navigate.current("/dashboard", {replace: true});
                        }
                    } catch(error) {
                        if (!ignore) {
                            setLoading(() => false);
                            navigate.current("/checkout");
                        }
                    }
                }
                
                testTransfer();
            } else {
                // Redirect
                if (!ignore) {
                    navigate.current("/checkout");
                    setLoading(() => false);
                }
            }
        }
        return () => {
            ignore = true;
            abortController.abort();
        }
    }, [book]);

    return (
        <>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <Navigate to="/dashboard" />
                )
            }
        </>
    )
}

export default CheckoutOauth;
