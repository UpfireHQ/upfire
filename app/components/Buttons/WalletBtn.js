import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import download from '../../assets/icons/ico-wallet-download.svg';
import downloadHover from '../../assets/icons/ico-wallet-download-hover.svg';
import transactions from '../../assets/icons/ico-transactions.svg';
import transactionsHover from '../../assets/icons/ico-transactions-hover.svg';
import withdraw from '../../assets/icons/ico-withdraw.svg';
import withdrawHover from '../../assets/icons/ico-withdraw-hover.svg';
import replenish from '../../assets/icons/ico-replenish.svg';
import hot from '../../assets/icons/hot.svg';
import hotHover from '../../assets/icons/hot-hover.svg';
import replenishHover from '../../assets/icons/ico-replenish-hover.svg';
import closeIcon from '../../assets/icons/ico-cross.svg';

const Button = styled.button`
  color: ${colors.textBlue3};
  text-transform: none;
  background-color: inherit;
  box-shadow: none;
  font-family: ${fonts.familyMain};
  padding: 0;
  min-height: 24px;
  border: none;
  cursor: pointer;
  font-size: ${fonts.standardSize};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.borderBlue2};
  padding: 1em 0.5em;
  border-radius: 6px;
  min-width: 9em;
  outline: none;
  &:hover {
    background-color: inherit;
    color: ${colors.mainBlueHover};
    > .download {
      background-image: url(${downloadHover});
    }
    > .transactions {
      background-image: url(${transactionsHover});
    }
    > .withdraw {
      background-image: url(${withdrawHover});
    }
    > .replenish {
      background-image: url(${replenishHover});
    }
    > .hot {
      background-image: url(${hotHover});
    }
  }
  &[disabled],
  &:disabled {
    color: ${colors.defaultBtnDisabled} !important;
    cursor: auto;
    > .disabled {
      background-image: url(${closeIcon});
      width: 16px;
      height: 16px;
    }
  }
  > span {
    display: inline-block;
    margin-right: 5px;
    background-repeat: no-repeat;
  }
  > .download {
    background-image: url(${download});
    width: 15px;
    height: 14px;
  }
  > .transactions {
    background-image: url(${transactions});
    width: 15px;
    height: 14px;
  }
  > .withdraw {
    background-image: url(${withdraw});
    width: 16px;
    height: 16px;
  }
  > .replenish {
    background-image: url(${replenish});
    width: 16px;
    height: 16px;
  }
  > .hot {
    background-image: url(${hot});
    width: 16px;
    height: 16px;
  }
`;

export default class extends React.PureComponent {
  render() {
    const {
      disabled = false,
      iconClass,
      imageIcon,
      onClick,
      title,
      ...props
    } = this.props;
    return (
      <Button {...props} onClick={onClick} disabled={disabled}>
        { !!imageIcon ? <img src={imageIcon} style={{marginRight: '5px'}}/> : <span className={iconClass || ''} />}
        {title}
      </Button>
    );
  }
}
