/**
 * Created by ekemate on 2017. 03. 01..
 */
export class Payer {
  address: string;
  isDefault: boolean;
  id: number;
  name: string;
  phone: string;
  email: string;

  /*public static fromPartnerDetails(partner: PartnerDetails): Payer {
   return new Payer({
   'default': false,
   'address': partner.FullAddress,
   'id': partner.id,
   'name': partner.name,
   'phone': partner.phone,
   'email': partner.email
   });
   }*/

  constructor(raw) {
    this.isDefault = raw.default;
    this.address = raw.address;
    this.id = raw.id;
    this.name = raw.name;
    this.phone = raw.phone;
    this.email = raw.email;
  }
}
