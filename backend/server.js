import express from 'express';
import cors from 'cors';
import sequelize from './src/utils/db.js';
import vehicleRoutes from './src/routes/vehicleRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';

cors({ origin: true, credentials: true });


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: true });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 