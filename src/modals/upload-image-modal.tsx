import { DragEventHandler } from "react";
import { Button } from "src/components/forms/Button";

export const UploadImageModal = () => {
  const dragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const dragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const dragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const fileDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
  };

  return (
    <div className="pt-10 px-10">
      <input type="file" className="hidden" name="file" id="file" />
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

      <div className="flex justify-end mt-10">
        <div className="w-1/2">
          <Button.Default label="Upload" className="bg-indigo-500 text-white" />
        </div>
      </div>
    </div>
  );
};
