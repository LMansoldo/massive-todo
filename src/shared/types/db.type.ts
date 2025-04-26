import { EStorageType } from "@shared/enums/db.enums";

export type TStorageType = EStorageType.IndexedDB | EStorageType.LocalStorage;

export interface IDBConfig {
  storageType: TStorageType;
  indexedDBConfig?: {
    databaseName: string;
    version: number;
    storeName: string;
  };
  localStorageConfig?: {
    key: string;
  };
}
