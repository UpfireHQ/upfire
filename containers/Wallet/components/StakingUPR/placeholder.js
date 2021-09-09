import React, { Component } from 'react';
import {
  StakingUPRSection,
  SubtitleWrapper,
  Subtitle,
  StakingUPRSectionWrapper
} from './style';

class StakingUPRPlaceholder extends Component {
  render() {
    return (
      <StakingUPRSectionWrapper>
        <StakingUPRSection
          style={{
            minHeight: '245px'
          }}
        >
          <SubtitleWrapper
            style={{
              height: '4.5em'
            }}
          >
            <Subtitle>UPR Staking</Subtitle>
          </SubtitleWrapper>
          Coming soon
        </StakingUPRSection>
      </StakingUPRSectionWrapper>
    );
  }
}

export default StakingUPRPlaceholder;
