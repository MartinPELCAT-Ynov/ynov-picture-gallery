import { createWriteStream, unlink } from "fs";
import { join } from "path";
import { Photo } from "server/gql/entity";
import { FileType } from "server/gql/scalars/file-scalar";
import { IStorageStrategy } from "../storage-strategy-interface";

export abstract class StorageStrategy implements IStorageStrategy {
  abstract uploadPhotos(files: FileType[]): Promise<Photo[]>;
  abstract getPhotos(photos: Photo[]): Promise<Photo[]>;
  abstract deletePhotos(fileNames: string[]): Promise<void>;

  protected async createTmpFile(file: FileType, filename: string) {
    const path = join(__dirname, "../../../upload/tmp/", filename);

    const { createReadStream } = file;
    const stream = createReadStream();
    await new Promise((res, rej) => {
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => res(true))
        .on("error", rej);
    });
    return path;
  }
  protected deleteTmpFile(filename: string) {
    const path = join(__dirname, "../../../upload/tmp/", filename);
    return new Promise<void>((res, rej) => {
      unlink(path, (err) => {
        if (err) rej(err);
        res();
      });
    });
  }
}
