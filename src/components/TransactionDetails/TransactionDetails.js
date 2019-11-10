import React from 'react';
import resolvePath from 'object-resolve-path';

import ReactModal from 'react-modal';
import { Descriptions, Icon, Modal } from 'antd';

import styles from './TransactionDetails.module.scss'; // Custom classes for modal styling
import './ModalStyles.scss'; //  Additional modal styles

ReactModal.setAppElement('#root'); //  Assignning element for modal to hide

const TransactionDetails = ({
  modalShown,
  modalData,
  toggleModal,
  convertDate,
  convertTime,
  COLORS,
  TRANS_ICONS,
  LINKED_ACC_TYPES,
}) => (
  <Modal
    visible={modalShown}
    footer={null}
    onCancel={() => toggleModal(false)}
  >
    <Descriptions title="Transaction Details" size="small" bordered column={2}>
      <Descriptions.Item label="Amount">
        {modalData.currency ? resolvePath(modalData.currency, 'symbol') : '$'} {modalData.amount}
      </Descriptions.Item>
      <Descriptions.Item label="Type">
        <Icon type={TRANS_ICONS[modalData.type]} style={{ color: COLORS[modalData.type] }} />
        {modalData.type}
      </Descriptions.Item>
      <Descriptions.Item label="Booking">
        {convertDate(modalData.bookingDate)} {convertTime(modalData.bookingDate)}
      </Descriptions.Item>
      <Descriptions.Item label="Creation">
        {convertDate(modalData.creationDate)} {convertTime(modalData.creationDate)}
      </Descriptions.Item>
      <Descriptions.Item label="Value">
        {convertDate(modalData.valueDate)} {convertTime(modalData.valueDate)}
      </Descriptions.Item>
      <Descriptions.Item label={LINKED_ACC_TYPES[modalData.type]}>
        {modalData.linked_account ? resolvePath(modalData.linked_account, 'name') : 'Not mentioned'}
      </Descriptions.Item>
      <Descriptions.Item label="Account number">
        {modalData.account ? resolvePath(modalData.account, 'number') : 'No number'}
      </Descriptions.Item>
      <Descriptions.Item label="Notes">
        {modalData.notes}
      </Descriptions.Item>
    </Descriptions>
  </Modal>
  /* <ReactModal
    isOpen={modalShown}
    closeTimeoutMS={300}
    className={styles.content}
    overlayClassName={styles.overlay}
    onRequestClose={() => toggleModal(false)}
  >
    <Descriptions title="Transaction Details" size="small" bordered column={2}>
      <Descriptions.Item label="Amount">
        {modalData.currency ? resolvePath(modalData.currency, 'symbol') : '$'} {modalData.amount}
      </Descriptions.Item>
      <Descriptions.Item label="Type">
        <Icon type={TRANS_ICONS[modalData.type]} style={{ color: COLORS[modalData.type] }} />
        {modalData.type}
      </Descriptions.Item>
      <Descriptions.Item label="Booking">
        {convertDate(modalData.bookingDate)} {convertTime(modalData.bookingDate)}
      </Descriptions.Item>
      <Descriptions.Item label="Creation">
        {convertDate(modalData.creationDate)} {convertTime(modalData.creationDate)}
      </Descriptions.Item>
      <Descriptions.Item label="Value">
        {convertDate(modalData.valueDate)} {convertTime(modalData.valueDate)}
      </Descriptions.Item>
      <Descriptions.Item label={LINKED_ACC_TYPES[modalData.type]}>
        {modalData.linked_account ? resolvePath(modalData.linked_account, 'name') : 'Not mentioned'}
      </Descriptions.Item>
      <Descriptions.Item label="Account number">
        {modalData.account ? resolvePath(modalData.account, 'number') : 'No number'}
      </Descriptions.Item>
      <Descriptions.Item label="Notes">
        {modalData.notes}
      </Descriptions.Item>
    </Descriptions>
  </ReactModal> */
);

export default TransactionDetails;
