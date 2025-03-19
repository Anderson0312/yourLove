interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-transparent rounded-lg p-4 w-11/12 max-w-md shadow-lg relative rounded-lg border border-gray-700">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-200 hover:text-gray-500"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}
