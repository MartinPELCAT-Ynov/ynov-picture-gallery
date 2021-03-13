import { useRef } from "react";
import ReactDOM from "react-dom";
import { useClickAway } from "react-use";

export const useModal = (element: JSX.Element) => {
  const ref = useRef(null);

  useClickAway(ref, () => {
    hide();
  });

  const content = (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-white bg-opacity-10 flex justify-center items-center backdrop-blur">
      <div className="w-3/4 bg-white shadow-md p-4 rounded-md" ref={ref}>
        {element}
      </div>
    </div>
  );

  const show = () => {
    ReactDOM.render(content, document.getElementById("modal-root"));
  };
  const hide = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("modal-root")!);
  };

  return { show, hide };
};
