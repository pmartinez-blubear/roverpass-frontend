import { ReactNode } from 'react';
import '../../../styles/common/modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title:string;
    children: ReactNode;
}

const ModalContainer = ({ isOpen, onClose, children, title }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={e => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2>{title}</h2>
                    <FontAwesomeIcon onClick={onClose} icon={['fas', 'xmark']} className="closeIcon" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default ModalContainer;