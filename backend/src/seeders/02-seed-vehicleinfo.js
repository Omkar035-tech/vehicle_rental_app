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
                vehicleImg: "https://e7.pngegg.com/pngimages/172/932/png-clipart-2016-honda-civic-2018-honda-civic-honda-civic-type-r-2017-honda-civic-honda-compact-car-sedan-thumbnail.png",
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
                vehicleImg: "https://w7.pngwing.com/pngs/343/157/png-transparent-royal-enfield-bullet-car-royal-enfield-classic-motorcycle-car-car-motorcycle-vehicle.png",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('vehicle_info', null, {});
    }
};
