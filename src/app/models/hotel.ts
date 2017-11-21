import {Room} from './room';

export class Hotel {
  id: number;
  name: string;
  address: string;
  numberOfStars: number;
  numberOfRooms: number;
  rooms: Array<Room>;

  constructor(raw) {
    this.id = raw.id;
    this.name = raw.name;
    this.address = raw.address;
    this.numberOfStars = raw.numberOfStars;
    this.numberOfRooms = raw.numberOfRooms;
    if (raw.rooms) {
      this.rooms = raw.rooms.map(x => new Room(x));
    }
  }

  get Saveable() {
    return {
      // Id: this.id,
      Name: this.name,
      Address: this.address,
      NumberOfStars: this.numberOfStars,
      NumberOfRooms: this.numberOfRooms,
    }
  }
}
