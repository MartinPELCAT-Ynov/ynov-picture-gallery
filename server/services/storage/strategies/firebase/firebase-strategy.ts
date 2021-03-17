import { Photo } from "server/gql/entity";
import { FileType } from "server/gql/scalars/file-scalar";
import * as admin from "firebase-admin";
import { StorageStrategy } from "../storage-strategy";
import { v4 } from "uuid";

const serviceAccount = require("./ynov-picture-gallery-firebase-adminsdk-irsqm-6181038dbf.json");

export class FirebaseStorageStrategy extends StorageStrategy {
  private storage: admin.storage.Storage;

  constructor() {
    super();
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "gs://ynov-picture-gallery.appspot.com",
    });

    this.storage = admin.storage();
  }

  private getBucket() {
    return this.storage.bucket();
  }

  async uploadPhotos(files: FileType[]): Promise<Photo[]> {
    const photos: Photo[] = [];
    for (const file of files) {
      const token = v4();
      const fileName = `${token}-${file.filename}`;
      const path = await this.createTmpFile(file, fileName);
      // const uploaded =
      await this.getBucket().upload(path, {
        destination: fileName,
        gzip: true,
      });

      this.deleteTmpFile(fileName);

      photos.push({ name: file.filename, url: fileName });
    }

    return photos;
  }
  async getPhotos(photos: Photo[]): Promise<Photo[]> {
    const returnPhotos = photos.map(
      async (photo): Promise<Photo> => {
        const [url] = await this.getBucket()
          .file(photo.url)
          .getSignedUrl({
            action: "read",
            expires: Date.now() + 24000,
            version: "v4",
          });
        return { ...photo, url };
      }
    );

    return Promise.all(returnPhotos);
  }

  async deletePhotos(urls: string[]): Promise<void> {
    const deleteMap = urls.map((url) => {
      return this.getBucket().file(url).delete();
    });
    await Promise.all(deleteMap);
  }
}
// https://firebasestorage.googleapis.com/v0/b/ynov-picture-gallery.appspot.com/o/08533319-3730-49a4-ba3a-8ca8e29cb638-EAHX9624.JPG?alt=media&token=4376b376-7218-4fa9-b185-f7a1cc948d74
