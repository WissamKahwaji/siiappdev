interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
  privacyPolicy: string;
}
const PrivacyPolicyModal = ({
  isOpen,
  onClose,
  onAgree,
  privacyPolicy,
}: PrivacyPolicyModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg md:max-w-lg md:w-full max-w-md w-3/4">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <div className="overflow-y-auto max-h-60 mb-4">
          {privacyPolicy ? (
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: privacyPolicy }}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={onAgree}
            className="px-4 py-2 bg-secondary text-navBackground rounded hover:bg-secondary-dark"
          >
            Agree and Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
