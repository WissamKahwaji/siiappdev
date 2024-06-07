import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  size?: "xs" | "lg" | "md";
  children: React.ReactNode;
}

const getSizeClass = (size: "xs" | "lg" | "md" | undefined) => {
  let utilities = "";

  switch (size) {
    case "xs":
      utilities = "h-fit sm:max-w-sm rounded-lg";
      break;
    case "lg":
      utilities = "h-5/6 max-h-[52rem] sm:max-w-6xl rounded-md rounded-l-none";
      break;
    case "md":
    default:
      utilities = "h-4/5 sm:max-w-screen-md rounded-lg";
      break;
  }
  return utilities;
};

const Modal = (props: ModalProps) => {
  const { isOpen, setIsOpen, title, size, children } = props;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto "
        onClose={() => setIsOpen(false)}
      >
        <div className="flex  items-center justify-center min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-800 bg-opacity-95 transition-opacity" />
          </Transition.Child>
          <div className="relative inline-block align-middle mx-2 md:mx-0 mt-20 md:mt-20 md:w-1/2">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`relative bg-white overflow-hidden shadow-xl transform transition-all align-middle sm:w-full ${
                  title ? "pt-10" : ""
                } ${getSizeClass(size)}`}
              >
                {title && (
                  <div className="absolute top-0 w-full text-center border-b border-secondary py-2 font-semibold">
                    <Dialog.Title>{title}</Dialog.Title>
                  </div>
                )}
                <div className="w-full h-full p-4">{children}</div>
                <div
                  className="absolute top-1 right-4 text-gray-700 text-2xl cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
