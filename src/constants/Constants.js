const generateCarsInRadius = (center, radius, count, yardId) => {
  const cars = [];
 
  for (let i = 0; i < count; i++) {
    const r = radius * Math.sqrt(Math.random()); // uniform distribution within circle
    const theta = Math.random() * 2 * Math.PI;
 
    const dx = (r * Math.cos(theta)) / 111320; // convert meters to degrees (approx)
    const dy = (r * Math.sin(theta)) / 110540;
 
    cars.push({
      id: `${yardId}-${i + 1}`,
      latitude: center.latitude + dy,
      longitude: center.longitude + dx,
    });
  }
 
  return cars;
};
 
export const parkingYards = [
  {
    id: 1,
    name: 'Parking Yard 1',
    center: { latitude: 37.78725, longitude: -122.4324 },
    radius: 100,
    cars: generateCarsInRadius({ latitude: 37.78725, longitude: -122.4324 }, 100, 20, '1'),
  },
  {
    id: 2,
    name: 'Parking Yard 2',
    center: { latitude: 37.78825, longitude: -122.4360 },
    radius: 100,
    cars: generateCarsInRadius({ latitude: 37.78825, longitude: -122.4360 }, 100, 20, '2'),
  },
  {
    id: 3,
    name: 'Parking Yard 3',
    center: { latitude: 37.78925, longitude: -122.4380 },
    radius: 100,
    cars: generateCarsInRadius({ latitude: 37.78925, longitude: -122.4380 }, 100, 20, '3'),
  },
];
 
 
export const parkingYard = [
  {
    id: 2,
    name: 'Parking Yard 1',
    center: {latitude: 37.78925, longitude: -122.4224},
    radius: 100,
    cars: [
      {id: '2-1', latitude: 37.78935, longitude: -122.4223},
      {id: '2-2', latitude: 37.78915, longitude: -122.4225},
      {id: '2-3', latitude: 37.7892, longitude: -122.4222},
      {id: '2-4', latitude: 37.7893, longitude: -122.4226},
      {id: '2-5', latitude: 37.7891, longitude: -122.4224},
      {id: '2-6', latitude: 37.7894, longitude: -122.4221},
      {id: '2-7', latitude: 37.78928, longitude: -122.4227},
      {id: '2-8', latitude: 37.78922, longitude: -122.422},
      {id: '2-9', latitude: 37.78918, longitude: -122.4226},
      {id: '2-10', latitude: 37.78932, longitude: -122.4223},
    ],
  },
 
];


export const SingleVehInparkingYard = [
  {
    id: 2,
    name: 'Parking Yard 1',
    center: {latitude: 37.78925, longitude: -122.4224},
    radius: 100,
    cars: [
      {id: '2-1', latitude: 37.78935, longitude: -122.4223},
    ],
  },
 
];