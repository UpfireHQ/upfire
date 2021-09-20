import styled from 'styled-components';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';

export const SideWrapper = styled.div`
  background: ${colors.sideBlack};
  text-align: center;
  width: 70px;
  padding: 1em 0;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 100% !important;
  }
`;

export const TopWrapper = styled.div`
  background: ${colors.sideWhite};
  text-align: center;
  height: 70px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    height: 100% !important;
  }
`;

export const Logo = styled.img`
  max-width: 100%;
  width: 50px;
  margin: 0.8em 2em 0.8em 1em;
  display: block;
`;

export const Navigation = styled.ul`
  list-style: none;
  padding: 0;
`;

export const MenuListItem = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.8em;
  min-width: 80px;
  max-width: 80px;
  width: 0;
  cursor: pointer;
  color: ${colors.activeBlue};
	transition: all 200ms ease-in-out;
  ${({ active }) =>
    active
      ? `
    margin: 0 1em;
    padding: 1.7em 0.8em;
    max-width: 499px;
    width: auto;
    `
      : `
    border-bottom: 2px solid transparent;
    > a {
      width: 64px;
      padding: 8px 0;
      border-radius: 5px;
    };
    > span {
      display: none;
    }
  `}
`;

export const MenuIcon = styled.a`
  cursor: pointer;
  z-index: 10000;
  font-size: 1.5em;
  bottom: 0;
  display: block;
  box-sizing: border-box;
  text-decoration: none;
  color: ${colors.greyIcon};
  &:hover {
    color: ${colors.fontPrimary};
    & ~ div {
      width: auto;
      opacity: 1;
    }
  }
`;

export const TransferProgressWrapper = styled.div`
  display: flex;
  margin-right: 2em;
`;
