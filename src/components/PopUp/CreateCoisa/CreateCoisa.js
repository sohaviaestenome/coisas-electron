//CreateCoisa.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { CreateCoisaForm } from "../../CoisaForm/CreateCoisaForm";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/lab/Alert';


export const CreateCoisa= (props) => {
  const [open, setOpen] = useState(false);
  const {coisaLength, setCoisaLength, setAlertVisibility, setAlertUnsucessCreate } = props
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState('success');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Coisa a Levar
      </Button>
      <Dialog open={open} onClose={handleClose}   >
        <DialogTitle>Criar Coisa a Levar</DialogTitle>
        <div className = "sleepform" style={{ padding: 20, overflow: "hidden" }}>
          <CreateCoisaForm 
          onCancel={handleClose}
          handleClose={handleClose}
          coisaLength = {coisaLength}
          setCoisaLength={setCoisaLength}
          setAlertVisibility={setAlertVisibility}
          setAlertUnsucessCreate={setAlertUnsucessCreate}
          setOpenSnackbar={setOpenSnackbar}
          setAlertType={setAlertType}
          onAdd={(newItem) => {
            setCoisaLength(coisaLength + 1); // Update the coisaLength here
          }}
        />
        </div>
      </Dialog>
      <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={alertType} variant="filled">
            Coisa a levar criada com sucesso!
          </Alert>
        </Snackbar>
    </div>
  );
};