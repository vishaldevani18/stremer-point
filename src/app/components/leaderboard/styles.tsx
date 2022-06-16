import { Colors, RankColors } from 'app/constants/color';
import styled from 'styled-components';
const getOddEven = (rank: number) => {
  if (Number(rank) % 2 == 0) {
    return 1
  }
  else {
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
  padding: 0px 30px;
  border-bottom: 1px solid #e1e4ec;
  border-top: 1px solid #e1e4ec;
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
    left: 57px;
    height: 16px;
    width: 16px;
    bottom: 4px;
    padding:1px;
    background: ${(p) => (RankColors[p.rank] ? RankColors[p.rank].rankbackgroundColor : '#4e69dd')};
    @media (max-width: 767px) {
    left: 50px;
    height: 12px;
    width: 12px;
    bottom: 7px;
    }
  }
`;
export const ProfileContainer = styled.div<{ index: number }>`
   {
    height: 43px;
    width: 43px;
    color: #fff;
    background: ${(p) => Colors[p.index]};
    font-size: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    border: 1px solid #c4cdf6;
    @media (max-width: 767px) {
      height: 30px;
      width: 30px;
      }
  }
`;
export const ProfileNameContainer = styled.div<{ rank: number }>`
   {
  
    font-size: 20px;
    font-weight: 500;
    @media (max-width: 767px) {
      font-size: 18px;
      }
  }
`;