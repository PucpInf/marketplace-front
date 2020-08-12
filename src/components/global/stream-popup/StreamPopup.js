/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Player } from 'video-react';

class StreamPopup extends React.Component {
   state = {
      open: false,
   };

    open = () => {
        this.setState({ open: true });
    };

    close = () => {
        this.setState({ open: false });
    };
    
    render() {   
        const { contentData } = this.props;
        console.log(contentData);
        let videoStream;
        if(contentData && contentData.types.length > 0 ) {
            videoStream = contentData.types[0].id === 1;
        }
        return (
            <Dialog
                fullWidth={true}
                maxWidth = {'md'}
                open={this.state.open}
                onClose={this.close.bind(this)}
                aria-labelledby="responsive-dialog-title"
                >
                <DialogContent className="p-20 text-center">
                    <div className="iron-invoice-wrap bg-base">
                        {videoStream ?                         
                            <Player
                                playsInline                            
                                src={contentData.info.location}
                            />
                        :
                            <Player
                                playsInline
                                fluid={false}
                                height={80}
                                width={`100%`}                     
                                src={contentData.info.location}
                            />
                        }
                        <div className="text-left bg-secondary px-sm-50 px-15 py-sm-50 py-20">
                            <h5 className="mb-sm-20 mb-10">{contentData.info.title}</h5>
                            <h6 className="mb-sm-25 mb-10">{contentData.info.description}</h6>
                            <h6 className="mb-sm-25 mb-10">{`Uploaded on: ${contentData.info.created.slice(0,10)}`}</h6>
                        </div>
                    </div>
                </DialogContent>
                {/* <DialogActions className="px-20 pb-20 justify-content-center">
                    <Button onClick={() => this.closeDialog(true)} className="button btn-active mr-15">
                        yes
                    </Button>
                    <Button onClick={() => this.closeDialog(false)} className="button btn-active mr-15" autoFocus>
                        no
                    </Button>
                </DialogActions> */}
            </Dialog >
        );
   }
}

export default StreamPopup;