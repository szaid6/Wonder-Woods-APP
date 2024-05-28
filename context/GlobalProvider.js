import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // check if the user is authenticated
        // if the user is authenticated, setIsAuthenticated to true
        // else, setIsAuthenticated to false
        setIsAuthenticated(false);
        setIsLoading(false);
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                // user,
                // setUser,
                isAuthenticated,
                setIsAuthenticated,
                isLoading,
                setIsLoading
            }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;