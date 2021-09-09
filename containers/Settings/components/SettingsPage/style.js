import styled from 'styled-components';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';
import { EmptyListStub } from '../../../../components';

export const PageWrapper = styled.div`
  overflow: hidden;
  height: 100%;
`;

export const Stub = styled(EmptyListStub)`
  background-color: $(colors.wrapperBackground);
  justify-content: start;
`;

export const SettingsTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  width: calc(100% - 20px);
  margin-top: 15px;
  > tbody {
    > tr {
      &:hover{
        &:not(.empty) {
          background: ${colors.tableHoverBackground};
        }
      }
      > td: first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      > td: last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      > td {
        padding: 0 1.5em;
        color: ${colors.titleblue};
        font-weight: 500;
        font-size: ${fonts.standardSize};
        background-color: ${colors.tableBackground};
        height: 4.5em;
        border-top: 6px solid ${colors.wrapperBackground};
        border-bottom: 6px solid ${colors.wrapperBackground};
      }
    }
  }
`;

export const SettingName = styled.td`
    text-overflow: ellipsis;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    font-size: ${fonts.mediumSize};
`;

export const CheckColumn = styled.td`
  width: 40%;
  text-align: right;
`;

export const BtnDefault = styled.button`
  padding: 0;
  color: ${colors.titleWhite};
  font-size: ${fonts.standardSize};
  -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
  width: 161px;
  height: 34px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: ${colors.checkBtnBackground};
  &:hover {
    background-color: ${colors.greyIcon};
    color: ${colors.titleWhite};
  }
  &:focus {
    outline: 0;
  }
`;

export const PopUpTitle = styled.h2`
  font-size: ${fonts.largeSize};
  color: ${colors.titleblue};
  font-weight: 500;
  margin: 0 0 1.5em 0;
  text-align: center;
`;

export const Progress = styled.div`
  margin: 1.5em auto;
  width: 85%;
`;

export const ProgressDescription = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.inputLabel};
  padding-bottom: 1em;
  font-size: ${fonts.moreStadartSize};
  > div {
    > span {
      color: ${colors.titleWhite};
    }
  }
`;


export const ProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  height: .6em;
  border-radius: .3em;
  background-color: ${colors.inputFormBackground};
`;

export const ProgressItem = styled.div`
  position: absolute;
  height: 100%;
  border-radius: .3em;
  background-color: ${colors.mainBlue};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3em;
`;

export const FullColumn = styled.div`

  flex-flow:column wrap;
  flex:0 1 100%;
  position:relative;
  margin-bottom: 1.2em;
`;

export const PopUpProgressTitle = styled.h2`
  font-size: ${fonts.largeSize};
  color: ${colors.titleblue};
  font-weight: 400;
  margin: 1em 0;
  text-align: center;
`;

export const PopUpSubtitle = styled.p`
  width:100%;
  text-align:center;
  color:${colors.fontPrimary};
  font-size:${fonts.moreStadartSize};
`;

