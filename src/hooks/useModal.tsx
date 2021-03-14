import clsx from "clsx";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { ModalContext } from "src/contexts/modal-context";

export const useModal = (element: JSX.Element) => {
  const ref = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useClickAway(ref, () => {
    hide();
  });

  const show = () => {
    setModalOpen(true);
  };
  const hide = () => {
    setModalOpen(false);
  };

  const content = (
    <ModalContext.Provider value={{ hide, show }}>
      <div
        className={clsx(
          !modalOpen && "hidden",
          "fixed top-0 bottom-0 left-0 right-0 bg-white bg-opacity-10 flex justify-center items-center backdrop-blur"
        )}
      >
        <div className="w-3/4 bg-white shadow-md p-4 rounded-md" ref={ref}>
          {element}
        </div>
      </div>
    </ModalContext.Provider>
  );

  return { show, hide, content };
};
