import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';

const Stub = styled.div`
  position: relative;
  background-color: ${colors.wrapperBackground};
  z-index: 997;
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return <Stub {...props} />;
  }
}
