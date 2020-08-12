/**
 * reports
 */
/* eslint-disable */
import React, { Component, Fragment } from 'react';
import TransactionList from '../../../../components/widgets/TransactionList';
import ContentLoader from '../../../../components/global/loaders/ContentLoader';

//firebase
import firebase from '../../../../firebase';

//component
import BuySellChart from '../../../../components/widgets/BuySellChart';
import publicServices from '../../../../services/publicServices';

import qs from 'query-string-object'

export default class ReveneuReports extends Component {
    state = {
        anchorEl: null,
        transactionList: null,
        transferReport: null,
        expenseCategory: null,
        allChartData: null,

        chartData: null,
        saleList: null,
        downloadList: null,
    };

    componentDidMount() {
        this.getReveneuData();
        // this.getTransactionListData();
        // this.getTransferReportData();
        // this.getExpenseCategoryData();
        // this.getAllChartData();
    }

    getReveneuData() {
        var date = new Date();
        var currentYear = date.getFullYear();
        const userInfo = localStorage.getItem('user');
        const user = JSON.parse(userInfo);
        const  urlparams = qs.stringify({
            year: currentYear,
            providerId: user.provider.id,
        }); 
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
        publicServices.getReveneuStats(urlparams).then((res)=>{
            if(res.status == 200) {
                // process data
                let chartData = [];
                const {saleRevenue,downloadRevenue, saleList, downloadList} = res.data;
                let saleObj,downloadObj;
                for (let i = 0; i < 12 ; i++) {
                    saleObj = saleRevenue.find(x => x.month_val === i);
                    downloadObj = downloadRevenue.find(x => x.month_val === i);
                    chartData.push({Sale: saleObj ? saleObj.total : 0, Download: downloadObj ? downloadObj.total : 0, name: monthNames [i]})
                }
                let newChart = [];
                newChart.push({ data: chartData, tag: 'month'});
                this.setState({chartData:newChart,saleList:saleList,downloadList:downloadList});
            }
        })
    }
    // //get transaction data
    // getTransactionListData() {
    //     const transactionListRef = firebase.database().ref('transaction_list');
    //     transactionListRef.on('value', (snapshot) => {
    //         let transactionList = snapshot.val();
    //         this.setState({
    //             transactionList: transactionList
    //         });
    //     });
    // }
    // //get transfer report data
    // getTransferReportData() {
    //     const transferReportRef = firebase.database().ref('transfer_report');
    //     transferReportRef.on('value', (snapshot) => {
    //         let transferReport = snapshot.val();
    //         this.setState({
    //             transferReport: transferReport
    //         });
    //     });
    // }
    // //get expense category data
    // getExpenseCategoryData() {
    //     const expenseCategoryRef = firebase.database().ref('expense_category');
    //     expenseCategoryRef.on('value', (snapshot) => {
    //         let expenseCategory = snapshot.val();
    //         this.setState({
    //             expenseCategory: expenseCategory
    //         });
    //     });
    // }
    // //get chart data
    // getAllChartData() {
    //     const allChartDataRef = firebase.database().ref('chart_Data');
    //     allChartDataRef.on('value', (snapshot) => {
    //         let newdata = snapshot.val();
    //         this.setState({
    //             allChartData: newdata
    //         });
    //     });
    // }

    render() {
        const { chartData,saleList,downloadList } = this.state;
        return (
            <Fragment>
                { chartData != null && saleList != null && downloadList != null ?
                <div className="inner-container">
                    <div className="iron-reports-wrap">
                        <BuySellChart data={chartData}/>
                        <div className="iron-shadow rounded p-20 bg-base">
                            <TransactionList saleList={saleList} downloadList={downloadList}/>
                        </div>
                    </div>
                </div>
                :
                <ContentLoader />
                }
            </Fragment>
        )
    }
}