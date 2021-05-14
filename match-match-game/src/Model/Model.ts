export class Model {
  private user = "guest";
  constructor() {
  }
  setUser(newUser: string) {
    this.user = newUser;
  }
}