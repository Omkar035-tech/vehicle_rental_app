// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import BookingForm from './components/BookingForm';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Support from './pages/Support';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<BookingForm />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/support" element={<Support />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BookingForm from './components/BookingForm';
import { BookingProvider } from './context/BookingContext';
import Contact from './pages/Contact';
import Support from './pages/Support';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VehicleBookings from './pages/VehicleBookings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BookingProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<BookingForm />} />
            <Route path="/bookings" element={<VehicleBookings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </BrowserRouter>
        {/* <BookingForm /> */}
      </BookingProvider>
    </ThemeProvider>
  );
}

export default App;