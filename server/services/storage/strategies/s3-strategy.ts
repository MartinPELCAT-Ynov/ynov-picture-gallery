import { IStorageStrategy } from "../storage-strategy";

export class S3StorageStrategy implements IStorageStrategy {
  async uploadPhotos(): Promise<void> {
    throw new Error("Upload firebase not implemented.");
  }
  async getPhotos(): Promise<void> {
    throw new Error("get firebase not implemented.");
  }
}
