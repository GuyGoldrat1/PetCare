import React from "react";
import BackgroundImage from '/Users/admin/learning-react/src/assests/back.png';
import DogCatImage from '/Users/admin/learning-react/src/assests/dog-cat.png';

function MedicalBag() {
    const medicalHistory = [
        { date: "03/08/2016", description: "Fecal/Deworming", veterinarian: "John Smith", diagnosis: "Fecal/Deworming", tests: "Fecal/Deworming", results: "Done", action: "NA", medication: "NA", comments: "NA" },
        { date: "07/04/2019", description: "Heartworm preventative", veterinarian: "John Smith", diagnosis: "Heartworm preventative", tests: "Heartworm preventative", results: "Done", action: "NA", medication: "NA", comments: "NA" },
        { date: "05/03/2020", description: "Flea and Tick Treatment", veterinarian: "John Smith", diagnosis: "Flea and Tick Treatment", tests: "Flea and Tick Treatment", results: "Done", action: "NA", medication: "NA", comments: "NA" },
        { date: "01/04/2021", description: "Heartworm preventative", veterinarian: "John Smith", diagnosis: "Heartworm preventative", tests: "Heartworm preventative", results: "Done", action: "NA", medication: "NA", comments: "NA" },
        { date: "11/01/2023", description: "Does not want to eat", veterinarian: "John Smith", diagnosis: "Teeth Problems", tests: "General", results: "Done", action: "Monitor and provide water", medication: "NA", comments: "NA" },
    ];

    const immunizationHistory = [
        { age: "1 year", vaccines: ["Rabies", "Bordatella"] },
        { age: "2 years", vaccines: ["DHPP", "Lepto"] },
        { age: "3 years", vaccines: ["Lyme", "Influenza"] },
        { age: "4 years", vaccines: ["Rabies"] },
        { age: "5 years", vaccines: ["DHPP"] },
        { age: "6 years", vaccines: ["Lyme"] },
        { age: "7 years", vaccines: ["Bordatella"] },
        { age: "8 years", vaccines: ["Lepto"] },
        { age: "9 years", vaccines: ["Influenza"] },
        { age: "10 years", vaccines: ["Rabies"] },
        { age: "11 years", vaccines: ["DHPP"] },
        { age: "12 years", vaccines: ["Lyme"] },
        { age: "13 years", vaccines: ["Bordatella"] },
    ];

    const sectionTitleStyle = {
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
    };

    const fontStyle = {
        fontFamily: 'Merriweather, serif',
        fontSize: '20px'
    };

    return (
        <div className="p-4" style={{ ...fontStyle }}>
            <div className="text-white p-4 rounded-t-md section-title" style={sectionTitleStyle}>
                <h1 className="text-3xl font-bold">Medical History</h1>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Veterinarian</th>
                        <th className="py-2 px-4 border-b">Diagnosis</th>
                        <th className="py-2 px-4 border-b">Tests Performed</th>
                        <th className="py-2 px-4 border-b">Test Results</th>
                        <th className="py-2 px-4 border-b">Action</th>
                        <th className="py-2 px-4 border-b">Medication</th>
                        <th className="py-2 px-4 border-b">Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {medicalHistory.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{item.date}</td>
                            <td className="py-2 px-4 border-b">{item.description}</td>
                            <td className="py-2 px-4 border-b">{item.veterinarian}</td>
                            <td className="py-2 px-4 border-b">{item.diagnosis}</td>
                            <td className="py-2 px-4 border-b">{item.tests}</td>
                            <td className="py-2 px-4 border-b">{item.results}</td>
                            <td className="py-2 px-4 border-b">{item.action}</td>
                            <td className="py-2 px-4 border-b">{item.medication}</td>
                            <td className="py-2 px-4 border-b">{item.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-wrap mt-8">
                <div className="w-full md:w-1/2">
                    <div className="text-white p-4 rounded-t-md section-title" style={sectionTitleStyle}>
                        <h1 className="text-3xl font-bold">Immunization History</h1>
                    </div>
                    <table className="min-w-full bg-white mt-4">
                        <thead>
                            <tr>
                                <th className="py-2 px-2 border-b text-center">Age</th>
                                <th className="py-2 px-2 border-b text-center">Vaccines</th>
                            </tr>
                        </thead>
                        <tbody>
                            {immunizationHistory.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-2 border-b text-center">{item.age}</td>
                                    <td className="py-2 px-2 border-b text-center">{item.vaccines.join(', ')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center mt-4 md:mt-0">
                    <div className="mb-8">
                        <label className="block font-semibold">Medical files to upload:</label>
                        <input type="file" className="border p-2 rounded-md" />
                    </div>
                    <div className="mt-10"></div> {/* Adds some space between the file input and the image */}
                    <img src={DogCatImage} alt="Dog and Cat" className="w-3/4 h-auto rounded-md shadow-md mt-4" />
                </div>
            </div>
        </div>
    );
}

export default MedicalBag;
