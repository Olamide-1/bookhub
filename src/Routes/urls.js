/** BASE URL FOR BACKEND API */
const baseURL = "http://booksoreapi-env.eba-3igtf73b.us-east-1.elasticbeanstalk.com";

const PATHS = {
    register: "/account/register/",
    login: "/account/login/",
    details: "/account/details/",
    changePassword: "/account/change-password/",
    fetchBooks: "/book/?page=1&size=10",
    getMyBooks: "/book/my-books/",

    googleOAUTH: "/oauth/google-auth/",
    walletOAUTH: "/oauth/wallet-payment/",
};

const clientID = "776429688428-v6j8mk4ei83nkmgi6vvpbcfo2ma8r47j.apps.googleusercontent.com";

const walletURL = "http://wallet-env.eba-gr5bgv3s.eu-north-1.elasticbeanstalk.com";
const walletClientID = "xRTdyvaizhdE4Az1IqTOrTCYbXbgZGCsJUWrtV7A";
const walletCodeChallange = "7pv0xJir-5nl3uAnh4-stnIWlymb6MAQ6-cypRPkG8M";
const redirectURI = "http://localhost:3000/oauth/wallet";

export { baseURL, PATHS, clientID, walletURL, walletClientID, walletCodeChallange, redirectURI };