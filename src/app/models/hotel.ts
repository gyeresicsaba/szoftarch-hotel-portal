export class Hotel {
  id: number;
  name: string;
  address: string;
  numberOfStars: number;
  numberOfRooms: number;
  price: number;

  constructor(raw) {
    this.id = raw.id;
    this.name = raw.name;
    this.address = raw.address;
    this.numberOfStars = raw.numberOfStars;
    this.numberOfRooms = raw.numberOfRooms;
    this.price = raw.price;
  }

  get Saveable() {
    return {
      // Id: this.id,
      Name: this.name,
      Address: this.address,
      NumberOfStars: this.numberOfStars,
      NumberOfRooms: this.numberOfRooms,
      Price: this.price
    }
  }
}
