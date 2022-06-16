import styled from 'styled-components';
export const PointsContainer = styled.div`
    display: flex;
    align-items: center;
    font-size:25px;
    font-weight:500;
    @media (max-width: 767px) {
    font-size:20px;
    margin:15px 0;
    font-weight:400;
    }
`;
export const PointsText = styled.p`
    padding-left: 5px;
    display: flex;
    align-items: center;
    color:#bab8b8;
    font-size:22px;
    font-weight:300;
    margin:15px 0;
    @media (max-width: 767px) {
        display:none
    }
}
`