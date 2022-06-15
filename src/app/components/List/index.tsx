import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/reducers';
import { ListView } from './List';
import { useListActions } from 'app/actions';
import { useEffect } from 'react';
const List = () => {
  let randomTime = 2;
  const dispatch = useDispatch();
  const streamActions = useListActions(dispatch);
  const { streams } = useSelector((state: RootState) => {
    return {
      streams: state.streams
    };
  });
  const randomizeRecords = () => {
    streamActions.getRandomMap();
    const min = 1;
    const max = 5;
    randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(() => {
      randomizeRecords();
    }, randomTime * 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      randomizeRecords();
    }, randomTime * 1000);
  }, []);

  return (
    <div>
      <ListView list={streams} />
    </div>
  );
};

export default List;
