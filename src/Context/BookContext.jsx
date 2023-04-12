import React, { createContext, useContext, useState, useEffect } from "react";

const BookContext = createContext();

const useBook = () => {
    return useContext(BookContext);
}

function BookProvider({ children }) {
    const [book, setBook] = useState({});
    const [paymentError, setPaymentError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const getData = async () => {
            const book = localStorage.getItem("book");

            if (book) {
                setBook(JSON.parse(book));
            }
        }

        getData();
    }, []);

    const value = {
        book,
        setBook,

        paymentError,
        setPaymentError,

        successMessage,
        setSuccessMessage
    };

    return (
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    )
}

export default BookProvider;
export { useBook };