import { EStorageType } from "@shared/enums/db.enums";
import { IDBConfig, TStorageType } from "@shared/types/db.type";


const defaultConfig: IDBConfig = {
	storageType: EStorageType.LocalStorage, // To change the default storage type
	localStorageConfig: {
		key: 'todo-app-data'
	},
	indexedDBConfig: {
		databaseName: 'todo-app-db',
		version: 1,
		storeName: 'todos'
	}
};

export const getDBConfig = (): IDBConfig => {
  return defaultConfig;
};

export const setStorageType = (type: TStorageType): void => {
  defaultConfig.storageType = type;
};

export const setIndexedDBConfig = (config: IDBConfig['indexedDBConfig']): void => {
  defaultConfig.indexedDBConfig = config;
};

export const setLocalStorageConfig = (config: IDBConfig['localStorageConfig']): void => {
  defaultConfig.localStorageConfig = config;
};