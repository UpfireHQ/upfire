import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

const TableOver = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
`;

const UTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  height: 100%;
  >thead {
    tr {
      height: 3em;
      > th:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-left: 0.5px solid ${colors.tableTheadBorder};
      }
      > th:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-right: 0.5px solid ${colors.tableTheadBorder};
      }
      th{
        padding: 0 1.5em;
        color: ${colors.titleblue};
        font-weight: 500;
        font-size: ${fonts.standardSize};
        background-color: ${colors.tableTitleBackground};
        height: 4.5em;
        font-size: ${fonts.standardSize};
        border-top: 0.5px solid ${colors.tableTheadBorder};
        border-bottom: 0.5px solid ${colors.tableTheadBorder};
      }
    }
  }
  > tbody {
    > tr {
      height: 3.3em;
      &:first-child {
        border-top: 8 px solid ${colors.wrapperBackground};
      }
      &.active {
        background: ${colors.mainHover};
        > td:first-child {
          border-left: 1px solid ${colors.textGreen};
        }
        > td:last-child {
          border-right: 1px solid ${colors.textGreen};
        }
        > td {
          color:${colors.textBlue};
          background-color: ${colors.tableActivetd};
          border-top: 1px solid ${colors.textGreen};
          border-bottom: 1px solid ${colors.textGreen};
          border-left: none;
          border-right: none;
        }
      }
      &:first-child {
        &:hover {
          color:${colors.fontPrimary};
        }
      }
      > td {
        padding: 1.1em 0 1.1em 1.8em;
        border-collapse: collapse;
        font-size: ${fonts.minStandartSize};
        color: ${colors.textBlue};
        > a {
          color: ${colors.thirdBtn};
          text-decoration: none;
          &:hover {
            color: ${colors.mainBlueHover};
          }
        }
      }
      &.empty {
      background: none;
      cursor: auto;
        > td {
          border-bottom: none;
          padding: 0;
        }
        &:hover {
          background: none;
        }
      }
      &.withoutHover {
        cursor: auto;
        &:hover {
          &:nth-child(odd){
            // background: ${colors.tableGrey};
          }
          &:nth-child(even){
            // background: ${colors.mainBlack};
          }
        }
      }
    }
  }
`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return (
      <TableOver>
        <UTable {...props} />
      </TableOver>
    );
  }
}
