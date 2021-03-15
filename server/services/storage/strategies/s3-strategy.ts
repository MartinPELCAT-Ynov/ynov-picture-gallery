import { Photo } from "server/gql/entity";
import { FileType } from "server/gql/scalars/file-scalar";
import { StorageStrategy } from "./storage-strategy";

export class S3StorageStrategy extends StorageStrategy {
  uploadPhotos(_files: FileType[]): Promise<Photo[]> {
    throw new Error("Method not implemented.");
  }
  getPhotos(): Promise<Photo[]> {
    throw new Error("Method not implemented.");
  }
}
