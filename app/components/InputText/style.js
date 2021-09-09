import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

export const InputFix = styled.div`
  position: relative;
  width: 100%;
  height: 4.3em;
  margin-bottom: 15px;
  }
`;

export const UInput = styled(({getRef, ...props}) => <input {...props} ref={getRef}/>)`
  padding: 0 3.5em 0 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${colors.tableTitleBackground};
  border: 1.16586px solid ${colors.inputBorderColor};
  font-size: ${fonts.standardSize};
  color: ${colors.titleblue};
  width:100%;
  height: 3.8em;
  border-radius: 6px;
  outline: none;
  font-family: ${fonts.familyMain};
  background-image: linear-gradient(${colors.mainBlue}, ${colors.mainBlue}), linear-gradient(transparent, transparent);
  background-repeat: no-repeat;
  background-position: center top,center calc(100% - 1px);
  background-size: 0 1px, 100% 1px;
  transition: background 0s ease-out;
  &.to-center {
    text-align: center;
    &:focus {
      ~ label {
        left: 0;
      }
    }
  }
  &::placeholder {
    padding-bottom: .5em;
    color: ${colors.inputLabel};
  }
  &::selection { background: ${colors.mainBlue}; }
`;

export const Label = styled.label`
  color: ${colors.titleblue};
  font-weight: 500;
  position: relative;
  left: 0;
  top: -80px;
  font-size: ${fonts.standardSize};
  &.to-center {
    left: 0 !important;
    width: 100%;
    text-align: center;
  }
  &:hover {
    cursor: text;
  }
`;

export const Error = styled.span`
  color: ${colors.errorInputTextColor};
  position: absolute;
  left: 1.3em;
  top: 0.5em;
  font-size: ${fonts.smallSize};
  &.to-center {
    left: 0;
    width: 100%;
    text-align: center;
  }
`;

export const EyeIcon = styled.div`
  position: absolute;
  right: 1.5em;
  top: 0;
  height: 3.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  > span {
    color: ${colors.inputLabel};
    font-size: ${fonts.bigSize};
  }
  &:hover {
    > span {
      color: ${colors.secondaryBlueHover};
    }
  }
;`;
