export default {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('bookings', [
            {
                id: 1,
                startDate: "2024-03-10",
                endDate: "2024-03-15",
                customerFirstName: "John",
                customerLastName: "Doe",
                totalPrice: 250.00,
                status: "CONFIRMED",
                vehicleId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('bookings', null, {});
    }
};
