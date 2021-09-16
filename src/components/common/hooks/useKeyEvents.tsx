import { useEffect } from 'react';

const useKeyEvent = (handleCancel, handleSave, isActive: boolean) => {
    const listener = (e: any) => {
        if (!isActive) {
            return;
        }
        if (handleCancel !== undefined && e.key === 'Escape') {
            handleCancel();
        }
        if (handleSave !== undefined && ((e.ctrlKey && (e.key === 's' || e.key === 'S')) || e.key === 'Enter')) {
            e.preventDefault();
            handleSave();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', listener, false);
        return () => {
            document.removeEventListener('keydown', listener, false);
        };
    }, [handleSave, handleCancel, isActive]);

    return {};
};

export default useKeyEvent;
