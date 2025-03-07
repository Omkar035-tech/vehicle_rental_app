import { DataTypes } from 'sequelize';

const VehicleInfo = (sequelize) => {
    const VehicleInfoModel = sequelize.define('VehicleInfo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        releasedIn: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dailyCost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        vehicleImg: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'vehicle_info'
    });

    VehicleInfoModel.associate = (models) => {
        VehicleInfoModel.belongsTo(models.VehicleData, {
            foreignKey: 'vehicleDataId'
        });
        VehicleInfoModel.hasMany(models.Booking, {
            foreignKey: 'vehicleId'
        });
    };

    return VehicleInfoModel;
};

export default VehicleInfo;