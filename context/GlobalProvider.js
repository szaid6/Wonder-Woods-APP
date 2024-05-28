import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then((token) => {
                if (token) {
                    setIsAuthenticated(true);
                    setIsLoading(false);
                } else {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                }
            })
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