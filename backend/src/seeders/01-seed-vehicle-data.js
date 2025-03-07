export default {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('vehicle_data', [
            {
                name: 'Hatchback',
                wheelCount: 4,
                placeImg: "https://pixcap.com/cdn/library/templates/ae3238cd-236a-4487-b6dd-3a9219868786/thumbnail/8d38665a-4199-41ca-b6b5-9da872feea8f_transparent_400_400.webp",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'SUV',
                wheelCount: 4,
                placeImg: "https://cdn3d.iconscout.com/3d/premium/thumb/suv-car-3d-icon-download-in-png-blend-fbx-gltf-file-formats--transportation-vehicle-wheel-transport-travel-pack-icons-11069562.png?f=webp",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Sedan',
                wheelCount: 4,
                placeImg: "https://cdn3d.iconscout.com/3d/premium/thumb/coupe-3d-icon-download-in-png-blend-fbx-gltf-file-formats--car-auto-vehicle-automobile-vol-1-pack-icons-8579908.png",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Cruiser Bike',
                wheelCount: 2,
                placeImg: "https://cdn3d.iconscout.com/3d/premium/thumb/motorbike-3d-icon-download-in-png-blend-fbx-gltf-file-formats--motorcycle-motor-travel-ride-vehicle-vol-2-pack-icons-8541915.png",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Scooter',
                wheelCount: 2,
                placeImg: "https://cdn3d.iconscout.com/3d/premium/thumb/scooter-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bike-two-wheeler-minibike-motor-vehicles-pack-vehicle-icons-4553140.png?f=webp",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('vehicle_data', null, {});
    }
};
