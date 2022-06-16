import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ListModel } from 'app/models';
import Score from '../scoreboard/Points';
import { LeaderBoard, LeaderBoardRow, RankContainer, ProfileContainer, ProfileNameContainer, LeftBoardContainer } from './styles'

export namespace StreamList {
  export interface Props {
    list: ListModel[];
  }
}

const GetStartNumber = (userID: string, oldData: any) => {
  const startValue = oldData.filter((data: any) => data.userID === userID)
  return startValue.score
}
export const StreamBoard = ({ list }: StreamList.Props): JSX.Element => {
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
            <Score startNumber={GetStartNumber(list.userID, oldData)} endNumber={list.score} duration={1}></Score>
          </LeaderBoardRow>
        ))}
    </LeaderBoard>
  );
};
