/**
 * order history page
 */
import React, { Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import publicServices from '@services/publicServices';
//firebase
import firebase from '../../../firebase';

//component
import ContentLoader from '../../../components/global/loaders/ContentLoader';

class OrderHistory extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         orderHistory: null,
         historyList: {
            subscriptionPayments: [],
            productPayments: [],
         },
      }
   }

   componentDidMount() {
      this.getTableData();
      // subscriptionPayments productPayments
      const userString = localStorage.getItem('user');
      if (userString) {
         const user = JSON.parse(userString);
         publicServices.historyProducts(user.client.id).then((res)=>{
            this.setState({
               historyList: res.data,
            })
         });
      }
      
   }

   //get table data
   getTableData() {
      const orderHistoryRef = firebase.database().ref('order_history');
      orderHistoryRef.on('value', (snapshot) => {
         //console.log(snapshot.val())
         let orderHistory = snapshot.val();
         this.setState({
            orderHistory: orderHistory
         });
      });
   }

   render() {
      const { historyList } = this.state;
      return (
         <Fragment>
               <div className="iron-table-wrapper">
                  <h4>Pagos por suscripciones</h4>
                  <Table className="iron-table-wrap">
                     <TableHead>
                        <TableRow>
                           <TableCell className="iron-th">no.</TableCell>
                           <TableCell className="iron-th">codigo pago</TableCell>
                           <TableCell className="iron-th">monto</TableCell>
                           <TableCell className="iron-th">fecha</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {historyList.subscriptionPayments.map((orderItem, index) => {
                           return (
                              <TableRow key={index}>
                                 <TableCell className="iron-td">{index + 1}</TableCell>
                                 <TableCell className="iron-td">{orderItem.invoiceId}</TableCell>
                                 <TableCell className="iron-td">{`${orderItem.currency} ${orderItem.amount}`}</TableCell>
                                 <TableCell className="iron-td">{orderItem.create_time.split('T')[0]}</TableCell>
                                 {/*<TableCell className="iron-td"><i className="material-icons">{orderItem.action}</i></TableCell>*/}
                              </TableRow>
                           );
                        })}
                     </TableBody>
                  </Table>
                  <br/>
                  <h4>Pagos por productos</h4>
                  <Table className="iron-table-wrap">
                     <TableHead>
                        <TableRow>
                           <TableCell className="iron-th">no.</TableCell>
                           <TableCell className="iron-th">codigo pago</TableCell>
                           <TableCell className="iron-th">product name</TableCell>
                           <TableCell className="iron-th">price</TableCell>
                           <TableCell className="iron-th">fecha</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {historyList.productPayments.map((orderItem, index) => {
                           return (
                              <TableRow key={index}>
                                 <TableCell className="iron-td">{index + 1}</TableCell>
                                 <TableCell className="iron-td">{orderItem.orderId}</TableCell>
                                 <TableCell className="iron-td">{orderItem.content.title}</TableCell>
                                 <TableCell className="iron-td">{`${orderItem.currency} ${orderItem.amount}`}</TableCell>
                                 <TableCell className="iron-td">{orderItem.create_time.split('T')[0]}</TableCell>
                              </TableRow>
                           );
                        })}
                     </TableBody>
                  </Table>
               </div>
         </Fragment>
      )
   }
}
export default OrderHistory;