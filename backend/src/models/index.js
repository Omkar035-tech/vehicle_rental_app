// import VehicleData from './vehicledata.js';
// import VehicleInfo from './vehicleinfo.js';
// import Booking from './booking.js';

// const models = {
//     VehicleData,
//     VehicleInfo,
//     Booking
// };

// // Setup associations between models 
// Object.keys(models).forEach(modelName => {
//     if (models[modelName].associate) {
//         models[modelName].associate(models);
//     }
// });

// export { VehicleData, VehicleInfo, Booking };


import sequelize from '../utils/db.js';
import VehicleDataModel from './vehicledata.js';
import VehicleInfoModel from './vehicleinfo.js';
import BookingModel from './booking.js';

// Initialize models with sequelize instance
const VehicleData = VehicleDataModel(sequelize);
const VehicleInfo = VehicleInfoModel(sequelize);
const Booking = BookingModel(sequelize);

// Store all models in an object
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

export { VehicleData, VehicleInfo, Booking };
export default models;