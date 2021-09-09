import React, { Fragment } from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import trans from '../../translations';
import searchIcon from '../../assets/icons/ico-search-no-results.svg';

const NoMinters = styled.td`
  vertical-align: center;
`;

const NoMintersIcon = styled.div`
  text-align: center;
  margin-bottom: 1em;
  > span {
    display: inline-block;
    background-image: url(${searchIcon});
    width: 80px;
    height: 80px;
  }
`;

const NoMintersText = styled.div`
  text-align: center;
  color: ${colors.greyIcon};
  font-weight: 300;
  font-size: ${fonts.veryLargeSize};
  padding-bottom: 0.7em;
`;

const NoMintersAction = styled.div`
  text-align: center;
`;

const Reset = styled.a`
  color: ${colors.mainBlue};
  font-size: ${fonts.middleSize};
  &:hover {
    color: ${colors.secondaryBlueHover};
  }
`;

const NoMintersWrapper = styled.div`
  &.absolute {
    position: absolute;
    width: 100%;
    padding: 4em 2em;
  }
`;

export default class extends React.PureComponent {
  handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    const { onClick } = this.props;
    onClick && onClick();
  };

  render() {
    const { colSpan, absolute = false, isSearch } = this.props;
    return (
      <tr className="empty">
        <NoMinters colSpan={colSpan}>
          <NoMintersWrapper className={absolute ? 'absolute' : ''}>
            {isSearch ? (
              <Fragment>
                <NoMintersIcon>
                  <span />
                </NoMintersIcon>
                <NoMintersText>
                  {trans('Upload.searchResultEmpty')}
                </NoMintersText>
              </Fragment>
            ) : null}
            {!isSearch ? <NoMintersText>No minters</NoMintersText> : null}
            <NoMintersAction>
              {isSearch ? (
                <Reset href="#" onClick={this.handleClick}>
                  {trans('Upload.searchReset')}
                </Reset>
              ) : null}
            </NoMintersAction>
          </NoMintersWrapper>
        </NoMinters>
      </tr>
    );
  }
}
