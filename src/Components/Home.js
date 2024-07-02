import React from "react";
import ChaseImage from '/Users/admin/learning-react/src/assests/chase-white.png'; 
import BackgroundImage from '/Users/admin/learning-react/src/assests/back.png';  
import PawPrintImage from '/Users/admin/learning-react/src/assests/paw.png'; 

function Home() {
    const sectionTitleStyle = {
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
    };

    const healthConcernsTitleStyle = {
        ...sectionTitleStyle,
        backgroundPosition: 'top 0px center',
    };

    const ownersInfoTitleStyle = {
        ...sectionTitleStyle,
        backgroundPosition: 'bottom -5px center',
    };

    const fontStyle = {
        fontFamily: 'Merriweather, serif',
        fontSize: '20px',
    };

    const labelStyle = {
        fontSize: '22px',
        fontWeight: 'bold'
    };

    const dataStyle = {
        fontSize: '22px'
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ ...fontStyle, backgroundImage: `url(${PawPrintImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundColor: '#ffffff' }}>
            <div className="container mx-auto p-4 flex-grow" style={{ padding: '20px' }}>
                <div className="border-2 border-gray-300 p-6 rounded-md shadow-md bg-white max-w-7xl mx-auto">
                    <div className="text-white p-4 rounded-t-md section-title" style={sectionTitleStyle}>
                        <h1 className="text-5xl font-bold">Pet Health Record</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="md:col-span-2">
                            <div className="text-white p-2 rounded-md section-title" style={sectionTitleStyle}>
                                <h2 className="text-4xl font-semibold">Pet Information</h2>
                            </div>
                            <div className="flex flex-wrap mt-4">
                                <div className="w-full md:w-1/3">
                                    <img src={ChaseImage} alt="Chase" className="w-full h-auto rounded-md shadow-md" />
                                </div>
                                <div className="w-full md:w-2/3 md:pl-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block" style={labelStyle}>Pet Name:</label>
                                            <p className="border p-2 rounded-md" style={dataStyle}>Chase</p>
                                        </div>
                                        <div>
                                            <label className="block" style={labelStyle}>Gender:</label>
                                            <p className="border p-2 rounded-md" style={dataStyle}>Male</p>
                                        </div>
                                        <div>
                                            <label className="block" style={labelStyle}>Pet Age:</label>
                                            <p className="border p-2 rounded-md" style={dataStyle}>13</p>
                                        </div>
                                        <div>
                                            <label className="block" style={labelStyle}>Weight:</label>
                                            <p className="border p-2 rounded-md" style={dataStyle}>20 kg</p>
                                        </div>
                                        <div>
                                            <label className="block" style={labelStyle}>Birth Date:</label>
                                            <p className="border p-2 rounded-md" style={dataStyle}>21/07/2011</p>
                                        </div>
                                        <div>
                                            <label className="block" style={labelStyle}>Breed:</label>
                                            <p className="border p-2 rounded-md" style={dataStyle}>Beagle</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div className="text-white p-2 rounded-md section-title" style={healthConcernsTitleStyle}>
                                <h2 className="text-4xl font-semibold">Health Concerns</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-4">
                                <div>
                                    <label className="block" style={labelStyle}>Allergies:</label>
                                    <p className="border p-2 rounded-md" style={dataStyle}>None</p>
                                </div>
                                <div>
                                    <label className="block" style={labelStyle}>Existing Conditions:</label>
                                    <p className="border p-2 rounded-md" style={dataStyle}>None</p>
                                </div>
                                <div>
                                    <label className="block" style={labelStyle}>Veterinarian:</label>
                                    <p className="border p-2 rounded-md" style={dataStyle}>Dr. Smith</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-white p-2 mt-4 rounded-md section-title" style={ownersInfoTitleStyle}>
                        <h2 className="text-4xl font-semibold">Owner's Information</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block" style={labelStyle}>Name:</label>
                            <p className="border p-2 rounded-md" style={dataStyle}>Elad Kadosh</p>
                        </div>
                        <div>
                            <label className="block" style={labelStyle}>Phone:</label>
                            <p className="border p-2 rounded-md" style={dataStyle}>054-7870214</p>
                        </div>
                        <div>
                            <label className="block" style={labelStyle}>Email:</label>
                            <p className="border p-2 rounded-md" style={dataStyle}>elad.kadosh3@gmail.com</p>
                        </div>
                        <div>
                            <label className="block" style={labelStyle}>Address:</label>
                            <p className="border p-2 rounded-md" style={dataStyle}>Hagalil 91, Ganey Tikva</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-200 text-center text-xs p-3 mt-auto">
                &copy; Copyright 2024
            </footer>
        </div>
    );
}

export default Home;
