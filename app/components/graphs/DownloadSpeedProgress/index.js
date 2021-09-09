import React, { PureComponent } from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import trans from '../../../translations/index';
import { client } from '../../../utils/torrent/index';
import { lnProgres } from '../../../utils/lnProgress';
import { TIME_DOWNLOAD_SPEED } from '../../../constants/time';
import Speed from '../Speed';


const SpeedWrapper = styled.div`
  padding-bottom: 0;
  font-size: 0.8em
`;
export default class DownloadSpeedProgress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      downloadSpeed: 0,
      AmChartsObj: require('@amcharts/amcharts3-react')
    };
  }

  componentWillMount() {
    const interval = setInterval(this.syncDownloadSpeed, TIME_DOWNLOAD_SPEED);
    this.setState({interval});
  }

  componentWillUnmount() {
    const {interval} = this.state;
    interval && clearInterval(interval);
    this.setState = () => {};
  }

  syncDownloadSpeed = () => {
    this.setState({
      downloadSpeed: client.downloadSpeed
    });
  };

  render() {
    const {downloadSpeed, AmChartsObj} = this.state;
    const lnDownload = lnProgres(downloadSpeed); // from 0 to 100
    const increase = lnDownload ? (14 * (lnDownload / 10)) : 0;

    return (
      <SpeedWrapper>
        <Speed
          AmChartsObj={AmChartsObj}
          speedIndicator={increase}
          speed={downloadSpeed}
          activeColor={colors.activeGreen}
          bandColor={colors.downloadBand}
          title={trans('wallet.buttons.Download')}
        />
      </SpeedWrapper>
    );
  }
}
