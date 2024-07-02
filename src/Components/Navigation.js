import React, { useState, useEffect, useRef, createContext } from "react";

const NavigationContext = createContext();

function NavigationProvider({ children }) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <NavigationContext.Provider value={{ showMenu, setShowMenu }}>
            {children}
        </NavigationContext.Provider>
    );
}

export { NavigationProvider, NavigationContext };
