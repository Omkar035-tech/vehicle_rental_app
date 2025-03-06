export default {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('vehicle_info', [
            {
                id: 1,
                model: "Civic",
                company: "Honda",
                releasedIn: 2022,
                dailyCost: 500.00,
                vehicleDataId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                model: "Bullet 350",
                company: "Royal Enfield",
                releasedIn: 2021,
                dailyCost: 400.00,
                vehicleDataId: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('vehicle_info', null, {});
    }
};
