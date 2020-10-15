export interface UserData {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: Address;
}

export interface Address {
  id: string;
  city: string;
  street: string;
  buildingNumber: string;
  flatNumber: string;
  postalCode: string;
}
