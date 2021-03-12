import { IStorageStrategy } from "../storage-strategy";

export class LocalStorageStrategy implements IStorageStrategy {
  async uploadPhotos(): Promise<void> {
    throw new Error("Method upload local not implemented.");
  }
  async getPhotos(): Promise<void> {
    throw new Error("Method get local not implemented.");
  }
}
