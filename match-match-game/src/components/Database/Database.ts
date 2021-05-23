import { Constants, UserType } from '../constants';

export class Database {
  public db: IDBDatabase;

  public readonly Constants: Constants = new Constants();

  constructor() {
    const openRequest = indexedDB.open('igorlyatskiy', 1);

    openRequest.addEventListener('upgradeneeded', () => {
      this.db = openRequest.result;
      if (!this.db.objectStoreNames.contains('users')) {
        this.db.createObjectStore('users');
      }
    });
    openRequest.addEventListener('error', () => {
      throw new Error('Error while opening the DB');
    });
    openRequest.addEventListener('success', () => {
      this.db = openRequest.result;
    });
  }

  addUser = (newUser: UserType) => {
    const transaction = this.db.transaction('users', 'readwrite');
    const users = transaction.objectStore('users');
    const request = users.put(newUser, `${newUser.name} ${newUser.surname}`);

    request.addEventListener('error', () => {
      throw new Error('error at the user to the DB adding');
    });
  };

  pullUsersList = () => {
    return new Promise((resolve) => {
      const transaction = this.db.transaction('users', 'readonly');
      const users = transaction.objectStore('users');
      const allUsers = users.getAll();
      allUsers.addEventListener('success', () => {
        const res = allUsers.result;
        resolve(res);
      });
      allUsers.addEventListener('error', () => {
        throw new Error('Error at the users Info getting');
      });
    });
  };
}