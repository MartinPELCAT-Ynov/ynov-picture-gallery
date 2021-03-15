import { FileType } from "server/gql/scalars/file-scalar";
import { Service } from "typedi";
import {
  availableStrategies,
  IStorageStrategy,
} from "./storage-strategy-interface";

@Service()
export class StorageService {
  private strategy: IStorageStrategy = availableStrategies["firebase"];

  async uploadPhotos(files: FileType[]) {
    return this.strategy.uploadPhotos(files);
  }

  async getPhotos() {
    return this.strategy.getPhotos();
  }
}
