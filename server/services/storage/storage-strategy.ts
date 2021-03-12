import { FirebaseStorageStrategy } from "./strategies/firebase-strategy";
import { LocalStorageStrategy } from "./strategies/local-strategy";

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
};

export const availableStrategies: AvailableStrategies = {
  local: new LocalStorageStrategy(),
  firebase: new FirebaseStorageStrategy(),
};
