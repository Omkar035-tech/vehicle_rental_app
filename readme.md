# Vehicle Rental System 🚗🏍️

Welcome to the Vehicle Rental System! This project allows users to book vehicles, including cars and bikes, with an intuitive frontend form-based interface. It incorporates backend validation, dynamic vehicle selection, and seamless booking features. Below is a breakdown of the project structure, technologies used, and features implemented.

---

## 📋 Features

### Backend Features
- **User Input Validation**: Ensures correct input and data types for each request.
- **Vehicle Booking System**:
  - Prevents booking overlap (ensures only one vehicle of each type can be booked at a time).
  - Receives and processes booking requests.
- **Database Management**:
  - Utilizes an SQL-based database.
  - Uses ORM (Object-Relational Mapping) for data handling and interaction.
  - Seeds the database with initial data (vehicle types, vehicles).
  
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

### Backend
- **Node.js** with a chosen framework (Express.js)
- **SQL Database** (PostgreSQL)
- **ORM** (Sequelize)

### Frontend
- **React.js**
- **Material UI** (for UI components and theming)
- **Tailwind CSS** (for utility-first styling)

---

## 🏁 Getting Started

### Prerequisites
1. **Node.js** installed on your machine.
2. **npm** (or **yarn**) to install dependencies.
3. **SQL Database** setup ( PostgreSQL).

### Setup Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/Omkar035-tech/vehicle_rental_app.git
   cd vehicle-rental-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup the database:
   - Update the **config** file with your database credentials.
   - Run database migrations: [Note : Work only ENV-Development]
     ```bash
     npm run migrate
     ```
   - Seed initial data into the database:
     ```bash
     npm run seed
     ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

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

---

## 🌱 Database Seed

The database is pre-seeded with initial values including:
- **3 car types**: Hatchback, SUV, Sedan
- **1 bike type**: Cruiser,Scooter
- A few vehicles associated with each type (both cars and bikes).

---

## 📱 Frontend Form Flow

1. **Name Input**: 
   - User enters their first and last name.
  
2. **Number of Wheels**: 
   - A radio button selection for either 2 or 4 wheels.
  
3. **Type of Vehicle**: 
   - A radio button selection dynamically updated based on the number of wheels chosen (cars for 4 wheels, bikes for 2 wheels).
  
4. **Specific Vehicle Model**: 
   - The user is presented with a list of vehicle models filtered by type (Car/Bike).
  
5. **Date Range Picker**: 
   - Users can choose the start and end date for their booking.

### Example Flow:
- Select "2 wheels" → available options: **Cruiser, Scooter** bikes.
- Select "4 wheels" → available options: **Hatchback, SUV, Sedan**.

Once all questions are answered, the data is sent to the backend for booking validation and processing.

---

## 🏗️ Database Migrations

To ensure the correct structure of your database, this project includes migrations for creating the necessary tables (for vehicles, types, and bookings). You can run the migrations by executing the following:

```bash
npm run migrate
```

---

## 🧑‍💻 API Endpoints

### 1. **GET /api/vehicles**  
Retrieve available vehicles based on the user's selection of wheels and vehicle type.

### 2. **POST /api/booking**  
Submit the booking request. Ensures no overlapping bookings for the same vehicle.

- **Payload**: 
  ```json
  {
    "name": "John Doe",
    "numberOfWheels": 4,
    "vehicleType": "SUV",
    "vehicleModel": "Toyota Highlander",
    "startDate": "2025-03-10",
    "endDate": "2025-03-15"
  }
  ```

---

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