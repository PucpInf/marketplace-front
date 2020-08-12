/**
 * Transaction table section
 */
/* eslint-disable */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Scrollbars } from 'react-custom-scrollbars';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
         {children}
      </Typography>
   );
}

// const TransactionColumns = ['Transaction Id', 'date', 'account', 'type', 'amount', 'debit', 'balance'];

// const TransferColumns = ['Transfer Id', 'date', 'account', 'type', 'amount', 'balance', 'status'];

// const ExpenseColumns = ['item No', 'date', 'type', 'company name', 'amount', 'status'];

const SaleColumns = ['Order ID', 'date', 'amount'];

const DownloadColumns = ['Payment ID', 'date', 'amount'];

class TransactionList extends Component {

   state = {
      value: 0,
   };

   handleChange = (event, value) => {
      this.setState({ value });
   };

   render() {
      // const { theme, transactionList, transferReport, expenseCategory } = this.props;
      const { theme, saleList, downloadList} = this.props;
      return (
         <div className="Transaction-table-wrap Tab-wrap">
            <AppBar position="static" color="default">
               <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
               >
                  <Tab label="order list" className="text-capitalize" />
                  <Tab label="payment list" className="text-capitalize" />
               </Tabs>
            </AppBar>
            <SwipeableViews
               axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
               index={this.state.value}>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     <Table className="table-wrap">
                        <TableHead>
                           <TableRow>
                              {SaleColumns.map((th, index) => (
                                 <TableCell key={index} className="fw-bold">{th}</TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {saleList.map((list, index) => (
                              <TableRow key={index}>
                                 <TableCell>{list.Payment_orderId}</TableCell>
                                 <TableCell>{list.Payment_create_time.slice(0,10)}</TableCell>
                                 <TableCell>{list.Payment_amount}</TableCell>
                                 {/* <TableCell><Chip label={list.type} className={list.typeColor} /></TableCell>
                                 <TableCell>{list.amount}</TableCell>
                                 <TableCell>{list.debit}</TableCell>
                                 <TableCell>{list.balance}</TableCell> */}
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </TabContainer>
               </div>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     <Table className="table-wrap" >
                        <TableHead>
                           <TableRow>
                              {DownloadColumns.map((th, index) => (
                                 <TableCell key={index} className="fw-bold">{th}</TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {downloadList.map((list, index) => (
                              <TableRow key={index}>
                                 <TableCell>{list.ProviderRevenue_paymentId}</TableCell>
                                 <TableCell>{list.ProviderRevenue_create_time.slice(0,10)}</TableCell>
                                 <TableCell>{list.ProviderRevenue_amount}</TableCell>
                                 {/* <TableCell><Chip label={list.type} className={list.typeColor} /></TableCell>
                                 <TableCell>{list.amount}</TableCell>
                                 <TableCell>{list.balance}</TableCell>
                                 <TableCell><Chip label={list.status} className={list.statusColor} /></TableCell> */}
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </TabContainer>
               </div>
            </SwipeableViews>
         </div>
      );
   }
}

export default withStyles(null, { withTheme: true })(TransactionList);
