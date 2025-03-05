# Vehicle Rental Booking System

## Project Overview

A full-stack web application for seamless vehicle rental bookings, allowing users to easily select and reserve vehicles through an intuitive, step-by-step form interface.

### Key Features
- Multi-step booking process with single-question-per-screen approach
- Support for both 2-wheeler and 4-wheeler vehicle rentals
- Dynamic vehicle type and model selection
- Date range booking with availability checking
- Responsive design for mobile and desktop

## Technology Stack

### Backend
- **Language**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize

### Frontend
- **Framework**: React
- **Styling**: Material UI
- **CSS**: Tailwind CSS (v4)
- **State Management**: Redux Toolkit

## Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Post installed

## Installation

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/Omkar035-tech/vehicle_rental_app.git

# Navigate to backend directory
cd vehicle_rental_app/backend

# Install dependencies
npm install

# Run database migrations
npm run migrate

# Seed initial data
npm run seed

# Start the server
npm start
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

## Future Enhancements
- User authentication
- Payment integration
- More detailed vehicle information
- Advanced filtering options

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Auther retain all rights of code and others can freely use, modify, or distribute it without your explicit permission.

## Contact
Omkar - omkarapandkar4u@gmail.com

Project Link: [https://github.com/Omkar035-tech/vehicle_rental_app.git](https://github.com/Omkar035-tech/vehicle_rental_app.git)