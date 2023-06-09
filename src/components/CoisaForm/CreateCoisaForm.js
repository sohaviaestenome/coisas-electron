//CreateCoisaForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import './CreateCoisaForm.css';


export const CreateCoisaForm = (props) => {
  const { onCancel, onAdd, handleClose, setAlertType, setOpenSnackbar } = props;
  const { handleSubmit, control, reset, watch } = useForm();
  const [cidades, setCidades] = useState([]);
  const [origemCidades, setOrigemCidades] = useState([]);
  const [destinoCidades, setDestinoCidades] = useState([]);

  const watchedOrigem = watch('origem');
  const watchedDestino = watch('destino');

  const onSubmit = async (data) => {
    try {
      const response = await window.electron.addCoisa(data);
      onAdd(response.data); 
      reset();
      handleClose(); 
      setAlertType('success');
      setOpenSnackbar(true); 
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCidades = async () => {
    try {
      const response = await window.electron.getCidades();
      console.log("Cidades:", response);
      setCidades(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCidades();
  }, []);

  useEffect(() => {
    setOrigemCidades(cidades.filter((cidade) => cidade.nome !== watchedDestino));
  }, [cidades, watchedDestino]);

  useEffect(() => {
    setDestinoCidades(cidades.filter((cidade) => cidade.nome !== watchedOrigem));
  }, [cidades, watchedOrigem]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-elements">
        <Controller
          name="nome"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Nome" required fullWidth />}
        />
      </div>
      <div className="form-elements">
        <Controller
          name="origem"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} select label="Origem" required fullWidth>
              {origemCidades.map((cidade) => (
                <MenuItem key={cidade.nome} value={cidade.nome}>
                  {cidade.nome}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </div>
      <div className="form-elements">
        <Controller
          name="destino"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} select label="Destino" required fullWidth>
              {destinoCidades.map((cidade) => (
                <MenuItem key={cidade.nome} value={cidade.nome}>
                  {cidade.nome}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </div>
      <div className="button-group">
        <Button type="submit" color="primary" variant="contained">
          Criar
        </Button>
        <Button color="secondary" variant="contained" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};