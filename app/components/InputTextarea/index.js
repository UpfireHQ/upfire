import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

const InputFix = styled.div`
  position: relative;
  max-width: 100%;
  margin-bottom: 0;
  }
`;

const UTextarea = styled(({ getRef, ...props }) => <textarea {...props} ref={getRef} />)`
  padding: 1.2em .5em 0 1em;
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
`;

const Label = styled.label`
  color: ${colors.titleblue};
  font-weight: 500;
  position: relative;
  left: 0;
  top: -81px;
  font-size: ${fonts.standardSize};
  &:hover {
    cursor: text;
  }
`;

const Error = styled.span`
  color: ${colors.lightRed};
  position: absolute;
  left: 2.5em;
  top: .8em;
  font-size: ${fonts.smallSize};
`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { label, error = false, value } = this.props;
    return (
      <InputFix className={value !== '' ? 'is-not-empty' : ''}>
        <UTextarea
          type="text"
          {...props}
          getRef={(textarea) => {
            this.textarea = textarea;
          }}
        />
        {!error && <Label onClick={() => this.textarea.focus()}>{label}</Label>}
        {error && <Error>{error}</Error>}
      </InputFix>
    );
  }
}
