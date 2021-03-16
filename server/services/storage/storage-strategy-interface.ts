import { Photo } from "server/gql/entity";
import { FileType } from "server/gql/scalars/file-scalar";
import { FirebaseStorageStrategy } from "./strategies/firebase/firebase-strategy";
import { LocalStorageStrategy } from "./strategies/local-strategy";
import { S3StorageStrategy } from "./strategies/s3-strategy";

export interface IStorageStrategy {
  uploadPhotos(files: FileType[]): Promise<Photo[]>;
  getPhotos(photos: Photo[]): Promise<Photo[]>;
  deletePhotos(fileNames: string[]): Promise<void>;
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
