import React, { useState, useEffect } from 'react';
import { CoisasList } from '../components/List/List';
import { CreateCoisa } from '../components/PopUp/CreateCoisa/CreateCoisa';
import './Home.css';
import { CircularProgress, Box } from '@mui/material';

export const Home = () => {
  const [items, setItems] = useState([]);
  const [coisaLength, setCoisaLength] = useState(100);
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);

  const noCoisas = !loading && items.length === 0;

  useEffect(() => {
    window.electron.getCoisas().then(res => {
      setItems(res.data);
      setLoading(false);
    });
  }, [coisaLength]);

  useEffect(() => {
    const pairs = items.reduce((result, item) => {
      const key = `${item.origem}-${item.destino}`;
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {});
    setPairs(pairs);
  }, [items]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1>Coisas a Levar</h1>
      <CreateCoisa coisaLength={coisaLength} setCoisaLength={setCoisaLength} />
      <div>
        {noCoisas && (
          <p className="no-coisas">No items found.</p>
        )}
        {Object.entries(pairs).map(([pair, items]) => {
          const [origem, destino] = pair.split('-');
          return (
            <div key={pair}>
              <h2>{`${origem} - ${destino}`}</h2>
              <CoisasList origem={origem} destino={destino} items={items} coisaLength={coisaLength} setCoisaLength={setCoisaLength} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
