export default {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('vehicleData', [
            {
                name: 'Hatchback',
                wheelCount: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'SUV',
                wheelCount: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Sedan',
                wheelCount: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Cruiser Bike',
                wheelCount: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('vehicleData', null, {});
    }
};
