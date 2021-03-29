import { createWriteStream, promises } from "fs";
import { join } from "path";
import { Photo } from "server/gql/entity/Photo";
import { FileType } from "server/gql/scalars/file-scalar";
import { UPLOAD_TMP_FOLDER } from "../../../utils/upload-utils";
import { CreatePhoto, IStorageStrategy } from "../storage-strategy-interface";

export abstract class StorageStrategy implements IStorageStrategy {
  abstract uploadPhotos(files: FileType[]): Promise<CreatePhoto[]>;
  abstract getPhotos(photos: Photo[]): Promise<Photo[]>;
  abstract deletePhotos(fileNames: string[]): Promise<void>;

  protected async createTmpFile(file: FileType, filename: string) {
    const path = join(UPLOAD_TMP_FOLDER, filename);

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
    const path = join(UPLOAD_TMP_FOLDER, filename);
    return promises.unlink(path);
  }
}
