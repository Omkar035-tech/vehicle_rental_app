import express from 'express';
import cors from 'cors';
import sequelize from './src/utils/db.js';
import vehicleRoutes from './src/routes/vehicleRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);

if (process.env.NODE_ENV !== 'production') {
    sequelize.sync()
        .then(() => console.log('Database synchronized'))
        .catch(err => console.error('Failed to sync database:', err));
}

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Vercel
export default app;