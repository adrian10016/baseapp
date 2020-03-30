import * as React from 'react';
import { connect } from 'react-redux';
import { RouteProps, withRouter } from 'react-router-dom';
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

type Props = ReduxProps & HistoryProps & RouteProps;

interface State {
    isOpen: boolean;
}

class CustomizationContainer extends React.Component<Props, State> {
    public state = {
        isOpen: false,
    };

    public render() {
        const { user, userLoggedIn } = this.props;

        if (!userLoggedIn || user.role !== 'superadmin') {
            return null;
        }

        return (
            <div className="pg-customization">
                Customization settings
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
    userLoggedIn: selectUserLoggedIn(state),
});

// tslint:disable no-any
export const Customization = withRouter(connect(mapStateToProps)(CustomizationContainer) as any) as any;
