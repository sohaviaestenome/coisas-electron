//List.js
import React, { useMemo } from 'react';
import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar } from '@mui/material';
import DeleteConfirmation from '../PopUp/DeleteConfirmation/DeleteConfirmation';
import FolderIcon from '@mui/icons-material/Folder';

export const CoisasList = (props) => {
  const { origem, destino, items, coisaLength, setCoisaLength } = props;

  const filteredItems = useMemo(() => {
    return items.filter(item => item.origem === origem && item.destino === destino);
  }, [items, origem, destino]);

  return (
    <>
      {filteredItems.length > 0 ? (
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
      ) : (
        <p>No coisas found for the selected origem and destino.</p>
      )}
    </>
  );
};