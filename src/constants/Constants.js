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
 
// export const parkingYards = [
//   {
//     id: 1,
//     name: 'Parking Yard 1',
//     center: { latitude: 37.78725, longitude: -122.4324 },
//     radius: 100,
//     cars: generateCarsInRadius({ latitude: 37.78725, longitude: -122.4324 }, 100, 20, '1'),
//   },
//   {
//     id: 2,
//     name: 'Parking Yard 2',
//     center: { latitude: 37.78825, longitude: -122.4360 },
//     radius: 100,
//     cars: generateCarsInRadius({ latitude: 37.78825, longitude: -122.4360 }, 100, 20, '2'),
//   },
//   {
//     id: 3,
//     name: 'Parking Yard 3',
//     center: { latitude: 37.78925, longitude: -122.4380 },
//     radius: 100,
//     cars: generateCarsInRadius({ latitude: 37.78925, longitude: -122.4380 }, 100, 20, '3'),
//   },
// ];
 
export const parkingYards = [
  {
    id: 1,
    name: 'Parking Yard 1 - Truganina',
    center: {latitude: -37.8227, longitude: 144.7415},
    radius: 100,
    cars: generateCarsInRadius(
      {latitude: -37.8227, longitude: 144.7415},
      100,
      20,
      '1',
    ),
  },
  {
    id: 2,
    name: 'Parking Yard 2 - Derrimut',
    center: {latitude: -37.8254, longitude: 144.735},
    radius: 100,
    cars: generateCarsInRadius(
      {latitude: -37.8254, longitude: 144.735},
      100,
      20,
      '2',
    ),
  },
  {
    id: 3,
    name: 'Parking Yard 3 - Laverton North',
    center: {latitude: -37.8292, longitude: 144.740},
    radius: 100,
    cars: generateCarsInRadius(
      {latitude: -37.8292, longitude: 144.740},
      100,
      20,
      '3',
    ),
  },
];
 
export const parkingYard = [
  {
    id: 1,
    name: 'Parking Yard 1 - Truganina',
    center: {latitude: -37.8227, longitude: 144.7415},
    radius: 100,
    cars: generateCarsInRadius(
      {latitude: -37.8227, longitude: 144.7415},
      100,
      20,
      '1',
    ),
  },
];
 
export const SingleVehInparkingYard = [
  {
    id: 1,
    name: 'Parking Yard 1 - Truganina',
    center: {latitude: -37.8227, longitude: 144.7415},
    radius: 100,
    cars: generateCarsInRadius(
      {latitude: -37.8227, longitude: 144.7415},
      100,
      1,
      '1',
    ),
  },
];
 
 