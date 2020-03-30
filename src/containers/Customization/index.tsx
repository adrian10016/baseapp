import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteProps, withRouter } from 'react-router-dom';
import {
    CustomizationFonts,
    CustomizationImages,
    CustomizationSpacing,
    CustomizationThemes,
    TabPanel,
} from '../../components';
import {
    RootState,
    selectUserInfo,
    selectUserLoggedIn,
    User,
} from '../../modules';

interface ReduxProps {
    user: User;
    userLoggedIn: boolean;
}

interface HistoryProps {
    history: History;
}

type Props = ReduxProps & HistoryProps & RouteProps & InjectedIntlProps;

interface State {
    currentTabIndex: number;
    isOpen: boolean;
}

class CustomizationContainer extends React.Component<Props, State> {
    public state = {
        currentTabIndex: 0,
        isOpen: false,
    };

    public renderTabs = () => {
        const { currentTabIndex } = this.state;

        return [
            {
                content: currentTabIndex === 0 ? <CustomizationThemes translate={this.translate} /> : null,
                label: this.translate('page.body.customization.tabs.themes'),
            },
            {
                content: currentTabIndex === 1 ? <CustomizationFonts translate={this.translate} /> : null,
                label: this.translate('page.body.customization.tabs.fonts'),
            },
            {
                content: currentTabIndex === 2 ? <CustomizationSpacing translate={this.translate} /> : null,
                label: this.translate('page.body.customization.tabs.spacing'),
            },
            {
                content: currentTabIndex === 3 ? <CustomizationImages translate={this.translate} /> : null,
                label: this.translate('page.body.customization.tabs.images'),
            },
        ];
    };

    public render() {
        const { user, userLoggedIn } = this.props;
        const { currentTabIndex } = this.state;

        if (!userLoggedIn || user.role !== 'superadmin' || !this.handleCheckRoute()) {
            return null;
        }

        return (
            <div className="pg-customization">
                <TabPanel
                    panels={this.renderTabs()}
                    onTabChange={this.handleChangeTab}
                    currentTabIndex={currentTabIndex}
                />
            </div>
        );
    }

    private handleChangeTab = (index: number) => {
        this.setState({
            currentTabIndex: index,
        });
    };

    private handleCheckRoute = () => {
        if (window.location.hash && window.location.hash.substring(1) === 'settings') {
            return true;
        }

        return false;
    };

    private translate = (key: string) => this.props.intl.formatMessage({id: key});
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
    userLoggedIn: selectUserLoggedIn(state),
});

// tslint:disable no-any
export const Customization = injectIntl(withRouter(connect(mapStateToProps)(CustomizationContainer) as any) as any);
