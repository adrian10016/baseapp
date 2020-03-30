import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { SettingsIcon } from '../../../assets/images/customization/SettingsIcon';
import { ColorSettings } from './ColorSettings';

export interface ThemeColorInterface {
    key: string;
    title: string;
}

const AVAILABLE_COLORS: ThemeColorInterface[] = [
    { key: '--main-background-color', title: 'page.body.customization.themes.color.mainBackgroundColor' },
    { key: '--body-background-color', title: 'page.body.customization.themes.color.bodyBackgroundColor' },
    { key: '--header-background-color', title: 'page.body.customization.themes.color.headerBackgroundColor' },
    { key: '--subheader-background-color', title: 'page.body.customization.themes.color.subheaderBackgroundColor' },
    { key: '--dropdown-background-color', title: 'page.body.customization.themes.color.dropdownBackgroundColor' },
    { key: '--icons', title: 'page.body.customization.themes.color.icon' },
    { key: '--primary-cta-color', title: 'page.body.customization.themes.color.primaryCtaColor' },
    { key: '--contrast-cta-color', title: 'page.body.customization.themes.color.contrastCtaColor' },
    { key: '--secondary-contrast-cta-color', title: 'page.body.customization.themes.color.secondaryContrastCtaColor' },
    { key: '--cta-layer-color', title: 'page.body.customization.themes.color.ctaLayerColor' },
    { key: '--system-green', title: 'page.body.customization.themes.color.systemGreen' },
    { key: '--system-red', title: 'page.body.customization.themes.color.systemRed' },
    { key: '--system-yellow', title: 'page.body.customization.themes.color.systemYellow' },
    { key: '--asks', title: 'page.body.customization.themes.color.asks' },
    { key: '--bids', title: 'page.body.customization.themes.color.bids' },
    { key: '--primary-text-color', title: 'page.body.customization.themes.color.primaryTextColor' },
    { key: '--text-contrast-color', title: 'page.body.customization.themes.color.textContrastColor' },
    { key: '--input-background-color', title: 'page.body.customization.themes.color.inputBackgroundColor' },
    { key: '--divider-color', title: 'page.body.customization.themes.color.dividerColor' },
    { key: '--shadow-color', title: 'page.body.customization.themes.color.shadowColor' },
    { key: '--landing-background-color', title: 'page.body.customization.themes.color.landingBackgroundColor' },
    { key: '--strength-meter-very-strong', title: 'page.body.customization.themes.color.strengthMeterVeryStrong' },
];

interface OwnProps {
    translate: (key: string) => string;
}

type Props = OwnProps;

interface State {
    colorSettingsItem: ThemeColorInterface;
}

const defaultColorSettingsItem = {
    key: '',
    title: '',
};

export class CustomizationThemes extends React.Component<Props, State> {
    public state = {
        colorSettingsItem: defaultColorSettingsItem,
    };

    public renderColorsItem(item: ThemeColorInterface, index: number) {
        const { translate } = this.props;

        return (
            <div key={index} className="pg-customization-themes__colors__item" onClick={e => this.handleSetColorSettingsItem(item)}>
                <div className="pg-customization-themes__colors__item__content">
                    <span
                        className="pg-customization-themes__colors__item__content__circle"
                        style={{backgroundColor: `var(${item.key})`}}
                    />
                    <span className="pg-customization-themes__colors__item__content__title">{translate(item.title)}</span>
                </div>
                <div className="pg-customization-themes__colors__item__settings-icon">
                    <SettingsIcon />
                </div>
            </div>
        );
    }

    public renderColors() {
        return (
            <div className="pg-customization-themes__colors">
                <PerfectScrollbar>
                    {AVAILABLE_COLORS.map((item, index) => this.renderColorsItem(item, index))}
                </PerfectScrollbar>
            </div>
        );
    }

    public render() {
        const { translate } = this.props;
        const { colorSettingsItem } = this.state;

        return (
            <div className="pg-customization-themes">
                {this.renderColors()}
                <ColorSettings
                    handleCloseColorSettings={this.handleSetColorSettingsItem}
                    item={colorSettingsItem}
                    translate={translate}
                />
            </div>
        );
    }

    private handleSetColorSettingsItem = (item?: ThemeColorInterface) => {
        let newSettings: ThemeColorInterface = defaultColorSettingsItem;

        if (item) {
            newSettings = item;
        }

        this.setState({ colorSettingsItem: newSettings });
    };
}
