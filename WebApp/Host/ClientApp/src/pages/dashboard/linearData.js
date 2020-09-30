import moment from 'moment';

const mock = [
  {
    "id": 0,
    "name": "series 0",
    "color": 'red',
    "series": [
      {
        id: 1,
        name: 'name 1',
        dt: moment().add(-10, 'h'),
        value: 10
      },
      {
        id: 2,
        name: 'name 2',
        dt: moment().add(-9, 'h'),
        value: 50
      },
      {
        id: 4,
        name: 'name 4',
        dt: moment().add(-8, 'h'),
        value: 90
      },
      {
        id: 5,
        name: 'name 5',
        dt: moment().add(-7, 'h'),
        value: 40
      },
      {
        id: 6,
        name: 'name 6',
        dt: moment().add(-6, 'h'),
        value: 20
      },
      {
        id: 6,
        name: 'name 6',
        dt: moment().add(-5, 'h'),
        value: 40
      },
      {
        id: 7,
        name: 'name 7',
        dt: moment().add(-4, 'h'),
        value: 10
      },
      {
        id: 8,
        name: 'name 8',
        dt: moment().add(-3, 'h'),
        value: 90
      },
      {
        id: 9,
        name: 'name 9',
        dt: moment().add(-2, 'h'),
        value: 50
      },
      {
        id: 10,
        name: 'name 10',
        dt: moment().add(-1, 'h'),
        value: 100
      }
    ]
  },
  {
    "id": 1,
    "name": "series 1",
    "color": "yellow",
    "series": [
      {
        id: 1,
        name: 'name 1',
        dt: moment().add(-10, 'h'),
        value: 30
      },
      {
        id: 2,
        name: 'name 2',
        dt: moment().add(-9, 'h'),
        value: 10
      },
      {
        id: 4,
        name: 'name 4',
        dt: moment().add(-8, 'h'),
        value: 40
      },
      {
        id: 5,
        name: 'name 5',
        dt: moment().add(-7, 'h'),
        value: 70
      },
      {
        id: 6,
        name: 'name 6',
        dt: moment().add(-6, 'h'),
        value: 10
      },
      {
        id: 6,
        name: 'name 6',
        dt: moment().add(-5, 'h'),
        value: 15
      },
      {
        id: 7,
        name: 'name 7',
        dt: moment().add(-4, 'h'),
        value: 25
      },
      {
        id: 8,
        name: 'name 8',
        dt: moment().add(-3, 'h'),
        value: 30
      },
      {
        id: 9,
        name: 'name 9',
        dt: moment().add(-2, 'h'),
        value: 50
      },
      {
        id: 10,
        name: 'name 10',
        dt: moment().add(-1, 'h'),
        value: 10
      }
    ]
  },
  {
    "id": 2,
    "name": "series 2",
    "color": "green",
    "series": [
      {
        id: 1,
        name: 'name 1',
        dt: moment().add(-10, 'h'),
        value: 30
      },
      {
        id: 2,
        name: 'name 2',
        dt: moment().add(-9, 'h'),
        value: 40
      },
      {
        id: 4,
        name: 'name 4',
        dt: moment().add(-8, 'h'),
        value: 50
      },
      {
        id: 5,
        name: 'name 5',
        dt: moment().add(-7, 'h'),
        value: 60
      },
      {
        id: 6,
        name: 'name 6',
        dt: moment().add(-6, 'h'),
        value: 70
      },
      {
        id: 6,
        name: 'name 6',
        dt: moment().add(-5, 'h'),
        value: 70
      },
      {
        id: 7,
        name: 'name 7',
        dt: moment().add(-4, 'h'),
        value: 80
      },
      {
        id: 8,
        name: 'name 8',
        dt: moment().add(-3, 'h'),
        value: 90
      },
      {
        id: 9,
        name: 'name 9',
        dt: moment().add(-2, 'h'),
        value: 100
      },
      {
        id: 10,
        name: 'name 10',
        dt: moment().add(-1, 'h'),
        value: 10
      }
    ]
  }
]

export default mock;
