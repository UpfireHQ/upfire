import styled from 'styled-components';
import fonts from '../../../style/font-styles';
import colors from '../../../style/colors';
import UTable from '../../../components/Table';
import { EmptyListStub, PopUp } from '../../../components';

export const PageWrapper = styled.div`
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

export const Stub3 = styled(EmptyListStub)`
display: block;
height: 100%;
`;

export const DownloadsTable = styled(UTable)`
position: relative;
flex: 1;
width: calc(100% - 20px);
margin: 0 auto 2.5em;
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
      height: 4em;
      white-space: nowrap;
      text-transform: capitalize;
      background-color: transparent;
      border: 1px dashed ${colors.borderGrey};
      > button{
        padding: 0;
        color: ${colors.titleWhite};
        font-size: ${fonts.standardSize};
        -webkit-transition: all 0.2s linear;
        -moz-transition: all 0.2s linear;
        -o-transition: all 0.2s linear;
        transition: all 0.2s linear;
        width: 100px;
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
      }
    }
  }
}
`;

export const PopUpTitle = styled.h2`
  font-size:${fonts.largeSize};
  color:${colors.fontPrimary};
  font-weight:400;
  margin:1em 0;
  text-align:center;
`;

export const FullColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 1 100%;
  position:relative;
  margin-bottom:1.2em;
`;

export const NameCell = styled.th`
  width: 40%;
`;

export const DataCell = styled.th`
  width: 10%;
`;

export const FilesCell = styled.th`
  width: 15%;
`;

export const TorrentName = styled.td`
  text-overflow: ellipsis;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
`;

export const DeletedTorrent = '#4a4949';

export const TrClick = styled.tr`
  &:hover, &:active, &:focus {
    cursor:pointer;
  }
`;

export const TorrentInfo = styled.div`
  background-color: ${colors.sideWhite};
  width: 100%;
  height: auto;
  min-height: 22em;
  padding-bottom: 0;
  position: absolute;
  bottom: 5em;
  z-index: 999;
`;

export const TorrentInfoHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(172, 172, 204, 0.08);
  padding: 0.8em 2.5em;
  border-bottom: 0.5px solid ${colors.tableTheadBorder};
`;

export const TorrentInfoHeadName = styled.div`
  color: ${colors.titleblue};
  font-size: 1.1em;
  text-transform: capitalize;
  font-weight: 500;
`;

export const TorrentBtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TorrentInfoHeadActions = styled.div`

`;

export const TorrentInfoHeadAction = styled.span`
  color: ${colors.fontTablecolor};
  cursor: pointer;
  font-weight: 500;
  margin-left: 10px;
  &:nth-child(2){
    color: ${colors.fontTableSecondcolor};
  }
  &:nth-child(3){
    color: ${colors.fontTableThirdcolor};
  }
  &:hover {
    color: ${colors.secondaryBlueHover};
  }
`;

export const TorrentDetails = styled.div`
  overflow-y: auto;
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

export const TorrentDetailsRow = styled.div`
  display: flex;
  padding: .5em 0;
`;

export const TorrentDetailsTitle = styled.div`
  width: 20%;
  color: ${colors.fontSecondary}
`;

export const TorrentDetailsValue = styled.div`
  width: 80%;
  color: ${colors.fontPrimary};
`;

export const GotItLink = styled.div`
  width: 67px;
  color: ${colors.switchActive};
  text-align: center;
`;

export const GotItLinkWrapper = styled.td`
  width: 13%;
  padding: .4em 1.5em .4em 1.5em !important;
`;

export const Stub = styled(EmptyListStub)`

`;

export const MenuIcon = styled.a`
  font-size: 1em;
  padding-right: 25px;
  text-decoration:none;
  color: ${colors.colpleteDownloadIcon};
`;

export const StubTitle = styled.div`
  font-size: ${fonts.largeSize};
  color: ${colors.titleblue};
  text-align: center;
  padding-bottom: 1em;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const StubSubTitle = styled.div`
  font-size: ${fonts.moreStadartSize};
  color: ${colors.titleblue};
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
  button{
    color: ${colors.titleWhite};
    font-weight: 500;
    font-size: 16px;
    background-color: ${colors.titleblue};
    border-radius: 6px;
    margin-top: 20px;
    &:hover {
      border: none;
      background-color: ${colors.mainActiveBlue};
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

export const TorrentDetailsTable = styled(UTable)`
    position: relative;
    flex: 1;
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    background-color: ${colors.tableTitleBackground};
    > thead {
      tr{
        height: 3em;
        > th:first-child {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-left: none;
          width: 18%;
          padding-left: 2.5em;
        }
        > th:last-child {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: none;
          padding-left: 2.5em;
        }
        th {
          text-align: left;
          border: none;
          background-color: ${colors.tableTitleBackground};
          border-radious: 0;
          border-bottom: 0.5px solid ${colors.tableTheadBorder};
          height: 4em;
          padding: 0 1.5em;
          width: 12%;
        }
      }
    }
  > tbody {
    > tr {
      background: ${colors.tableTitleBackground};
      &:hover {
        background: ${colors.tableTitleBackground};
        color:${colors.titleblue};
        cursor: pointer;
      }
      > td:first-child {
        padding-left: 2.5em;
      }
      > td:last-child {
        padding-left: 2.5em;
      }
      > td {
        padding: 0 1.5em;
        text-align: left;
        color: ${colors.textBlue};
        font-weight: 400;
        font-size: ${fonts.standardSize};
        height: 4em;
        white-space: nowrap;
        text-transform: capitalize;
        border-bottom: 0.5px solid ${colors.tableTheadBorder};
      }
    }
  }
`;

export const TorrentDescription = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: ${colors.titleblue};
  background-color: ${colors.tableTitleBackground};
  padding: 1.5em 2.5em 0.8em;
`;

export const TorrentValue = styled.div`
  font-size: 13px;
  line-height: 19px;
  color: ${colors.titleblue};
  background-color: ${colors.tableTitleBackground};
  padding: 0 3em 2em;
`;

export const TorrentNameTable = styled.th`
  width: 40% !important;
`;

