import React, { Component } from 'react';
import {
  GraphInfo,
  Index,
  Info,
  InfoContainer,
  OneGraph,
  StatisticGraph,
  Subtitle,
  SubtitleWrapper,
  SubtitleIcon
} from './style';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';
import walletStatsIcon from '../../../../assets/icons/ico2-wallet-bal-stats.svg';

import moment from 'moment';

import trans from '../../../../translations';
import { CircleFilesGraph, CircleTokensGraph } from '../../../../components';
import { ufrFormat } from '../../../../utils/math';
import EthClient from '../../../../blockchain/client';
// import StakingUPR from '../StakingUPR';
import UPRTotalSupply from '../UPRTotalSupply';
import StakingUPRPlaceholder from '../StakingUPR/placeholder';

const mocupChangeBalance = [
  {
    timestamp: 1527789908,
    balance: 5
  },
  {
    timestamp: 1527862838,
    balance: 50
  },
  {
    timestamp: 1528122968,
    balance: 120
  },
  {
    timestamp: 1528822269,
    balance: 400
  },
  {
    timestamp: 1529646721,
    balance: 250
  },
  {
    timestamp: 1530237316,
    balance: 600
  },
  {
    timestamp: 1530280486,
    balance: 210
  },
  {
    timestamp: 1530603211,
    balance: 60
  },
  {
    timestamp: 1530704896,
    balance: 20
  },
  {
    timestamp: 1531199971,
    balance: 100
  },
  {
    timestamp: 1532683611,
    balance: 150
  }
];

export default class WalletGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AmChartsObj: require('@amcharts/amcharts3-react'),
      isTest: false
    };
    this.changeBalance = this.changeBalance.bind(this);
  }

  get last() {
    const { changeBalance } = this.props;
    if (changeBalance && changeBalance.length >= 2) {
      return [
        this.fromWei(
          changeBalance[changeBalance.length - 1].e.returnValues._balance
        ),
        this.fromWei(
          changeBalance[changeBalance.length - 2].e.returnValues._balance
        )
      ];
    }
  }

  fromWei = value => EthClient.instance.fromWei(value);

  changeBalance() {
    const { isTest } = this.state;
    const { changeBalance } = this.props;
    const data = [];

    if (changeBalance && changeBalance.length) {
      for (const item of changeBalance) {
        data.push({
          date: moment(item.block.timestamp * 1000).toDate(),
          value: ufrFormat(this.fromWei(item.e.returnValues._balance))
        });
      }
    } else if (isTest) {
      for (const item of mocupChangeBalance) {
        data.push({
          date: moment(item.timestamp * 1000).toDate(),
          value: item.balance
        });
      }
    }

    if (data.length === 0) {
      data.push({
        date: moment().toDate(),
        value: 0
      });
    }
    return data;
  }

  get chartOptions() {
    return {
      type: 'serial', // serial, pie, xy, radar, funnel, gauge, map, gantt, stock.
      theme: 'black',
      addClassNames: true,
      pathToImages: '../../../../assets/amchart/images/',
      marginTop: 0,
      marginRight: 10,
      dataProvider: this.changeBalance(),
      fillOpacity: 1,
      valueAxes: [
        {
          axisColor: 'transparent',
          gridColor: '#8B9CB9',
          axisAlpha: '.3',
          gridAlpha: '.6',
          dashLength: 0,
          position: 'left',
          tickLength: 0,
          color: '#7486A8',
          fontSize: 10,
          gridThickness: '.5'
        }
      ],
      categoryAxis: {
        parseDates: true,
        axisColor: 'transparent',
        gridColor: '#8B9CB9',
        axisAlpha: '.3',
        gridAlpha: '.6',
        minPeriod: 'mm',
        dashLength: 0,
        minHorizontalGap: 60,
        equalSpacing: true,
        tickLength: 0,
        color: '#7486A8',
        fontSize: 10,
        gridThickness: '.5'
        // autoGridCount: false,
        // gridCount: 10
      },
      mouseWheelZoomEnabled: false,
      graphs: [
        {
          id: 'g1',
          balloonText:
            '<span style="font-size:10px;font-weight:normal;text-transform:uppercase;">' +
            '<span style="color:' +
            colors.borderBlue3 +
            ';padding:0 1em .5em 1em;">[[category]]</span><br/><span style="color:' +
            colors.lightRed +
            ';padding:0 1em;">[[value]] ' +
            trans('popups.upload.ETH') +
            '</span></span>',
          bullet: 'round',
          bulletSize: 10,
          bulletBorderColor: 'transparent',
          lineColor: colors.borderBlue3,
          lineThickness: 5,
          negativeLineColor: colors.lightRed,
          valueField: 'value',
          bulletColor: colors.strokePurple,
          type: 'smoothedLine',
          bulletAlpha: 0,
          fillAlphas: 1,
          fillColors: ['#FFBEEC', '#FFFFFF']
        }
      ],
      balloon: {
        fixedPosition: false,
        adjustBorderColor: true,
        borderColor: 'transparent',
        color: colors.titleWhite,
        cornerRadius: 10,
        verticalPadding: 15,
        horizontalPadding: 15,
        borderThickness: 0,
        fillColor: 'transparent',
        fontSize: fonts.standardSize,
        textAlign: 'middle',
        minWidth: 100,
        fillAlpha: 1,
        shadowAlpha: 0
      },
      chartCursor: {
        cursorAlpha: 0,
        valueLineAlpha: 0,
        fullWidth: true,
        categoryBalloonEnabled: false,
        graphBulletAlpha: 1
      },
      dataDateFormat: 'hh',
      categoryField: 'date',
      export: {
        enabled: false
      },
      creditsPosition: 'bottom-left'
    };
  }

  get balanceTimeChart() {
    const { AmChartsObj, isTest } = this.state;
    const { disableChangeBalanceLoading, changeBalance } = this.props;

    if (!changeBalance && !disableChangeBalanceLoading && !isTest) {
      return (
        <InfoContainer>
          <Info />
          <div>{trans('wallet.data.loading')}</div>
        </InfoContainer>
      );
    }

    return (
      AmChartsObj && (
        <AmChartsObj.React
          style={{
            width: '100%',
            height: '240px'
          }}
          options={this.chartOptions}
        />
      )
    );
  }

  get delta() {
    const { availableBalance, changeBalance } = this.props;

    if (changeBalance && changeBalance.length > 1) {
      if (availableBalance > 0) {
        let percent = (100 * (last[0] - last[1])) / availableBalance;
        let value = (percent > 0 ? '+ ' : '- ') + Math.abs(percent).toFixed(2);
        return <span className={percent < 0 ? 'minus' : ''}> {value} %</span>;
      }
    }

    return null;
  }

  render() {
    const { AmChartsObj } = this.state;
    const {
      totalSpending,
      totalReceiving,
      upload,
      download,
      seed,
      tokenTotalSupply,
      isAdmin,
      wallet
    } = this.props;

    if (!wallet) {
      return null
    }

    return (
      <React.Fragment>
        <StatisticGraph>
          <SubtitleWrapper>
            <SubtitleIcon>
              <img src={walletStatsIcon} />
            </SubtitleIcon>
            <Subtitle>{trans('wallet.titles.WalletStatistic')}</Subtitle>
          </SubtitleWrapper>
          {this.balanceTimeChart}
        </StatisticGraph>
        {isAdmin ? (
          <UPRTotalSupply {...this.props} tokenTotalSupply={tokenTotalSupply} />
        ) : null}
        {/* <StakingUPR isAdmin={isAdmin} {...this.props} /> */}
        {/* <StakingUPRPlaceholder {...this.props} /> */}
        <OneGraph
          style={{
            gridArea: 'circleD'
          }}
        >
          <SubtitleWrapper>
            <SubtitleIcon className="icon-ico2-token-bal"></SubtitleIcon>
            <Subtitle>{trans('wallet.titles.TokensBalance')}</Subtitle>
          </SubtitleWrapper>
          <GraphInfo>
            <CircleTokensGraph
              AmChartsObj={AmChartsObj}
              totalSpending={this.fromWei(totalSpending)}
              totalReceiving={this.fromWei(totalReceiving)}
            />
          </GraphInfo>
        </OneGraph>
        <OneGraph
          style={{
            gridArea: 'circleE',
            justifyContent: isAdmin ? 'center' : undefined
          }}
        >
          <div>
            <SubtitleWrapper>
              <SubtitleIcon className="icon-ico2-file-flow-size"></SubtitleIcon>
              <Subtitle>{trans('wallet.titles.FilesFlow')}</Subtitle>
            </SubtitleWrapper>
            <GraphInfo>
              <CircleFilesGraph
                AmChartsObj={AmChartsObj}
                upload={upload}
                download={download}
                seed={seed}
              />
            </GraphInfo>
          </div>
        </OneGraph>
      </React.Fragment>
    );
  }
}
