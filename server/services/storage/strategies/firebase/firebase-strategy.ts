import { Photo } from "server/gql/entity/Photo";
import { FileType } from "server/gql/scalars/file-scalar";
import * as admin from "firebase-admin";
import { StorageStrategy } from "../storage-strategy";
import { v4 } from "uuid";

//Fichier generer depuis la console firebase
import * as serviceAccount from "./firebase.json";
import { CreatePhoto } from "../../storage-strategy-interface";

export class FirebaseStorageStrategy extends StorageStrategy {
  private storage: admin.storage.Storage;

  constructor() {
    super();
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
      storageBucket: "gs://ynov-picture-gallery.appspot.com",
    });

    this.storage = admin.storage();
  }

  private getBucket() {
    return this.storage.bucket();
  }

  async uploadPhotos(files: FileType[]): Promise<CreatePhoto[]> {
    const photos: CreatePhoto[] = [];
    for (const file of files) {
      const token = v4();
      const fileName = `${token}-${file.filename}`;
      const path = await this.createTmpFile(file, fileName);
      // const uploaded =
      await this.getBucket().upload(path, {
        destination: fileName,
        gzip: true,
      });

      await this.deleteTmpFile(fileName);

      photos.push({ name: file.filename, url: fileName, provider: "firebase" });
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
