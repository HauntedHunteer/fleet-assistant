export interface UserAddressAndData {
  id: string;
  userData: UserData;
  city: string;
  street: string;
  buildingNumber: string;
  flatNumber: string;
  postalCode: string;

}
export interface UserData {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
}
