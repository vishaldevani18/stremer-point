import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ListModel } from 'app/models';
import { Colors, RankColors } from 'app/constants/color';
import styled from 'styled-components';
import Counter from '../Counter';
export const Grid = styled.div`
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
`;
export const DivGrid = styled.div<{ rank: number }>`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #f9f9f9;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  background: ${(p) => (RankColors[p.rank] ? RankColors[p.rank].rowColor : '#ffff')};
`;
export const LeftDiv = styled.div`
  display: flex;
  align-items: center;
`;
export const LeftInnerNumberDiv = styled.div<{ rank: number }>`
   {
    height: 22px;
    width: 22px;
    border: 1px solid #8c9ea8;
    background: ${(p) => (RankColors[p.rank] ? RankColors[p.rank].backgroundColor : '#ffff')};
    color: ${(p) => (RankColors[p.rank] ? RankColors[p.rank].textColor : '#8c9ea8')};
    font-size: 14px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    @media (max-width: 767px) {
      position: absolute;
      left: 37px;
      height: 16px;
      width: 16px;
      bottom: 7px;
      background: ${(p) => (RankColors[p.rank] ? RankColors[p.rank].backgroundColor : '#ffff')};
    }
  }
`;
export const LeftInnerProfileDiv = styled.div<{ index: number }>`
   {
    height: 30px;
    width: 30px;
    color: #fff;
    background: ${(p) => Colors[p.index]};
    font-size: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    border: 1px solid #c4cdf6;
  }
`;
export const LeftInnerNameDiv = styled.div`
   {
    font-size: 16px;
    font-weight: 500;
  }
`;
export const RightDiv = styled.div`
   {
    font-size: 16px;
    color: #467aff;
    font-weight: bold;
  }
`;
export namespace StreamList {
  export interface Props {
    list: ListModel[];
  }
}

const GetStartNumber = (userID: string, oldData: any) => {
  const startValue = oldData.filter((data: any) => data.userID === userID)
  return startValue.score
}
export const ListView = ({ list }: StreamList.Props): JSX.Element => {
  console.log("new", list)
  const oldData = JSON.parse(localStorage.getItem('Old') || '')
  console.log('old', oldData)
  const [ids, setIds] = useState(oldData.sort((a: any, b: any) => b.score - a.score).map((data: any) => data.userID))
  const rects = React.useRef(new Map()).current;

  useEffect(() => {
    const newsorting = list.map((data: any) => data.userID)
    setIds(newsorting)
  }, [list])

  useEffect(() => {
    const squares: NodeListOf<Element> = document.querySelectorAll<HTMLInputElement>('.list');
    for (const square of squares as any) {
      rects.set(square.id, square.getBoundingClientRect());
    }
  }, [])
  useLayoutEffect(() => {
    const squares = document.querySelectorAll('.list')
    for (const square of squares as any) {
      const cachedRect = rects.get(square.id)
      if (cachedRect) {
        const nextRect = square.getBoundingClientRect()
        const translateY = cachedRect.y - nextRect.y;
        rects.set(square.id, nextRect)
        square.animate([{ transform: `translateY(${translateY}px)` }, { transform: `translateY(0px)` }], 500)
      }

    }
  }, ids)
  return (
    <Grid>
      {list
        .map((list, index) => (
          <DivGrid rank={index} key={index} id={list.userID} className={'list'}>
            <LeftDiv>
              <LeftInnerNumberDiv rank={index}>{index + 1}</LeftInnerNumberDiv>
              <LeftInnerProfileDiv index={index}>{list.displayName.charAt(0)}</LeftInnerProfileDiv>
              <LeftInnerNameDiv>{list.displayName}</LeftInnerNameDiv>
            </LeftDiv>
            {/* <RightDiv>{list.score}</RightDiv> */}
            <Counter startNumber={GetStartNumber(list.userID,oldData)} endNumber={list.score} duration={1}></Counter>
          </DivGrid>
        ))}
    </Grid>
  );
};
