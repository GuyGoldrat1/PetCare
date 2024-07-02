import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavigationContext } from "./Navigation";
import PawImage from '/Users/admin/learning-react/src/assests/paw-love.webp'; 

function Header() {
    return (
        <header className="border-b-2 border-black p-2 text-5xl flex justify-between items-center">
            <span className="font-bold flex items-center">
                PetCare
                <img src={PawImage} alt="Paw" className="ml-2 w-12 h-12" />
            </span>

            <NavigationContext.Consumer>
                {({ showMenu, setShowMenu }) => (
                    <nav>
                        <span className="text-3xl"> {/* Increased font size */}
                            <FontAwesomeIcon 
                                icon={faBars} 
                                onClick={() => setShowMenu(!showMenu)}
                                className="cursor-pointer"
                            />
                        </span> 

                        {showMenu && (
                            <div className="fixed bg-white top-0 left-0 w-150 h-full z-50 shadow">
                                <div className="p-4">
                                    <h2 className="text-2xl font-bold mb-4">Menu</h2>
                                    <ul>
                                        <li className="mb-2"><a href="/">Home</a></li>
                                        <li className="mb-2"><a href="/medical-bag">Medical History</a></li>
                                        <li className="mb-2"><a href="/appointments">Appointments Vet</a></li>
                                        <li className="mb-2"><a href="/chat">Chat 24/7</a></li>
                                        <li className="mb-2"><a href="/about">About</a></li>
                                        <li className="mb-2"><a href="/contact">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {showMenu && (
                            <div 
                                className="bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full z-40"
                                onClick={() => setShowMenu(false)}
                            ></div>
                        )}
                    </nav>
                )}
            </NavigationContext.Consumer>
        </header>
    )
}

export default Header;
