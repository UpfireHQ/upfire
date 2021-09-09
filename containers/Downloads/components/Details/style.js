import styled from 'styled-components';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';

export const DetailsWrapper = styled.div`
  background-color: ${colors.sideWhite};
  height: auto;
  min-height: 22em;
  padding-bottom: 0;
  position: absolute;
  bottom: 5em;
  z-index: 999;
`;

export const Field = styled.div`
  width:100%;
  padding: 0;
  background-color: ${colors.tableTitleBackground};
`;

export const Menu = styled.div`
  display:flex;
  flex-flow:row wrap;
  justify-content: space-between;
  align-items:center;
  margin:0;
  padding: 0.8em 2.5em;
  background-color: ${colors.sideWhite};
  border-bottom: 1px solid ${colors.tableBorderBottom};
  .icon-ico-find-f-ile {
    color: ${colors.fontTableSecondcolor};
  }
  .icon-ico-remove-file {
    color: ${colors.fontTableThirdcolor};
  }
`;

export const Nav = styled.ul`
  display:inline;
  padding:0;
  margin: 0;
  > li {
    display:inline-block;
    padding-right: 3em;
  }
`;

export const TorrentInfoHeadActions = styled.div`

`;

export const TorrentInfoHeadAction = styled.span`
  color: ${colors.fontPrimary};
  cursor: pointer;
  &:hover {
    color: #b1b7f0;
  }
  margin-left: 10px;
  font-size: ${fonts.bigSize};
`;

export const MenuLink = styled.a`
  color: ${colors.textBlue};
  padding:1em 0.7em;
  transition: all 0.3s;
  font-size: 1.1em;
  font-weight: 400;
  position: relative;
  &:after{
    position: absolute;
    content: "";
    width: 100%;
    height: 4px;
    background: ${colors.afterLinkBackground};
    top: 102%;
    left: 0;
    display: none;
  }
  &:hover {
    color: ${colors.textBlue};
  }
  &.selected, &:active, &:focus {
    color: ${colors.textBlue};
    font-weight: 500;

  }
  &.selected:after {
    display: block;
  }

  &:focus:after {
    display: block;
  }

  &:active:after {
    display: block;
  }
`;

export const Column = styled.div`
  display:flex;
  flex-flow:column wrap;
  padding: 0;
`;

export const Row = styled.div`
  display:flex;
  flex-flow:row wrap;
  justify-content:space-between;
  align-items: flex-start;
  background-color: ${colors.tableTitleBackground};
  padding: 1em 0 1em 0;
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

export const HalfFlex = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 0.45 45%;
  padding-right:0.5em;
  align-items: flex-start;
  > p {
    margin: 0;
  }
`;

export const HalfFlexDetail = styled(HalfFlex)`
  color:${colors.textBlue};
  flex: 0 0.61 61%;
  padding: .5em 2.5em;
  font-weight: 500;
`;

export const SecondFlex = styled(HalfFlex)`
  flex: 0 0.2 20%;
  padding: 0.5em 2.5em;
  color: ${colors.textBlue};
`;

export const ThirdFlex = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 0.33 33%;
  align-items: flex-start;
  justify-content:space-between;
`;

export const SpeedColumnFlex = styled(HalfFlex)`
  flex: 0 0.39 39%;
  padding: .5em 2.5em;
  color: ${colors.textBlue};
`;

export const FullFlex = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 1 100%;
`;

export const FileTbodyRow = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 1 100%;
  align-items: flex-start;
  justify-content:space-between;
`;

export const FileTheadFirst = styled(HalfFlex)`
  color: ${colors.textBlue};
  flex: 0 0.4 40%;
  padding: .5em 2.5em;
  font-weight: 500;
`;

export const FileTheadSecond = styled(HalfFlex)`
  flex: 0 0.6 60%;
  padding: .5em 2.5em;
  color: ${colors.textBlue};
  font-weight: 500;
`;

export const FileTbodyFirst = styled(HalfFlex)`
  color:${colors.textBlue};
  flex: 0 0.4 40%;
  padding: .5em 2.5em;
`;

export const FileTbodySecond = styled(HalfFlex)`
  flex: 0 0.60 60%;
  padding: .5em 2.5em;
  color:${colors.textBlue};
`;
