import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide }    from '@mui/material';
import DeleteIcon  from '@mui/icons-material/Delete'
import { deleteCoisa } from '../../../apis/coisas';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteConfirmation(props) {
  const [open, setOpen] = React.useState(false);
  const {coisaId, setCoisaLength} = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = (id) => {
    deleteCoisa(coisaId).then(res => {
      setCoisaLength(prevLength => prevLength - 1);
      setOpen(false);
      handleClose();
    });
  }
  
  
  const handleDisagree = () => {
    setOpen(false);
  }
  return (
    <div>
      <DeleteIcon  onClick={handleClickOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Coisa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you really wish to delete coisa?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Disagree</Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}