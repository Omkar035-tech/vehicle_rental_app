export default {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('vehicleInfo', [
            {
                id: 1,
                model: "Civic",
                company: "Honda",
                releasedIn: 2022,
                dailyCost: 500.00,
                vehicleDataId: 1
            },
            {
                id: 2,
                model: "Bullet 350",
                company: "Royal Enfield",
                releasedIn: 2021,
                dailyCost: 400.00,
                vehicleDataId: 4
            }
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('vehicleInfo', null, {});
    }
};
