import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Logo, MenuIcon, Navigation, MenuListItem } from './style';
import logo from '../../../assets/images/logo.png';
import trans from '../../../translations';
import routes from '../../../constants/routes';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MenuTitle = styled.span`
  margin: 0 10px;
  font-size: ${fonts.mediumSize};
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  animation: moveFromLeft 200ms ease-in-out;

  @keyframes moveFromLeft {
    from {
        opacity: 0;
        transform: translateZ(0%);
      }
      to {
        opacity: 1;
        transform: translateZ(20%);
    }
  }
`;

class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handlerToUploads = this.handlerRouterTo.bind(this, routes.UPLOADS);
    this.handlerToDownloads = this.handlerRouterTo.bind(this, routes.DOWNLOADS);
    this.handlerToCompleted = this.handlerRouterTo.bind(this, routes.COMPLETED);
    this.handlerToWallet = this.handlerRouterTo.bind(this, routes.WALLET);
    this.handlerToSettings = this.handlerRouterTo.bind(this, routes.SETTINGS);
    this.handlerToUPRManage = this.handlerRouterTo.bind(this, routes.UPRMANAGE);
  }

  handlerRouterTo(path) {
    const { routerTo, router } = this.props;
    !(router && router.location && router.location.pathname === path) &&
      routerTo &&
      routerTo(path);
  }

  isActive(path) {
    const { location } = this.props.router;
    const routeActive = location && location.pathname === path;
    console.log({ routeActive, path });
    return routeActive;
  }

  render() {
    const { isAdmin } = this.props;
    return (
      <MenuWrapper>
        <Logo src={logo} />
        <Navigation>
          <MenuListItem
            onClick={this.handlerToUploads}
            active={this.isActive(routes.UPLOADS)}
            style={
              this.isActive(routes.UPLOADS)
                ? {
                    backgroundColor: `${colors.uploadMenu.bg}`,
                    borderBottom: `2px solid ${colors.uploadMenu.icon}`
                  }
                : {
                    backgroundColor: `${colors.titleWhite}`
                  }
            }
          >
            <MenuIcon
              style={{
                backgroundColor: `${colors.uploadMenu.bg}`,
                color: `${colors.uploadMenu.icon}`
              }}
              className="icon-ico2-uploads"
            />
            <MenuTitle
              style={{
                color: `${colors.uploadMenu.text}`
              }}
            >
              Uploads
            </MenuTitle>
          </MenuListItem>
          <MenuListItem
            onClick={this.handlerToDownloads}
            active={this.isActive(routes.DOWNLOADS)}
            style={
              this.isActive(routes.DOWNLOADS)
                ? {
                    backgroundColor: `${colors.downloadMenu.bg}`,
                    borderBottom: `2px solid ${colors.downloadMenu.icon}`
                  }
                : {
                    backgroundColor: `${colors.titleWhite}`
                  }
            }
          >
            <MenuIcon
              style={{
                backgroundColor: `${colors.downloadMenu.bg}`,
                color: `${colors.downloadMenu.icon}`
              }}
              className="icon-ico2-downloads"
            />
            <MenuTitle
              style={{
                color: `${colors.downloadMenu.text}`
              }}
            >
              Downloads
            </MenuTitle>
          </MenuListItem>
          <MenuListItem
            onClick={this.handlerToCompleted}
            active={this.isActive(routes.COMPLETED)}
            style={
              this.isActive(routes.COMPLETED)
                ? {
                    backgroundColor: `${colors.completedDownloadMenu.bg}`,
                    borderBottom: `2px solid ${colors.completedDownloadMenu.icon}`
                  }
                : {
                    backgroundColor: `${colors.titleWhite}`
                  }
            }
          >
            <MenuIcon
              style={{
                backgroundColor: `${colors.completedDownloadMenu.bg}`,
                color: `${colors.completedDownloadMenu.icon}`
              }}
              className="icon-ico2-completed-downloads"
            />
            <MenuTitle
              style={{
                color: `${colors.completedDownloadMenu.text}`
              }}
            >
              Completed Downloads
            </MenuTitle>
          </MenuListItem>
          <MenuListItem
            onClick={this.handlerToWallet}
            active={this.isActive(routes.WALLET)}
            style={
              this.isActive(routes.WALLET)
                ? {
                    backgroundColor: `${colors.walletMenu.bg}`,
                    borderBottom: `2px solid ${colors.walletMenu.icon}`
                  }
                : {
                    backgroundColor: `${colors.titleWhite}`
                  }
            }
          >
            <MenuIcon
              style={{
                backgroundColor: `${colors.walletMenu.bg}`,
                color: `${colors.walletMenu.icon}`
              }}
              className="icon-ico2-wallet"
            />
            <MenuTitle
              style={{
                color: `${colors.walletMenu.text}`
              }}
            >
              Wallet & Earnings
            </MenuTitle>
          </MenuListItem>
          {isAdmin ? (
            <MenuListItem
              onClick={this.handlerToUPRManage}
              active={this.isActive(routes.UPRMANAGE)}
              style={
                this.isActive(routes.UPRMANAGE)
                  ? {
                      backgroundColor: `${colors.settingsMenu.bg}`,
                      borderBottom: `2px solid ${colors.settingsMenu.icon}`
                    }
                  : {
                      backgroundColor: `${colors.titleWhite}`
                    }
              }
            >
              <MenuIcon
                style={{
                  backgroundColor: `${colors.settingsMenu.bg}`,
                  color: `${colors.settingsMenu.icon}`
                }}
                className="icon-ico-ufr"
              />
              <MenuTitle
                style={{
                  color: `${colors.settingsMenu.text}`
                }}
              >
                Manage UPR
              </MenuTitle>
            </MenuListItem>
          ) : null}
          <MenuListItem
            onClick={this.handlerToSettings}
            active={this.isActive(routes.SETTINGS)}
            style={
              this.isActive(routes.SETTINGS)
                ? {
                    backgroundColor: `${colors.settingsMenu.bg}`,
                    borderBottom: `2px solid ${colors.settingsMenu.icon}`
                  }
                : {
                    backgroundColor: `${colors.titleWhite}`
                  }
            }
          >
            <MenuIcon
              style={{
                backgroundColor: `${colors.settingsMenu.bg}`,
                color: `${colors.settingsMenu.icon}`
              }}
              className="icon-ico2-settings"
            />
            <MenuTitle
              style={{
                color: `${colors.settingsMenu.text}`
              }}
            >
              Settings
            </MenuTitle>
          </MenuListItem>
        </Navigation>
      </MenuWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.upr && state.upr.get('isAdmin')
  };
};

export default connect(mapStateToProps)(TopMenu);
