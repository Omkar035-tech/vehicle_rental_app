export default {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('vehicle_info', [
            {
                id: 1,
                model: "Slx",
                company: "Volkswagon",
                releasedIn: 2022,
                dailyCost: 500.00,
                vehicleDataId: 1, // Corresponds to 'Hatchback' in vehicle_data
                vehicleImg: "https://i.ibb.co/Q3hxFQLc/pngimg-com-volkswagen-PNG1821.png",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                model: "Swift",
                company: "Suzuli",
                releasedIn: 2022,
                dailyCost: 500.00,
                vehicleDataId: 1, // Corresponds to 'Hatchback' in vehicle_data
                vehicleImg: "https://e7.pngegg.com/pngimages/863/377/png-clipart-gray-susuzki-swift-5-door-hatchback-suzuki-swift-car-suzuki-ignis-suzuki-sx4-suzuki-compact-car-driving.png",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                model: "Bullet 350",
                company: "Royal Enfield",
                releasedIn: 2021,
                dailyCost: 400.00,
                vehicleDataId: 4, // Corresponds to 'Cruiser Bike' in vehicle_data
                vehicleImg: "https://w7.pngwing.com/pngs/343/157/png-transparent-royal-enfield-bullet-car-royal-enfield-classic-motorcycle-car-car-motorcycle-vehicle.png",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 4,
                model: "Model S",
                company: "Tesla",
                releasedIn: 2020,
                dailyCost: 700.00,
                vehicleDataId: 3, // Corresponds to 'Sedan' in vehicle_data
                vehicleImg: "https://i.pinimg.com/736x/95/17/58/95175882ef1ac88ebbf88a4cddfd9fa2.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 5,
                model: "Activa",
                company: "Honda",
                releasedIn: 2019,
                dailyCost: 200.00,
                vehicleDataId: 5, // Corresponds to 'Scooter' in vehicle_data
                vehicleImg: "https://i.pinimg.com/736x/4f/bc/80/4fbc8094199eaf4881820ddf7a24323c.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 6,
                model: "Desire",
                company: "Hundei",
                releasedIn: 2019,
                dailyCost: 200.00,
                vehicleDataId: 2, // Corresponds to 'SUV' in vehicle_data
                vehicleImg: "https://e7.pngegg.com/pngimages/953/928/png-clipart-white-hyundai-santa-fe-suv-illustration-hyundai-suv-transport-cars.png",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('vehicle_info', null, {});
    }
};