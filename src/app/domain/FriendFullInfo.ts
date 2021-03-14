export class FriendFullInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  gender: string;
  interests: string;
  city: string;

  constructor(id: number, email: string, firstName: string, lastName: string, birthdate: Date, gender: string, interests: string, city: string) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.gender = gender;
    this.interests = interests;
    this.city = city;
  }
}
