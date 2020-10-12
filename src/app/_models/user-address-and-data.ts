export interface UserAddressAndData {
  id: string; // temporary
  userData: UserData;
  country: string;
  city: string;
  street: string;
  buildingNumber: string;
  flatNumber: string;
  postalCode: string;

}
export interface UserData {
  name: string;
  surname: string;
  phoneNumber: string;
}
