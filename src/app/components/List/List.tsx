import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ListModel } from 'app/models';
import { Colors, RankColors } from 'app/constants/color';
import styled from 'styled-components';
import Counter from '../Counter';




const getOddEven = (rank: number) => {
  if (Number(rank) % 2 == 0) {
    console.log(rank, "1")
    return 1
  }
  else {
    console.log(rank, "0")
    return 0
  }

}

export const LeaderBoard = styled.div`
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
`;
export const LeaderBoardRow = styled.div<{ rank: number }>`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0px 20px;
  border-bottom: 1px solid #f9f9f9;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  color: ${(p) => (RankColors[p.rank] ? RankColors[p.rank].rowTextColor : '#000000')};
  background: ${(p) => (RankColors[p.rank] ? RankColors[p.rank].rowColor : getOddEven(p.rank + 1) ? '#f0f3fc' : '#ffffff')};
`;
export const LeftBoardContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const RankContainer = styled.div<{ rank: number }>`
   {
    height: 22px;
    width: 22px;
    border: 1px solid #ffffff;
    color: ${(p) => (RankColors[p.rank] ? RankColors[p.rank].rankTextColor : '#ffff')};
    font-size: 11px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    position: absolute;
    left: 48px;
    height: 16px;
    width: 16px;
    bottom: 4px;
    padding:1px;
    background: ${(p) => (RankColors[p.rank] ? RankColors[p.rank].rankbackgroundColor : '#4e69dd')};
  }
`;
export const ProfileContainer = styled.div<{ index: number }>`
   {
    height: 45px;
    width: 45px;
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
export const ProfileNameContainer = styled.div<{ rank: number }>`
   {
  
    font-size: 20px;
    font-weight: 500;
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
  const oldData = JSON.parse(localStorage.getItem('Old') || '')
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
    <LeaderBoard>
      {list
        .map((list, index) => (
          <LeaderBoardRow rank={index} key={index} id={list.userID} className={'list'}>
            <LeftBoardContainer>
              <RankContainer rank={index}>{index + 1}</RankContainer>
              <ProfileContainer index={index}>{list.displayName.charAt(0)}</ProfileContainer>
              <ProfileNameContainer rank={index}>{list.displayName}</ProfileNameContainer>
            </LeftBoardContainer>
            <Counter startNumber={GetStartNumber(list.userID, oldData)} endNumber={list.score} duration={1}></Counter>
          </LeaderBoardRow>
        ))}
    </LeaderBoard>
  );
};
