import React from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';
import { bytesValue } from '../../../utils/bytesformat';

const ProgressImage = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  margin: 0 1em;
`;

const Index = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
`;

const SpeedValue = styled.div`
  color: ${colors.textBlue};
  font-weight: bold;
  font-size: ${fonts.mediumSize};
`;

const ProgressImageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  > span {
    position: absolute;
    bottom: 0px;
  }
`;

export default class extends React.PureComponent {
  render() {
    const {
      AmChartsObj,
      activeColor,
      bandColor,
      speedIndicator,
      speed = 0,
      title
    } = this.props;

    const config = {
      type: 'gauge',
      theme: 'light',
      axes: [
        {
          axisAlpha: 0,
          tickAlpha: 0,
          labelsEnabled: false,
          startValue: 0,
          endValue: 100,
          startAngle: -135,
          endAngle: 135,
          bands: [
            {
              color: bandColor,
              startValue: 0,
              endValue: 100,
              radius: '100%',
              innerRadius: '0%'
            },
            {
              color: activeColor,
              startValue: 0,
              endValue: speedIndicator > 140 ? 140 : speedIndicator,
              radius: '100%',
              innerRadius: '0%',
              balloonText: '80%'
            }
          ]
        }
      ],
      export: {
        enabled: true
      }
    };
    let Chart = null;

    if (
      AmCharts &&
      typeof AmCharts.AmAngularGauge !== 'undefined' &&
      AmChartsObj
    ) {
      Chart = (
        <AmChartsObj.React
          style={{
            width: '5em',
            height: '5em'
          }}
          options={config}
        />
      );
    }

    return (
      <ProgressImage>
        <ProgressImageWrapper>
          {Chart}
          <span>{title}</span>
        </ProgressImageWrapper>
        <Index>
          <SpeedValue>
            {bytesValue(speed).split(' ')[0]}
            {bytesValue(speed).split(' ')[1]}/s
          </SpeedValue>
        </Index>
      </ProgressImage>
    );
  }
}
