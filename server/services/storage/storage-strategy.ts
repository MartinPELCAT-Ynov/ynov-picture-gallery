import { FirebaseStorageStrategy } from "./strategies/firebase-strategy";
import { LocalStorageStrategy } from "./strategies/local-strategy";
import { S3StorageStrategy } from "./strategies/s3-strategy";

export type UploadOption = {
  bucket: string;
};

export interface IStorageStrategy {
  uploadPhotos(): Promise<void>;
  getPhotos(): Promise<void>;
}

export type AvailableStrategies = {
  local: IStorageStrategy;
  firebase: IStorageStrategy;
  s3: IStorageStrategy;
};

export const availableStrategies: AvailableStrategies = {
  local: new LocalStorageStrategy(),
  firebase: new FirebaseStorageStrategy(),
  s3: new S3StorageStrategy(),
};
