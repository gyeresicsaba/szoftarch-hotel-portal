export class Room {
  id: number;
  isReserved: boolean;
  hotelId: number;
  capacity: number;
  price: number;

  constructor(raw) {
    this.id = raw.id;
    this.isReserved = raw.isReserved;
    this.hotelId = raw.hotelId;
    this.capacity = raw.capacity;
    this.price = raw.price;
  }

}
