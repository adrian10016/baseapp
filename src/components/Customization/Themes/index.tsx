import * as React from 'react';

interface OwnProps {
    translate: (key: string) => string;
}

type Props = OwnProps;

export class CustomizationThemes extends React.Component<Props> {
    public render() {
        const { translate } = this.props;

        return (
            <div className="pg-customization-themes">
                <span className="pg-customization-themes__coming-soon">
                    {translate('page.body.customization.comingSoon')}
                </span>
            </div>
        );
    }
}
