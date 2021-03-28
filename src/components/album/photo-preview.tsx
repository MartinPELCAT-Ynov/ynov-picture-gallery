import clsx from "clsx";
import React, { MouseEventHandler, useContext, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { AlbumContext } from "src/contexts/album-context";
import { useDeleteImagesMutation } from "src/__generated__";
import { DeleteIcon } from "../icons/DeleteIcon";
import { PhotoProp } from "./photo-list";

export const PhotoPreview = (photo: PhotoProp) => {
  const contextMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const { deletePhoto } = useContext(AlbumContext);

  const [deleteImage] = useDeleteImagesMutation();

  useClickAway(contextMenuRef, () => setMenuOpen(false));

  const handleOnContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuOpen(true);
  };

  const handleDeletePhoto = async () => {
    try {
      await deleteImage({ variables: { ids: [photo.uuid] } });
      deletePhoto(photo);
    } catch (error) {
      //DO NOHING
      console.log(error);
    }
  };

  const ContextMenu = () => (
    <div
      ref={contextMenuRef}
      style={{ left: menuPosition.x, top: menuPosition.y }}
      className={clsx(
        !menuOpen && "hidden",
        "z-50 fixed bg-white rounded-md shadow-md"
      )}
    >
      <div
        onClick={handleDeletePhoto}
        role="button"
        className="hover:bg-gray-100 p-2 rounded-md text-red-500 flex space-x-2 items-center"
      >
        <DeleteIcon />
        <span>Delete</span>
      </div>
    </div>
  );

  return (
    <div
      className="w-1/5 h-64 overflow-hidden"
      onContextMenu={handleOnContextMenu}
    >
      <img
        src={photo.url}
        className="object-cover w-full h-64 hover:scale-110 transform duration-300"
      />
      <ContextMenu />
    </div>
  );
};
