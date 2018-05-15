import { Nation } from './model';

export const nations: Nation[] = [
  {
    id: 1,
    name: 'Germany',
    faction: 'Axis',
    supported_theatres: {
      Europe: true,
      Pacific: false,
    },
  },
  {
    id: 2,
    name: 'USSR',
    faction: 'Allies',
    supported_theatres: {
      Europe: true,
      Pacific: false,
    },
  },
  {
    id: 3,
    name: 'Japan',
    faction: 'Axis',
    supported_theatres: {
      Europe: false,
      Pacific: true,
    },
  },
  {
    id: 4,
    name: 'USA',
    faction: 'Allies',
    supported_theatres: {
      Europe: true,
      Pacific: true,
    },
  },
  {
    id: 5,
    name: 'China',
    faction: 'Allies',
    supported_theatres: {
      Europe: false,
      Pacific: true,
    },
  },
  {
    id: 6,
    name: 'UK West',
    faction: 'Allies',
    supported_theatres: {
      Europe: true,
      Pacific: false,
    },
  },
  {
    id: 7,
    name: 'UK Pacific',
    faction: 'Allies',
    supported_theatres: {
      Europe: false,
      Pacific: true,
    },
  },
  {
    id: 8,
    name: 'Italy',
    faction: 'Axis',
    supported_theatres: {
      Europe: true,
      Pacific: false,
    },
  },
  {
    id: 9,
    name: 'ANZAC',
    faction: 'Allies',
    supported_theatres: {
      Europe: false,
      Pacific: true,
    },
  },
  {
    id: 10,
    name: 'France',
    faction: 'Allies',
    supported_theatres: {
      Europe: true,
      Pacific: false,
    },
  },
];
