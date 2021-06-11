import React from 'react';

import './LoadingModal.scss';

const LoadingModal = props => {
    const { loading } = props;

    const styles = {
        loadingWrapper: {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            zIndex: 815,
        },
        innerWrapper: {
            position: 'fixed',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            right: 0,
            width: '80%',
            height: '400px',
            margin: '0 auto',
            padding: 0,
            zIndex: 17,
        },
        loader: {
            position: 'absolute',
            left: 0,
            right: 0,
            border: '16px solid #cccccc',
            borderRadius: '50%',
            borderTop: '16px solid #000000',
            width: '120px',
            height: '120px',
            margin: '0 auto',
            animation: 'spin 2s linear infinite',
            textIndent: '-9999px',
            zIndex: 4,
            top: '50%',
            transform: 'translateY(-50%)',
        },
        modalTintScreen: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            opacity: '0.9',
            zIndex: '0',
            textIndent: '-9999px',
            backgroundColor: '#ffffff',
        }
    };

    return (
        <>
            {loading && <div
                data-test="component-loading"
                className="loading-modal"
                style={styles.loadingWrapper}>
                <div style={styles.innerWrapper}>
                    <div style={styles.loader}>-</div>
                </div>
                <div style={styles.modalTintScreen}>-</div>
            </div>}
        </>
    );
};

export default LoadingModal;
