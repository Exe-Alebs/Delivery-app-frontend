import axios from 'axios';
import { buildWebStorage, setupCache } from 'axios-cache-interceptor';
import localforage from 'localforage';

const forageStore = localforage.createInstance({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: 'req-cache-storage',
});

const globalMaxAge = 15 * 60 * 1000;

const axiosCache = setupCache(axios, {
  storage: buildWebStorage(forageStore),
  headerInterpreter: () => globalMaxAge,
});

export default axiosCache;
