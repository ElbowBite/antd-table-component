import React from 'react';
import resolvePath from 'object-resolve-path';

import ReactModal from 'react-modal';
import { Card, Button/* , Avatar */ } from 'antd';

import styles from './TransactionDetails.module.scss'; // Custom classes for modal styling
import './ModalStyles.css'; //  Additional modal styles

ReactModal.setAppElement('#root'); //  Assignning element for modal to hide

const TransactionDetails = ({
  modalShown,
  modalData,
  toggleModal,
  convertToDate,
}) => (
  <ReactModal
    isOpen={modalShown}
    closeTimeoutMS={300}
    className={styles.content}
    overlayClassName={styles.overlay}
  >
    <Card title="Transaction Details" style={{ width: '100%', height: '100%' }}>
      {/* <Avatar size="large" icon="user" /> */}
      <p><strong>Creation Date: </strong>{convertToDate(modalData.creationDate)}</p>
      <p><strong>Value Date: </strong>{convertToDate(modalData.valueDate)}</p>
      <p><strong>Booking Date: </strong>{convertToDate(modalData.bookingDate)}</p>
      <p><strong>Amount: </strong>{modalData.currency ? resolvePath(modalData.currency, 'symbol') : '$'}{modalData.amount}</p>
      <p><strong>Type: </strong>{modalData.type}</p>
      <Button type="primary" onClick={() => toggleModal(false)}>Close</Button>
    </Card>
  </ReactModal>
);

export default TransactionDetails;
