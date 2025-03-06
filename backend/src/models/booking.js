import { DataTypes } from 'sequelize';

const Booking = (sequelize) => {
    const BookingModel = sequelize.define('Booking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        customerFirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customerLastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'),
            defaultValue: 'PENDING'
        }
    }, {
        tableName: 'bookings'
    });

    BookingModel.associate = (models) => {
        BookingModel.belongsTo(models.VehicleInfo, {
            foreignKey: 'vehicleId'
        });
    };

    return BookingModel;
};

export default Booking;