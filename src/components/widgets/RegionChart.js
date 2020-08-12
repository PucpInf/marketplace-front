/**
 * Buy Sell Chart
 */
/* eslint-disable */
import React, { Fragment } from 'react';
import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend,
} from 'recharts';

class RegionChart extends React.Component {
   state = {
      anchorEl: null,
      allData: null,
      chartData: null,
   };
   componentDidMount() {
      this.setState({
         allData: this.props.data,
      })
      for (let item of this.props.data) {
         if (item.tag === 'month') {
            this.setState({
               chartData: item
            })
         }
      }
   }

   changeChartData(tag) {
      let { allData } = this.state;
      for (let item of allData) {
         if (item.tag == tag) {
            this.setState({
               chartData: item
            });
            break;
         }
      }
   }

   handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
   };

   handleClose = () => {
      this.setState({ anchorEl: null });
   };

   render() {
      const { anchorEl, chartData } = this.state;
      return (
         <div className="app-card">
            <div className="app-card-title">
               <div className="d-sm-flex justify-content-between align-items-center">
                  <h5 className="text-uppercase">Reveneu by region</h5>
               </div>
            </div>
            <div className="app-content pl-0">
               <Fragment>
                  {chartData !== null ?
                     <ResponsiveContainer width='100%' height={450}>
                        <LineChart
                           data={chartData.data}
                        >
                           <XAxis dataKey="name" />
                           <YAxis axisLine={false} />
                           <Tooltip />
                           <CartesianGrid vertical={false} stroke="#f5f5f5" />
                           <Line type="monotone" dataKey="Sale" stroke="#283593" strokeWidth={3} />
                           <Line type="monotone" dataKey="Download" stroke="#0097a7" strokeWidth={3} />
                           {/* <Line type="monotone" dataKey="Transfer" stroke="#e0e0e0" strokeWidth={3} /> */}
                        </LineChart>
                     </ResponsiveContainer>
                     :
                     "Loading..."
                  }
               </Fragment>
            </div>
            {/* <RctSectionLoader /> */}
         </div>
      )
   }
}

export default RegionChart;
