# Vehicle Rental System 🚗🏍️

Welcome to the Vehicle Rental System! This project allows users to book vehicles, including cars and bikes, with an intuitive frontend form-based interface. It incorporates backend validation, dynamic vehicle selection, and seamless booking features. Below is a breakdown of the project structure, technologies used, and features implemented.

---

## 📋 Features
  
### Frontend Features
- **Form-Based Interface**: 
  - Users are guided through a series of steps, answering one question per screen.
  - Each step ensures that the user can proceed only after providing the correct input (validated and error handling).
  
- **Dynamic Vehicle Selection**:
  - Based on user choices, only relevant vehicles will be displayed (e.g., choosing 2 wheels will filter the vehicle options accordingly).
  
- **Responsive UI**: 
  - Built using **React**, **Material UI** for theming, and **Tailwind CSS** for utility classes.
  
---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Material UI** (for UI components and theming)
- **Tailwind CSS** (for utility-first styling)

---

## 🏁 Getting Started


### Frontend Setup
```bash
# Navigate to frontend directory
cd vehicle_rental_app/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure
```
vehicle-rental-booking-system/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── migrations/
│   └── seeders/
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/
    └── public/
```

## Booking Flow
1. Enter Personal Details
   - First Name
   - Last Name

2. Select Number of Wheels
   - 2 wheels
   - 4 wheels

3. Choose Vehicle Type
   - Dynamically populated based on wheel selection
   - Options from database

4. Select Specific Vehicle Model
   - Filtered based on previous selections

5. Pick Rental Dates
   - Start and end date selection
   - Availability checking

## API Endpoints
- `GET /api/vehicle-types`: Retrieve vehicle types
- `GET /api/vehicles`: Get vehicles by type
- `POST /api/bookings`: Submit booking reservation

## Validation Rules
- Name: Both first and last name required
- Wheel Selection: Mandatory
- Vehicle Type: Must match wheel selection
- Vehicle Model: Must be available
- Dates: 
  - End date after start date
  - No overlapping bookings
  - Minimum/maximum rental periods


## 🎈Finalize Work 

**Live URL** - [https://vehicle-rental-app.vercel.app/]
**API Endpoints** - [https://vehiclerentalapp-production.up.railway.app/api/vehicles/types] (Public Access)

---

## 📸 Project Screenshots

Below are some screenshots of the Vehicle Rental System in action:

### 1. **User Input Form**

![User Input Form](https://i.ibb.co/xSQSgtLC/Screenshot-2025-03-07-191201.png)  
![User Input Form](https://i.ibb.co/ZzcnQKHp/Screenshot-2025-03-07-191150.png)  
_The user is asked for their name and the number of wheels for the vehicle._


![Vehicle Data Input Form](https://i.ibb.co/NgnyRs2J/Screenshot-2025-03-07-191238.png)  
_The user is asked for add new vehicle._


![Page where all booking kept](https://i.ibb.co/9kZ86Hdn/Screenshot-2025-03-07-191257.png)  
_All booking shown on booking page._

---

## 🚀 Contributing

We welcome contributions to improve this project! If you'd like to contribute, please fork the repository, create a feature branch, and submit a pull request.

---

## 📄 License

By permission of Author Code Can be used ,modified and shreard anyone

---

## 📧 Contact

For any inquiries or issues, feel free to contact me at [omkarapandkar4u@gmail.com](mailto:omkarapandkar4u@gmail.com).

---

Happy coding! 🚗💨