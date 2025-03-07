export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('vehicle_info', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            model: {
                type: Sequelize.STRING,
                allowNull: false
            },
            company: {
                type: Sequelize.STRING,
                allowNull: false
            },
            releasedIn: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            dailyCost: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            vehicleDataId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'vehicle_data',
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
            },
            VehicleImg: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
        await queryInterface.addIndex('vehicle_info', ['vehicleDataId']);
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('vehicle_info');
    }
};
