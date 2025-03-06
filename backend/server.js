import express from 'express';
import sequelize from './src/utils/db.js';
import vehicleRoutes from './src/routes/vehicleRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/vehicles', vehicleRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: true });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 