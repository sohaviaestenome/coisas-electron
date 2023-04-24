import React, { useState, useEffect } from 'react';
import { CoisasList } from '../components/List/List';
import { CreateCoisa } from '../components/PopUp/CreateCoisa/CreateCoisa';
import './Home.css';

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
  
  return (
    <div>
      <h1>Coisas a Levar</h1>
      <CreateCoisa coisaLength={coisaLength} setCoisaLength={setCoisaLength} />
      {noCoisas && (
        <p className="no-coisas">No Coisas</p>
      )}
      <div>
        {Object.entries(pairs).map(([pair, items]) => {
          const [origem, destino] = pair.split('-');
          return (
            <div key={pair}>
              <h2>{`${origem} - ${destino}`}</h2>
              <CoisasList origem={origem} destino={destino} items={items} coisaLength={coisaLength} setCoisaLength={setCoisaLength} loading={loading} />
            </div>
          );
        })}
      </div>
    </div>
  );
};