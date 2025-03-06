import VehicleData from './vechicledata.js';
import VehicleInfo from './vehicleinfo.js';
import Booking from './booking.js';

const models = {
    VehicleData,
    VehicleInfo,
    Booking
};

// Setup associations between models 
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export {
    VehicleData,
    VehicleInfo,
    Booking
};