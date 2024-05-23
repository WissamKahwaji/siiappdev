import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../const/Modal";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface OptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const OptionsModal = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: OptionsModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={onClose}>
      <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-lg">
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 px-4 py-2   rounded-lg text-blue-500 hover:bg-blue-100 transition duration-200"
        >
          <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
          <span>Edit</span>
        </button>
        <button
          onClick={onDelete}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 transition duration-200"
        >
          <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </Modal>
  );
};

export default OptionsModal;
