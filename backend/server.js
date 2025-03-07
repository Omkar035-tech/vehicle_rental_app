// import express from 'express';
// import cors from 'cors';
// import sequelize from './src/utils/db.js';
// import vehicleRoutes from './src/routes/vehicleRoutes.js';
// import bookingRoutes from './src/routes/bookingRoutes.js';

// cors({ origin: true, credentials: true });


// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/api/vehicles', vehicleRoutes);
// app.use('/api/bookings', bookingRoutes);

// const PORT = process.env.PORT || 3001;

// sequelize.sync();

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// }); 


import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import sequelize from './src/utils/db.js';
import vehicleRoutes from './src/routes/vehicleRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.error('Unable to sync database:', err);
    });

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;