import { Service } from "typedi";
import {
  availableStrategies,
  AvailableStrategies,
  IStorageStrategy,
} from "./storage-strategy";

@Service()
export class StorageService {
  private _strategy!: IStorageStrategy;

  public strategy(v: keyof AvailableStrategies): StorageService {
    this._strategy = availableStrategies[v];
    return this;
  }

  async uploadPhotos() {
    return this._strategy.uploadPhotos();
  }

  async getPhotos() {
    return this._strategy.getPhotos();
  }
}

const main = async () => {
  try {
    const storageService = new StorageService();
    await storageService.strategy("firebase").uploadPhotos();
  } catch (error: any) {
    console.error(error.message);
  }
};
main();
