export default {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('vehicle_data', [
            {
                name: 'Hatchback',
                wheelCount: 4,
                placeImg: "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'SUV',
                wheelCount: 4,
                placeImg: "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Sedan',
                wheelCount: 4,
                placeImg: "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Cruiser Bike',
                wheelCount: 2,
                placeImg: "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('vehicle_data', null, {});
    }
};
