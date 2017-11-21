import {Room} from './room';

export class Hotel {
  id: number;
  name: string;
  address: string;
  numberOfStars: number;
  numberOfRooms = 0;
  rooms: Array<Room>;

  constructor(raw) {
    this.id = raw.id;
    this.name = raw.name;
    this.address = raw.address;
    this.numberOfStars = raw.numberOfStars;
    if (raw.rooms) {
      this.rooms = raw.rooms.map(x => new Room(x));
      this.numberOfRooms = this.rooms.length;
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
