import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import navigationMoreIcon from '../../assets/icons/navigation-more.svg';
import WalletBtn from './WalletBtn';
import trans from '../../translations';

const Button = styled.button`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 0;
  background-image: url(${navigationMoreIcon});
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #111215;
  }
`;

const PopoverWrapper = styled.div`
  position: absolute;
  min-width: 170px;
  right: 8px;
  top: 38px;
  z-index: 2;
  padding: 0.8em 1.2em;
  background-color: ${colors.tooltipsBackground};
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.5);
  border-radius: 4px;

  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
`;

const MenuItem = styled.div`
  font-size: 14px;
  padding: 0.4em 0;
`;

class MoreBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMenu: false
    };
  }

  handlerMouseEnter = () => {
    clearTimeout(this.timeoutHandle);
    this.setState({
      isShowMenu: true
    });
  };

  handlerMouseLeave = () => {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => {
      this.setState({
        isShowMenu: false
      });
    }, 200);
  };

  render() {
    const { isShowMenu } = this.state;
    const { menuItems = [] } = this.props;

    return (
      <Button
        onMouseEnter={this.handlerMouseEnter}
        onMouseLeave={this.handlerMouseLeave}
      >
        <PopoverWrapper isShow={isShowMenu}>
          {menuItems.map(item => {
            return <MenuItem key={item.key}>{item.render()}</MenuItem>;
          })}
        </PopoverWrapper>
      </Button>
    );
  }
}

export default MoreBtn;
