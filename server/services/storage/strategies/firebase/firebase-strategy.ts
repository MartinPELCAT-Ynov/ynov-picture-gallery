import { Photo } from "server/gql/entity";
import { FileType } from "server/gql/scalars/file-scalar";
import * as admin from "firebase-admin";
import { randomBytes } from "crypto";
import { StorageStrategy } from "../storage-strategy";
import { join } from "path";

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
    for (const file of files) {
      const token = randomBytes(32).toString("hex");
      const path = join(
        __dirname,
        "../../../../upload/",
        `./tmp/${token}-${file.filename}`
      );
      await this.createTmpFile(file, path);
      // const uploaded =
      await this.getBucket().upload(path, { gzip: true });
      // console.log(uploaded[0].publicUrl());
      this.deleteTmpFile(path);
    }

    return [];
  }
  getPhotos(): Promise<Photo[]> {
    throw new Error("Method not implemented.");
  }
}
