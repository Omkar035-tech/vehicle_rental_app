export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('vehicleInfo', {
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
                    model: 'vehicleData',
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
        await queryInterface.addIndex('vehicleInfo', ['vehicleDataId']);
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('vehicleInfo');
    }
};

