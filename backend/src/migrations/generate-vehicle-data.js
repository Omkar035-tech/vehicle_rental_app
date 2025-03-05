export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('vehicleData', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            wheelCount: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('vehicleData');
    }
};
