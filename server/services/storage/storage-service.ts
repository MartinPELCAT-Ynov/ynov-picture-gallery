import { Service } from "typedi";
import {
  availableStrategies,
  AvailableStrategies,
  IStorageStrategy,
} from "./storage-strategy";

@Service()
export class StorageService {
  private _strategy!: IStorageStrategy;

  public strategy(key: keyof AvailableStrategies): StorageService {
    this._strategy = availableStrategies[key];
    return this;
  }

  private getStrategy(): IStorageStrategy {
    if (!this._strategy) {
      this._strategy = availableStrategies["local"];
    }
    return this._strategy;
  }

  async uploadPhotos() {
    return this.getStrategy().uploadPhotos();
  }

  async getPhotos() {
    return this.getStrategy().getPhotos();
  }
}

const main = async () => {
  try {
    const storageService = new StorageService();
    await storageService.strategy("local").uploadPhotos();
  } catch (error: any) {
    console.error(error.message);
  }
};
main();
