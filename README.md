
# PetCare

## [Visit PetCare Application](https://petcare-c5849.web.app/)

PetCare is a web application dedicated to providing the best care for your pets by connecting you with trusted veterinarians. The platform allows you to manage your pet's medical history, book appointments, and access critical health information.

## Demo Video

[![Watch the video](https://img.youtube.com/vi/E9CtwxKVWwQ/maxresdefault.jpg)](https://youtu.be/E9CtwxKVWwQ)

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Client Workflow](#client-workflow)
- [Vet Workflow](#vet-workflow)
- [Installation](#installation)

## Features

- User Authentication (Sign Up and Login)
- Role-based access (Pet Owners and Veterinarians)
- Manage Pet Medical Records
- Book and Manage Appointments
- Add and View Recommendations for Veterinarians

## Architecture

PetCare is built with a modern, scalable architecture:

- **Frontend**: React Native with Material UI components for responsive and interactive user interfaces.
- **Backend**: Firebase, including Firebase Authentication for user management and Firestore as the real-time database for storing data.
- **Hosting**: The website is hosted using Firebase Hosting, ensuring fast and secure access for users.

## Client Workflow

1. **Book a New Doctor Appointment**:
   - Navigate to the "New Appointment" section.
   - Select your preferred doctor.
   - Choose an available time slot from the dropdown menu.

2. **Find a New Veterinarian**:
   - Go to the "Doctors" tab in the sidebar.
   - Browse through the list of veterinarians and view reviews uploaded by other users.

3. **View Medical History**:
   - Access your past treatments under the "Medical History" section in the sidebar to keep track of your pet's health records.

## Vet Workflow

1. **Dashboard**:
   - The dashboard displays your upcoming client appointments and essential information at a glance.

2. **Open Appointment Slots**:
   - Navigate to the "Appointments" tab in the sidebar.
   - Select a date and time, then click "Add Appointment Slot" to make it available for clients to book.

3. **Add Medical Records**:
   - Go to the "Patients" tab in the sidebar.
   - Select a client and enter the treatment record for their pet, updating the client's medical history.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/PetCare.git
npm init
npm install
cd PetCare
npm start
```
