export class Hotel {
  id: number;
  name: string;
  address: string;
  numberOfStars: number;
  numberOfRooms: number;
  price: number;

  constructor(raw) {
    this.id = raw.Id;
    this.name = raw.Name;
    this.address = raw.Address;
    this.numberOfStars = raw.NumberOfStars;
    this.numberOfRooms = raw.NumberOfRooms;
    this.price = raw.Price;
  }

  get Saveable() {
    return {
      Id: this.id,
      Name: this.name,
      Address: this.address,
      NumberOfStars: this.numberOfStars,
      NumberOfRooms: this.numberOfRooms,
      Price: this.price
    }
  }
}
