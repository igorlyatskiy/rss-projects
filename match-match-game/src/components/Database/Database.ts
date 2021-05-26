import Constants from '../constants';

const { v4: uuidv4 } = require('uuid');


class Database {
  public db: IDBDatabase;

  public readonly Constants: Constants = new Constants();

  private static instance: Database;

  constructor() {

    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;

    const openRequest = indexedDB.open(process.env.DB_NAME, 1);

    openRequest.addEventListener('upgradeneeded', () => {
      this.db = openRequest.result;
      if (!this.db.objectStoreNames.contains(process.env.DB_STORAGE_NAME)) {
        this.db.createObjectStore(process.env.DB_STORAGE_NAME);
      }
    });
    openRequest.addEventListener('error', () => {
      throw new Error('Error while opening the DB');
    });
    openRequest.addEventListener('success', () => {
      this.db = openRequest.result;
    });
  }

  insert = (objectStore: string, value: object) => {
    const transaction = this.db.transaction(objectStore, 'readwrite');
    const selectedStore = transaction.objectStore(objectStore);
    const key = uuidv4();
    const request = selectedStore.put(value, key);

    request.addEventListener('error', () => {
      throw new Error(`Error at the value to the ${objectStore} adding`);
    });
  };

  getData = (objectStore: string) => {
    return new Promise((resolve) => {
      const transaction = this.db.transaction(objectStore, 'readonly');
      const selectedStore = transaction.objectStore(objectStore);
      const allData = selectedStore.getAll();
      allData.addEventListener('success', () => {
        const { result } = allData;
        resolve(result);
      });
      allData.addEventListener('error', () => {
        throw new Error(`Error at the ${objectStore} Info getting`);
      });
    });
  };
}

export { Database as default };