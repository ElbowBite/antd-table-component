import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import resolvePath from 'object-resolve-path';

import { Table, Input, Button, Icon, Spin } from 'antd';
import TrasactionDetails from '../TransactionDetails/TransactionDetails'; //  Transaction details modal

import * as actions from '../../store/actions';
import './TableStyles.scss'; //  Additional table styles
import 'antd/dist/antd.css'; //  Default Ant Design styles

const ClientSide = ({
  transList,
  fetchList,
}) => {
  //  Fetching full list of transactions
  useEffect(() => {
    fetchList();
  }, []);

  const [modalShown, toggleModal] = useState(false); //  Modal state
  const [modalData, fillModal] = useState(''); // Modal content state

  //  Column search function
  const inputRef = React.useRef();
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={inputRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => resolvePath(record, dataIndex)
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => inputRef.current.select());
      }
    },
  });

  //  Transaction details modal toggler
  const handleClick = (record) => {
    fillModal(transList.filter((transaction) => transaction.id === record.id)[0]);
    toggleModal(true);
  };

  //  Date conversion to readable format
  const convertToDate = (date) => {
    const time = `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
    const transDate = `${new Date(date).getDate()}.${new Date(date).getMonth()}.${new Date(date).getFullYear()}`;
    return `${transDate} ${time}`;
  };

  //  Table column structure and props
  const columns = React.useMemo(
    () => [
      {
        title: 'Date and Time',
        dataIndex: 'creationDate',
        key: 'creationDate',
        render: (date) => (
          <span>{convertToDate(date)}</span>
        ),
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (value, column) => `${column.currency.symbol}${value}`,
        sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filters: [{ text: 'DEPOSIT', value: 'DEPOSIT' }, { text: 'WITHDRAWAL', value: 'WITHDRAWAL' }, { text: 'TRANSFER', value: 'TRANSFER' }],
        onFilter: (value, record) => record.type.includes(value),
      },
      {
        title: 'Linked Account',
        dataIndex: 'linked_account.name',
        key: 'linked_account.name',
        ...getColumnSearchProps('linked_account.name'),
      },
    ],
    [],
  );

  return (
    <>
      <div style={{ padding: '15px' }}>
        <Table
          dataSource={transList}
          columns={columns}
          pagination={{ showSizeChanger: true }}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleClick(record),
          })}
          loading={transList.length ? false : <Spin tip="Loading..." />}
        />
      </div>
      <TrasactionDetails
        modalShown={modalShown}
        modalData={modalData}
        toggleModal={toggleModal}
        convertToDate={convertToDate}
      />
    </>
  );
};
// Mapping store state to component props
const mapStateToProps = (state) => ({
  transList: state.transList,
});
//  Mapping store actions to component props
const mapDispatchToProps = (dispatch) => ({
  fetchList: () => dispatch(actions.fetchList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientSide);
