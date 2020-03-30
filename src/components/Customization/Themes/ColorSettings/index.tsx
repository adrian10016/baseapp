import classnames from 'classnames';
import * as React from 'react';
import { ArrowIcon } from '../../../../assets/images/customization/ArrowIcon';
import { ThemeColorInterface } from '../index';

interface OwnProps {
    handleCloseColorSettings: () => void;
    item: ThemeColorInterface;
    translate: (key: string) => string;
}

type Props = OwnProps;

export class ColorSettings extends React.Component<Props> {
    public render() {
        const {
            handleCloseColorSettings,
            item,
            translate,
        } = this.props;

        const settingsClass = classnames('pg-customization-color-settings', {
            'pg-customization-color-settings--open': item.key,
        });

        return (
            <div className={settingsClass}>
                <div className="pg-customization-color-settings__header">
                    <div
                        className="pg-customization-color-settings__header__chevron"
                        onClick={e => handleCloseColorSettings()}
                    >
                        <ArrowIcon />
                    </div>
                    {item.title ? <span>{translate(item.title)}</span> : null}
                </div>
            </div>
        );
    }
}
