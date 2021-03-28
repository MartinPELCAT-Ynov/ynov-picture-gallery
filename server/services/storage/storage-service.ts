import { Photo } from "../../gql/entity/Photo";
import { FileType } from "server/gql/scalars/file-scalar";
import { Service } from "typedi";
import {
  AvailableStrategies,
  availableStrategies,
  IStorageStrategy,
} from "./storage-strategy-interface";

@Service()
export class StorageService {
  private strategy: IStorageStrategy = availableStrategies["firebase"];

  useStrategy(key: keyof AvailableStrategies): IStorageStrategy {
    const strategy = availableStrategies[key];
    if (!strategy) throw new Error("Unkown strategie: " + key);
    return strategy;
  }

  async uploadPhotos(files: FileType[]) {
    return this.strategy.uploadPhotos(files);
  }

  async getPhotos(photos: Photo[]) {
    return this.strategy.getPhotos(photos);
  }

  async deletePhotos(photos: Photo[]) {
    const photoUrls = photos.map((photo) => photo.url);
    return this.strategy.deletePhotos(photoUrls);
  }
}
