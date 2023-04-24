// List.js
import React, { useMemo } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  CircularProgress,
  Box
} from '@mui/material';
import DeleteConfirmation from '../PopUp/DeleteConfirmation/DeleteConfirmation';
import FolderIcon from '@mui/icons-material/Folder';

export const CoisasList = (props) => {
  const { origem, destino, items, coisaLength, setCoisaLength, loading } = props;

  const filteredItems = useMemo(() => {
    return items.filter(item => item.origem === origem && item.destino === destino);
  }, [items, origem, destino]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" marginTop={2}>
        <CircularProgress />
      </Box>
    );
  } else if (filteredItems.length > 0) {
    return (
      <List dense={false}>
        {filteredItems.map(item => (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.nome} />
            <ListItemSecondaryAction>
              <DeleteConfirmation coisaId={item.id} coisaLength={coisaLength} setCoisaLength={setCoisaLength} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  } else {
    return null;    
  }
};
