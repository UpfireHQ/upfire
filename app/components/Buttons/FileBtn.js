import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fileAdd from '../../assets/icons/icon-plus-btn.svg';
import saveTo from '../../assets/icons/ico2-save-to.svg';
import fileAddHover from '../../assets/icons/ico-add-hover.svg';

const FileButton = styled.button`
  position: absolute;
  top: 11px;
  right: 10px;
  width: 2.3em;
  height: 2.3em;
  font-size: 1em;
  display: block;
  border: none;
  border-radius: 6px;
  color: ${colors.titleWhite}
  cursor: pointer;
  outline: none;
  background-image: url(${saveTo});
  &:hover {
    color: ${colors.titleblue};
    background-color: ${colors.uploadButtonPlus};
    > span {
      background-image: url(${fileAddHover});
      background-repeat: norepeat;
    }
  }
  > span {
    // background-image: url(${fileAdd});
    // display: inline-block;
    width: 19px;
    height: 19px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`;

export default class extends React.PureComponent {
  render() {
    const { onClick } = this.props;
    return (
      <FileButton onClick={onClick}>
      </FileButton>
    );
  }
}
