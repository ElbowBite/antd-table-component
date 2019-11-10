import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Spin, Tabs, Radio, Divider, Icon, Tooltip, Card, BackTop, Anchor, Affix } from 'antd';
import TrasactionDetails from '../TransactionDetails/TransactionDetails'; //  Transaction details modal

import * as actions from '../../store/actions';
import './Transactions.scss'; //  Additional table styles
import 'antd/dist/antd.css'; //  Default Ant Design styles
//  import styles from './Transactions.module.scss';

const { Link } = Anchor;

const Transactions = ({
  transList,
  fetchList,
}) => {
  //  Fetching full list of transactions
  useEffect(() => {
    fetchList();
  }, []);

  const [filteredData, updateData] = useState(transList); //  Filtered list of transactions
  useEffect(() => {
    updateData(transList);
  }, [transList]);

  const [modalShown, toggleModal] = useState(false); //  Modal state
  const [modalData, fillModal] = useState(''); // Modal content state
  // Transaction type colors
  const COLORS = {
    DEPOSIT: 'limegreen',
    WITHDRAWAL: 'tomato',
  };
  const TRANS_ICONS = {
    DEPOSIT: 'rise',
    WITHDRAWAL: 'fall',
  };
  const { TabPane } = Tabs;
  const MONTHS = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'Noveber',
    12: 'December',
  };
  const MONTHS_LENGTH = [
    31,
    28,
    30,
    31,
    30,
    31,
    30,
    31,
    30,
    31,
    30,
    31,
  ];
  const LINKED_ACC_TYPES = {
    DEPOSIT: 'Sender',
    WITHDRAWAL: 'Recipient',
  };

  //  Date conversion to readable format
  const convertDate = (date) => {
    const month = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth()}` : new Date(date).getMonth() + 1;
    const transDate = `${new Date(date).getDate()}.${month}.${new Date(date).getFullYear()}`;
    return transDate;
  };

  //  Time conversion to readable format
  const convertTime = (time) => {
    const minutes = new Date(time).getMinutes() < 10 ? `0${new Date(time).getMinutes()}` : new Date(time).getMinutes();
    const transTime = `${new Date(time).getHours()}:${minutes}`;
    return transTime;
  };

  //  Transaction details modal toggler
  const handleClick = (record) => {
    fillModal(filteredData.filter((transaction) => transaction.id === record.id)[0]);
    toggleModal(true);
  };
  //  Currency with tooltip
  const currencyTooltip = (currency) => (
    <Tooltip title={currency.name}>
      <span style={{ fontSize: '14px' }}>{currency.symbol}</span>
    </Tooltip>
  );
  //  Amount styled with tooltip
  const amountTooltip = (amount) => (
    <Tooltip title="Amount">
      <span style={{ fontSize: '16px', fontWeight: '700' }}>{amount}</span>
    </Tooltip>
  );
  //  Get each month's transactions
  const monthlyTransactions = (month) => filteredData.filter(
    (t) => new Date(t.creationDate).getMonth() === month - 1,
  );
  // Get each day's transactions
  const dalyTransactions = (transactions, day) => transactions.filter(
    (t) => new Date(t.creationDate).getDate() === day,
  );
  //  Return daily grouped transactions
  const TransactionOfADay = (monthNum) => {
    const group = [];
    for (let i = 1; i <= MONTHS_LENGTH[monthNum - 1]; i++) {
      if (dalyTransactions(monthlyTransactions(monthNum), i).length) {
        group.push(
          <div key={i} style={{ alignContent: 'center' }}>
            <Divider
              style={{ margin: '7px auto 7px auto' }}
              id={`${i}-${MONTHS[monthNum]}`}
            >
              {i} {MONTHS[monthNum]}
            </Divider>
            {dalyTransactions(monthlyTransactions(monthNum), i).map(
              (t) => (
                <Card
                  size="small"
                  title={currencyTooltip(t.currency)}
                  extra={amountTooltip(t.amount)}
                  hoverable
                  style={{ margin: 'auto auto 10px', width: '350px' }}
                  headStyle={{ textAlign: 'left' }}
                  bodyStyle={{ display: 'flex', alignItems: 'center' }}
                  onClick={() => handleClick(t)}
                >
                  <Tooltip title={t.type}>
                    <Icon type={TRANS_ICONS[t.type]} style={{ color: COLORS[t.type] }} />
                  </Tooltip>
                  {/* <Divider type="vertical" /> */}
                  <Tooltip title="Account number">
                    <span style={{ flex: '1' }}>
                      {t.linked_account.name}
                    </span>
                  </Tooltip>
                  {/* <Divider type="vertical" /> */}
                  <Tooltip title={LINKED_ACC_TYPES[t.type]}>
                    {t.account.number}
                  </Tooltip>
                </Card>
              ),
            )}
            <BackTop />
          </div>,
        );
      }
    }
    return group;
  };
  //  Building anchors
  const anchorBuilder = (monthNum) => {
    const anchors = [];
    for (let i = 1; i <= MONTHS_LENGTH[monthNum - 1]; i++) {
      if (dalyTransactions(monthlyTransactions(monthNum), i).length) {
        anchors.push(<Link href={`#${i}-${MONTHS[monthNum]}`} title={i} />);
      }
    }
    return anchors;
  };
  //  Handle filter change
  const handleFilter = (e) => {
    const filter = e.target.value;
    let newList = [];
    switch (filter) {
      case 'DEPOSIT': {
        newList = transList.filter((t) => t.type === filter);
        break;
      }
      case 'WITHDRAWAL': {
        newList = transList.filter((t) => t.type === filter);
        break;
      }
      default: {
        newList = transList;
      }
    }
    updateData(newList);
  };

  return (
    <>
      <div style={{ padding: '10px 10px 10px 10px', margin: 'auto', maxWidth: '550px' }}>
        <Spin spinning={!transList.length} size="large" tip="loading transactions...">
          <Radio.Group defaultValue="all" onChange={handleFilter}>
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="DEPOSIT">Deposit</Radio.Button>
            <Radio.Button value="WITHDRAWAL">Withdrawal</Radio.Button>
          </Radio.Group>
          <Tabs defaultActiveKey={(new Date().getMonth() + 1).toString()} size="small" tabBarGutter={15} tabBarStyle={{ margin: '0' }}>
            {Object.keys(MONTHS).map(((monthNum) => (
              <TabPane tab={MONTHS[monthNum]} key={monthNum}>
                <Affix offsetTop={15} style={{ position: 'absolute', margin: '15px 0 0 0' }}>
                  <Anchor>
                    {anchorBuilder(monthNum)}
                  </Anchor>
                </Affix>
                {TransactionOfADay(monthNum)}
              </TabPane>
            )))}
          </Tabs>
        </Spin>
      </div>
      <TrasactionDetails
        modalShown={modalShown}
        modalData={modalData}
        toggleModal={toggleModal}
        convertDate={convertDate}
        convertTime={convertTime}
        COLORS={COLORS}
        TRANS_ICONS={TRANS_ICONS}
        LINKED_ACC_TYPES={LINKED_ACC_TYPES}
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

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
