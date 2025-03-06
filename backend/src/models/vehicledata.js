import { DataTypes } from 'sequelize';

const VehicleData = (sequelize) => {
    const VehicleDataModel = sequelize.define('VehicleData', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        wheelCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'vehicle_data'
    });

    VehicleDataModel.associate = (models) => {
        VehicleDataModel.hasMany(models.VehicleInfo, {
            foreignKey: 'vehicleDataId'
        });
    };

    return VehicleDataModel;
};

export default VehicleData;