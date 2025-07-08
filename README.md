# Dental Center Management System (React Frontend)

## Overview
This project is a web-based frontend for a Dental Center Management System, built using React. It provides distinct dashboards and functionalities for administrative staff and patients, ensuring secure access and streamlined management of patient records, appointments (incidents), and overall clinic operations.

## Features
* **User Authentication:** Secure login for Admin and Patient roles.
* **Role-Based Access Control:** Different functionalities and dashboards are accessible based on user roles.
* **Admin Dashboard:** Overview of total patients, incident statistics (completed, scheduled, canceled), and upcoming appointments.
* **Patient Dashboard:** Personalized view for patients, including their information, upcoming appointments, and past visit history.
* **Patient Data Management:** (If you plan to add CRUD for patients/incidents later) Functionality to view, add, update, and delete patient records and incidents.
* **Responsive UI:** Built with Tailwind CSS for a modern and responsive user experience.

## Technologies Used
* **React.js:** Frontend JavaScript library
* **React Router DOM:** For navigation and routing
* **Tailwind CSS:** For styling
* **Context API:** For state management (AuthContext, DataContext)
* **Local Storage:** For persistent user and dummy data storage
* **uuid:** For generating unique IDs

## Getting Started

### Prerequisites
Make sure you have Node.js and npm (or yarn) installed on your machine.

### Installation
1.  **Clone the repository (if you're a new user setting up the project):**
    ```bash
    git clone https://github.com/karurpriya/Dental-Center-Management.git
    cd YOUR_REPO_NAME
    ```
    *(Note: If you're setting up the existing project as the original developer, you would have initialized Git locally and pushed it, as instructed previously.)*

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application
1.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
2.  Open your browser and navigate to `http://localhost:3000`.

## Login Credentials (Sample Data)

### Admin
* **Email:** `admin@entnt.in`
* **Password:** `dev_admin_pass`  

### Patients
* **Email:** `john@entnt.in`
* **Password:** `dev_patient_pass`
* **Email:** `raj@gmail.com`
* **Password:** `dev_patient_pass` 
* **Email:** `tej@entnt.in`
* **Password:** `dev_patient_pass` 

## Project Status
* Core authentication and routing implemented.
* Admin and Patient dashboards functional with sample data.
* Data context set up for patients and incidents.
* *Add more points as you complete other features.*

## Future Enhancements (Examples)
* Full CRUD operations for patients and incidents.
* More detailed appointment scheduling and management.
* User profile editing.
* Integration with a backend API instead of local storage.
* Advanced reporting and analytics.