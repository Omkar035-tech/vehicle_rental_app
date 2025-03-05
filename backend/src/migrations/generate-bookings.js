export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            startDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            endDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            customerFirstName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            customerLastName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            totalPrice: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'),
                defaultValue: 'PENDING',
                allowNull: false
            },
            vehicleId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'vehicles',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.addIndex('bookings', ['vehicleId']);
        await queryInterface.addIndex('bookings', ['startDate', 'endDate']);
        await queryInterface.addIndex('bookings', ['status']);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('bookings');
    }
};