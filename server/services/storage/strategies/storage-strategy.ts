import { createWriteStream, unlinkSync } from "fs";
import { Photo } from "server/gql/entity";
import { FileType } from "server/gql/scalars/file-scalar";
import { IStorageStrategy } from "../storage-strategy-interface";

export abstract class StorageStrategy implements IStorageStrategy {
  abstract uploadPhotos(files: FileType[]): Promise<Photo[]>;
  abstract getPhotos(): Promise<Photo[]>;
  protected async createTmpFile(file: FileType, path: string) {
    const { createReadStream } = file;
    const stream = createReadStream();
    await new Promise((res, rej) => {
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => res(true))
        .on("error", rej);
    });
  }
  protected deleteTmpFile(path: string) {
    return unlinkSync(path);
  }
}
