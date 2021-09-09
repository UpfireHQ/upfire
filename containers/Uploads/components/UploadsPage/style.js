import styled from 'styled-components';
import UTable from '../../../../components/Table';
import fonts from '../../../../style/font-styles';
import colors from '../../../../style/colors';
import removeIcon from '../../../../assets/icons/ico-cross.svg';
import removeIconHover from '../../../../assets/icons/ico-cross-hover.svg';
import UButton from '../../../../components/UButton';
import PopUp from '../../../../components/PopUp';
import UInput from '../../../../components/InputText';
import Ok from '../../../../assets/images/checking.svg';
import addMoreFilesIconHover from '../../../../assets/icons/add-plus-btn.svg';
import addMoreFilesIcon from '../../../../assets/icons/add-plus-btn.svg';
import addMoreFilesError from '../../../../assets/icons/add-plus-btn.svg';
import EmptyListStub from '../../../../components/EmptyListStub';
import bgMyUploads from '../../../../style/colors';

export const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

export const UploadsTable = styled(UTable)`
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
        background-color: transparent;
        border: 1px dashed ${colors.borderGrey};
        height: 4em;
        white-space: nowrap;
        text-transform: capitalize;
      }
    }
  }
`;

export const PopUpTitle = styled.h2`
  font-size: ${fonts.largeSize};
  color: ${colors.titleblue};
  font-weight: 500;
  margin: 1.5em 0 1.5em 0;
  text-align: center;
`;

export const Progress = styled.div`
  margin: 1.5em auto;
  width: 85%;
`;

export const Row = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex:0 1 100%;
  justify-content:space-between;
`;

export const HalfColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 0.48 48%;
  position:relative;
  margin-bottom:1.2em;
`;

export const FullContainer = styled.div`
  width: 100%
`;

export const FullColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 0.48 48%;
  position:relative;
  margin-bottom: 1.2em;
`;

export const PopAction = styled.div`
  margin:2em auto 1em;
  display:flex;
  align-items:center;
  justify-content:center;
`;

export const FileCover = styled.div`
  position:relative;
`;

export const WalletCover = styled.div`
  position:relative;
  width: 100%;
  margin-bottom: 1em;
`;

export const RemoveButton = styled.span`
  display: inline-block;
  cursor: pointer;
  background-image: url(${removeIcon});
  width: 11px;
  height: 11px;
  &:hover {
    background-image: url(${removeIconHover});
  }
`;

export const UfrInfoWrapper = styled.div`
  position: absolute;
  top: calc(50% - 20px);
  right: 1.5em;
`;

export const PopButton = styled(UButton)`
  margin:0 0.5em;
`;

export const SmallPopUp = styled(PopUp)`
  height:auto;
`;

export const WInput = styled(UInput)`
  font-size:${fonts.smallSize};
  padding:1em 0.5em;
`;

export const WalletButton = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 94%;
  display: block;
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
  border:1px solid ${colors.fontSecondary};
  background-color:${colors.brandSecondary};
  background-image:url(${Ok});
  &:hover {
    background-color: #0cb2c9;
  }
`;

export const PopUpImportnatMessage = styled.p`
  color:${colors.fontPrimary};
  font-size:${fonts.standardSize};
  padding:0.5em 0;
`;

export const PopUpDescription = styled.p`
  color:${colors.fontSecondary};
  font-size:${fonts.standardSize};
  padding:0.5em 0;
`;

export const Divider = styled.hr`
  width:100%;
  border:0;
  border-bottom:1px solid ${colors.fontSecondary};
`;

export const PopUpLogo = styled.img`
  width: 35px;
`;

export const PopUpSubtitle = styled.p`
  width:100%;
  text-align:center;
  color:${colors.fontPrimary};
  font-size:${fonts.moreStadartSize};
`;

export const AddButton = styled.button`
  width: 100%;
  height: 7.57em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  color: ${colors.addButtonColor}
  cursor: pointer;
  outline: none;
  background-color: ${colors.tableActivetd};
  font-size: ${fonts.minStandartSize};
  text-align: left;
  padding-left: 2.14em;
  border: 1.1px solid ${colors.addButtonBorderColor};
  &:hover {
    background-color: ${colors.addButtonBackgroundHover};
    > span {
      background-image: url(${addMoreFilesIconHover});
    }
  }
  > span {
    display: inline-block;
    background-image: url(${addMoreFilesIcon});
    margin-right: 2em;
    width: 51px;
    height: 50px;
  }
  &.with-error {
    color: ${colors.errorInputTextColor}
    text-transform: none;
    > span {
      background-image: url(${addMoreFilesError});
    }
  }
`;

export const TorrentName = styled.td`
    text-overflow: ellipsis;
    max-width: 250px;
    white-space: nowrap;
    overflow-x: hidden;
`;

export const DeletedTorrent = '#4a4949';

export const AddMoreFiles = styled.a`
  text-align: center;
  text-transform: uppercase;
  color: ${colors.textBlue};
  cursor: pointer;
  padding-top: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
  &:hover {
    color: ${colors.titleblue};
    > span {
      background-image: url(${addMoreFilesIcon});


    }
  }
  > span {
    display: inline-block;
    margin-right: 10px;
    background-image: url(${addMoreFilesIcon});
    width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
  }
`;

export const NameTable = styled.th`
  width: 40% !important;
`;

export const TorrentNameTable = styled.th`
  width: 40% !important;
`;
export const DataCell = styled.th`
  width: 9%;
`;

export const CreateDate = styled.th`
  width: 15% !important;
`;

export const TorrentInfo = styled.div`
  background-color: ${colors.sideWhite};
  height: auto;
  width: 100%;
  color: ${colors.textBlue};
  min-height: 22em;
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

export const TorrentInfoHeadAction = styled.span`
  color: ${colors.fontTablecolor};
  cursor: pointer;
  font-weight: 500;
  &:nth-child(2){
    color: ${colors.fontTableSecondcolor};
  }
  &:nth-child(3){
    color: ${colors.fontTableThirdcolor};
  }
  &:hover {
    color: ${colors.secondaryBlueHover};
  }
  margin-left: 10px;
  font-size: 1.1em;
`;

export const TorrentDetails = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
  scrollbar {
    display: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.filesTableScroll};
    border-radius: 10px;
    display: none;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.filesTableScroll};
    display: none;
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
      &:hover{
        &:not(.empty) {
          background: ${colors.tableHoverBackground};
        }
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
        background-color: ${colors.tableTitleBackground};
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

export const FilesList = styled.div`
  background-color: ${colors.filesListBackground};
  border-radius: 4px;
  padding: 1em 0.5em 0.2em 1.5em;
  margin-bottom: 1.2em;
`;

export const FilesListHead = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.bottomBorder};
  font-size: ${fonts.smallSize}
  color: ${colors.titleblue};
  padding-bottom: 0;
  margin-right: 1em;
`;

export const FilesTable = styled.div`
  max-height: 10em;
  overflow-y: auto;
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

export const FilesListRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.bottomBorder};
  font-size: ${fonts.standardSize}
  color: ${colors.inputLabel}
  padding: 0.4em 0;
  margin-right: 1em;
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

export const ProgressFull = styled.div`
  position: absolute;
  height: 100%;
  border-radius: .3em;
  background-color: ${colors.mainBlue};
`;

export const ProgressItem = styled.div`
  position: absolute;
  height: 100%;
  border-radius: .3em;
  background-color: ${colors.lightRed};
`;

export const ButtonContainer = styled.div`
  display: flex;
  display: none;
  justify-content: center;
  align-items: center;
`;

export const Stub = styled(EmptyListStub)`

`;

export const Stub2 = styled.div`
  background-color: #FFFFFF;
  display: flex;
  height: auto;
  min-height: 27em;
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
  color: ${colors.titleWhite};
  text-align: center;
  line-height: 1.47;
  > p {
    color: ${colors.titleblue};
    width: 560px;
    margin: 0 auto 20px;
    font-size: 20px;
    line-height: 160%;
  }
`;

export const StubLearnMore = styled.div`
  padding: 2em 0 3em 0;
  text-align: center;
  > a {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: ${colors.learnMore};
    &:hover {
      color: ${colors.titleblue};
    }
  }
`;

export const StubBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  button {
    width: 245px;
    height: 56px;
    background: #FF5B87;
    border-radius: 6px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${colors.titleWhite};
    &:hover{
      background: #ff2b64;
    }
    .material-icons {
      display: none;
    }
  }
`;

export const PageHead = styled.div`
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
