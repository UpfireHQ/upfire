import styled from 'styled-components';
import gradients from '../../../style/gradients';
import fonts from '../../../style/font-styles';
import colors from '../../../style/colors';
import UTable from '../../../components/Table';
import { EmptyListStub, PopUp } from '../../../components';

import Dropzone from 'react-dropzone';

export const PageWrapper = styled(Dropzone)`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Stub2 = styled.div`
  background-color: #FFFFFF;
  display: flex;
  height: auto;
  min-height: 27em;
`;

export const DownloadsTable = styled(UTable)`
position: relative;
flex: 1;
width: calc(100% - 20px);
margin: 0 auto 1em;
border-collapse:separate;
border-spacing:0 5px;
> tbody {
  > tr {
    &:hover{
      &:not(.empty) {
        background: ${colors.tableHoverBackground};
      }
    }
    > td:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    > td:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    > td {
      padding: 0 1.5em;
      color: ${colors.titleblue};
      font-weight: 500;
      font-size: ${fonts.standardSize};
      background-color: transparent;
      border: 1px dashed ${colors.borderGrey};
      height: 4em;
      white-space: nowrap;
      text-transform: capitalize;
    }
  }
}
`;

export const NameCell = styled.th`
  width: 25%;
`;

export const ProgressCell = styled.th`
  width: 18%;
`;

export const StatusColumn = styled.th`
  width: 10%;
`;

export const DownloadedColumn = styled.th`
  width: 12%;
`;

export const SizeColumn = styled.th`
  width: 10%;
`;

export const EtaColumn = styled.th`
  width: 10%;
`;

export const SpeedColumn = styled.th`
  width: 10%;
`;

export const SmallDownloadProgressCover = styled.div`
  background-color: ${colors.progressEmptyBg};
  position: relative;
  width:95%;
  min-width:150px;
  height:12px;
  padding-right:0.5em;
  border-radius: 6px;
`;

export const DownloadProgressValue = styled.div`
  width:100%;
  position:absolute;
  left:0;
  top: 0;
  font-size: 11px;
  color: ${colors.titleWhite};
  text-align: center;
  z-index: 2;
`;

export const DownloadProgressBar = styled.div`
  background-image: ${gradients.redProgress};
  position:absolute;
  height:100%;
  left:0;
  top: 0;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

export const ActionsOne = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2.5em;
`;

export const PopUpTitle = styled.h2`
  font-size: ${fonts.largeSize};
  color: ${colors.titleblue};
  font-weight: 500;
  margin: 1em 0;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 0 1 100%;
  justify-content: space-between;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const FullColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 1 100%;
  position:relative;
  margin-bottom: 0;
`;

export const FileCover = styled.div`
  position:relative;
`;

export const FullFlex = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 1 100%;
  > p {
    font-size:${fonts.smallSize};
  }
`;

export const HalfFlex = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 0 0.45 45%;
  padding-right: 0.5em;
  align-items: flex-start;
  &:nth-child(2n) p{
    font-weight: 500;
  }
  > p {
    font-size: 1em;
    margin: 0.4em 0;
    color: ${colors.textBlue};
    text-transform: capitalize;
  }
`;

export const HalfFlexA = styled(HalfFlex)`
  flex: 0 0.65 65%;
  padding-right: 0;
  color: ${colors.filesTableHead};
`;

export const SecondFlex = styled(HalfFlex)`
  flex: 0 0.3 30%;
  padding-right: 0;
  color: ${colors.torrentFileDetailsPropertyName};
`;

export const FilesWrapper = styled.div`
  background: ${colors.sideWhite};
  padding: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const FilesList = styled.div`
  overflow-y: auto;
  max-height: 11em;
  font-size: ${fonts.minStandartSize};
  scrollbar {
    display: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.filesTableScroll};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.filesTableScroll};
  }
`;

export const FilesListHeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    color: ${colors.textBlue};
    font-size: 1.2em;
    padding: 0 0.5em 0.8em 0.5em;
    margin-right: 0;
    margin-bottom: .2em;
    font-weight: 500;
  }
  > div:last-child {
    font-size: 0;
  }
`;

export const FilesListRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.textBlue}
  padding: 1em 2.2em;
  margin: 0;
  cursor: pointer;
  border-radius: 0;
  background-color: ${colors.bgBlue};
  border: 1.16586px solid ${colors.borderBlue};
  border-radius: 6.99514px 6.99514px 0px 0px;
  font-weight: 500;
  font-size: 1.2em;
  text-transform: capitalize;
  position: relative;
  &:after{
    position: absolute;
    content: "";
    width: 1px;
    height: 100%;
    background-color: #CADFFF;
    right: 140px;
    top: 0;
  }
  &:hover {
    background-color: ${colors.filesTableRowHover};
  }
  &.active {
    background-color: ${colors.bgBlue};
    color: ${colors.textBlue}
  }
`;

export const TorrentInfo = styled.div`
  background-color: ${colors.bgBlue};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 1em .5em 1em 2.2em;
  width: 100%;
  border-radius: 0px 0px 6.99514px 6.99514px;
  border: 1.16586px solid ${colors.borderBlue};
  border-top: none;
`;

export const TorrentInfoDetails = styled.div`
  width: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.torrentFileDetailBg};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.torrentFileDetailBg};
  }
`;

export const FullFileColumn = styled(FullColumn)`
  margin-bottom: 0;
`;

export const TorrentName = styled.td`
  text-overflow: ellipsis;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
`;

export const TrClick = styled.tr`
  &:hover, &:active, &:focus {
    cursor:pointer;
  }
`;

export const CheckboxCell = styled.th`
  padding: 0 0 0 28px !important;
  width: 5%;
`;

export const CheckboxTdWrapper = styled.td`
  padding: 0 0 0 28px !important;
`;

export const Stub = styled(EmptyListStub)`
  background-image: none;
`;

export const MenuIcon = styled.a`
  font-size: 1em;
  padding-right: 25px;
  text-decoration:none;
  color: ${colors.downloadIcon};
`;

export const StubTitle = styled.div`
  font-size: ${fonts.largeSize};
  text-align: center;
  padding-bottom: 1.5em;
  font-weight: 500;
  font-size: 30px;
  color: ${colors.titleblue};
  margin-bottom: 20px;
`;

export const StubSubTitle = styled.div`
  font-size: ${fonts.moreStadartSize};
  color: ${colors.titleblue}
  text-align: center;
  line-height: 1.47;
  > p {
    margin: 0.2em;
    width: 685px;
    margin: 0 auto;
    font-size: 20px;
    line-height: 160%;
  }
`;

export const StubBtnWrapper = styled.div`
  padding-top: 3em;
  display: flex;
  align-items: center;
  button {
    text-align: right;
    width: 245px;
    height: 56px;
    background:  ${colors.buttonBackgroundClolor};
    border-radius: 6px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${colors.titleWhite};
    &:hover{
      background: ${colors.buttonBackgroundHoverClolor};
    }
  }
`;

export const PageHeadDownload = styled.div`
  color: ${colors.titleWhite};
  background-color: ${colors.sideWhite};
  display: flex;
  align-items: center;
  min-height: 65px;
  padding: 0 10px;
  width: calc(100% - 20px);
  border-radius: 6px;
  margin: 15px auto 10px;
  > div {
    width: 50%;
  }
  > .title {
    font-size: ${fonts.bigSize};
    text-align: center;
  }
  > .search {
    input {
      width: 228px;
      height: 40px;
      color: ${colors.titleblue};
      padding: 12px 20px;
    }
    .icon-ico-search {
      left: 190px;
    }
  }
  > .buttons {
    text-align: right;
    button{
      text-align: right;
      width: 160px;
      height: 40px;
      background:  ${colors.buttonBackgroundClolor};
      border-radius: 6px;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: ${colors.titleWhite};
      &:hover{
        background: ${colors.buttonBackgroundHoverClolor};
      }
    }
  }
`;
