import { App } from './../../ts/app';
import { Constants } from './../constants';
import { app } from './../../ts/index'
export class Database {
  public db: IDBDatabase;
  public readonly Constants: Constants = new Constants();
  public app: App;
  constructor() {
    window.addEventListener("load", () => this.app = app);

    let openRequest = indexedDB.open("igorlyatskiy", 1);

    openRequest.addEventListener("upgradeneeded", () => {
      this.db = openRequest.result;
      if (!this.db.objectStoreNames.contains('users')) {
        this.db.createObjectStore('users');
      }
    });
    openRequest.addEventListener("error", () => console.log("Error"));
    openRequest.addEventListener("success", () => {
      this.db = openRequest.result;
    });
  }

  addUser = () => {
    const transaction = this.db.transaction("users", "readwrite");
    const users = transaction.objectStore("users");
    const newUser = this.app.Controller.Model.user;
    const request = users.add(newUser, `${newUser.name} ${newUser.surname}`);

    request.addEventListener("error", () => console.log("error at the user to the DB adding", request.error, users));

    const allUsers = users.getAll();
    allUsers.addEventListener("success", () => this.app.Controller.Model.players = allUsers.result);
    allUsers.addEventListener("error", () => console.log("Error at the users Info getting"));
  };

  getUsersList = () => {
    const transaction = this.db.transaction("users", "readwrite");
    return transaction.objectStore("users");
  }
}