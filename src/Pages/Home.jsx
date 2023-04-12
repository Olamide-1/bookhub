import React, { useState, useRef, useEffect } from 'react';
import Book from "./../Components/Book";
import { Link } from "react-router-dom";
import book_image from "./../img/home-books.jpg";
import { useFetch } from "./../Context/FetchContext";
import { PATHS } from "./../Routes/urls";
import { useBook } from "./../Context/BookContext";

function Home() {
    const SIZEOFPAGER = 10;
    const [books, setBooks] = useState([]);
    const { getData } = useFetch();
    const { setBook } = useBook();

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    // Setting up next handlers for pagination
    const nextRef = useRef()
    const [nextCounter, setNextCounter] = useState(SIZEOFPAGER);

    const getWithRef = useRef(getData);
    
    useEffect(() => {
        let ignore = false;

        const getBooks = async () => {
        try {
            // Get categories and transactions
            const response = await getWithRef.current(PATHS.fetchBooks);

            if (!ignore) {
                nextRef.current = response.data.next;

                // Ignore on clean up
                setBooks(() => response.data.results);
            }
            
        } catch(error) {
        }

        setLoading(false);
        }

        getBooks();

        return () => {
        ignore = true;
        };
    }, []);
    

    // Next Fetcher
    const handleFetch = async () => {
        if (nextRef.current) {
            try {
            // Send request to get next sequence of products
            let response = await getWithRef.current(PATHS.fetchBooks);
            response = response.data;
            
            // Set next url
            nextRef.current = response.next;
    
            // Increase counter that controls 'Show more' button visibility
            setNextCounter(prev => prev + SIZEOFPAGER);
    
            // Add the new products to the data
            setBooks(books => [...books, ...response.results])
    
            // Display success message
            setTimeout(() => setSuccess(() => true), 700);
            
            // Remove success message
            setTimeout(() => setSuccess(() => false), 5000);
            } catch (error) {
            }
      }
  
      setLoading(false);
    }

    const spinner = (
        <div className="flex h-20 items-center justify-center">
            <div role="status">
                <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );

  return (
        <>
            <section id="hero" className='pt-10'>
                <div className="container mx-auto flex items-center px-6">
                    <div className="w-full space-y-6 md:w-1/2">
                        <div className="space-y-1">
                            <p className="text-sm font-semibold uppercase">Shop our store</p>

                            <h1 className="font-serif text-5xl text-black font-extrabold">
                                Transforming the world one book at a time.
                            </h1>
                        </div>


                        <p className="max-w-sm text-lg">The brain is like a muscle, the more you read the stronger the neural connections become.</p>
                        
                        <div className="flex">
                            <Link to="/register" className="bg-primary hover:bg-primaryDark outline focus:outline-offset-2 p-4 px-6
                                 text-white rounded-md font-semibold">Join us Today!</Link>
                        </div>
                    </div>

                    <div className="w-1/2 hidden md:block">
                        <img src={book_image} alt="Home books" className="block w-full h-96 object-cover" />
                    </div>
                </div>
            </section>


            <section id="books" className="pb-10 pt-5">
                <div className="container mx-auto mt-6 px-6">
                    <h1 className="font-serif font-extrabold text-black text-center text-5xl sm:text-left">Books</h1>

                    {
                        loading ? (
                            spinner
                        ) : (
                            <div className="flex flex-col items-center flex-wrap mt-4 gap-8 sm:flex-row">
                                {
                                    books.length > 0 ? (
                                        books.map(book => <Book key={book.book_id} book={book} setBook={() => setBook(book)} />)
                                    ) : (
                                        <p className='font-medium'>No books available to purchase.</p>
                                    )
                                }
                            </div>
                        )
                    }

                    {!loading && (books.length > nextCounter) && ( // nextCounter changes as new products are gotten 
                        <div className="flex justify-center mt-8 sm:mt-10">
                        <button type="button" className="text-lg font-semibold px-5 pl-6 py-3 bg-white border border-zinc-700
                                gap-x-2 shadow-md outline-offset-2 outline-zinc-700 outline-1 active:outline rounded-md
                                text-zinc-800 active:drop-shadow-none hover:underline hover:bg-zinc-100 disabled:opacity-75
                                disabled:cursor-not-allowed disabled:no-underline"
                                disabled={loading} onClick={handleFetch}
                                >
                            {!loading ? "Load More" : "Loading...."}
                        </button>
                        </div>
                    )}
                </div>
            </section>
        </>
  )
}

export default Home