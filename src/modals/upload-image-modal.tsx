import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  DragEventHandler,
  useContext,
  useState,
} from "react";
import { Button } from "src/components/forms/Button";
import { AlbumContext } from "src/contexts/album-context";
import { ModalContext } from "src/contexts/modal-context";
import { useUploadPhotoAlbumMutation } from "src/__generated__";

type FileAndPreview = {
  file: File;
  preview: any;
};

export const UploadImageModal = () => {
  const [files, setFiles] = useState<FileAndPreview[]>([]);
  const { setAlbum } = useContext(AlbumContext);
  const { query } = useRouter();
  const { hide } = useContext(ModalContext);

  const [upload, { loading }] = useUploadPhotoAlbumMutation();

  const dragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const dragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderStyle = "solid";
  };

  const dragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderStyle = "";
  };

  const fileDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderStyle = "";
    getImageContent(e.dataTransfer.files);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    getImageContent(e.currentTarget.files);
  };

  const handleUpload = async () => {
    try {
      const fls = files.map((f) => f.file);
      const { data } = await upload({
        variables: { files: fls, albumUuid: query.id as string },
      });
      if (data?.addPhotosToAlbum?.photos) {
        setAlbum((album) => ({
          ...album!,
          photos: data.addPhotosToAlbum?.photos!,
        }));
      }
      hide();
    } catch (error) {
      console.error(error);
      //DO NOTHING
    }
  };

  const getImageContent = async (fileList: FileList | null) => {
    const filesArray = Array.from(fileList || []);

    filesArray.forEach((file) => {
      if (files.find((el) => el.file.name === file.name)) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setFiles((prevFiles) => [
          ...prevFiles,
          { file, preview: e.target?.result },
        ]);
      };
    });
  };

  const ImagePreview = ({ file, preview }: FileAndPreview): JSX.Element => {
    const removeImage = () => {
      setFiles((prevFiles) => [
        ...prevFiles.filter((fil) => fil.file.name !== file.name),
      ]);
    };

    return (
      <div className="w-14 h-14 relative m-1">
        <img
          src={preview}
          alt=""
          className="object-cover h-full w-full rounded-md"
        />
        <div
          onClick={removeImage}
          className="absolute top-0 right-0 h-4 w-4 font-bold rounded-full bg-indigo-500 p-1 text-white flex justify-center items-center z-50 text-xs"
        >
          <span>X</span>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-10 px-10">
      <input
        type="file"
        className="hidden"
        multiple
        name="file"
        id="file"
        onChange={handleFileChange}
      />
      <div
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        className="relative h-64 border-dashed border-2 border-indigo-500 rounded-xl flex justify-center items-center"
      >
        <label
          role="button"
          className="text-indigo-600 text-lg absolute flex left-0 top-0 right-0 bottom-0 justify-center items-center"
          htmlFor="file"
        >
          <div>Click or drag file to upload</div>
        </label>
      </div>

      <div className="flex flex-wrap justify-center mt-2">
        {files.map((file) => {
          return <ImagePreview {...file} key={file.file.name} />;
        })}
      </div>

      <div className="flex justify-end mt-10">
        <div className="w-1/2">
          <Button.Default
            label="Upload"
            loading={loading}
            className="bg-indigo-500 text-white"
            onClick={handleUpload}
          />
        </div>
      </div>
    </div>
  );
};
