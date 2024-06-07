import { useState } from "react";
import Modal from "../../const/Modal";

const AddAccountModal = () => {
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full gap-y-4">
        <div
          className="w-full md:w-1/2 bg-secondary text-navBackground font-serif px-3 py-2 rounded-lg shadow-md cursor-pointer"
          onClick={() => setIsNewAccountModalOpen(true)}
        >
          Log In to Existing Account
        </div>
        <div className="w-full md:w-1/2 bg-navBackground text-secondary font-serif px-3 py-2 rounded-lg shadow-md cursor-pointer">
          Create New Account
        </div>
      </div>
      <Modal
        isOpen={isNewAccountModalOpen}
        setIsOpen={setIsNewAccountModalOpen}
        title="Add Account"
        size="md"
      >
        <AddAccountModal />
      </Modal>
    </div>
  );
};

export default AddAccountModal;
