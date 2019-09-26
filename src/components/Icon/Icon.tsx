import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { Svg, SvgProps } from '../Svg/Svg';
import classnames from 'classnames';

export interface IconProps extends SvgProps {}

const baseClassName = 'fi-icon';

const StyledSvg = styled((props: SvgProps) => <Svg {...props} />)`
  display: inline-block;
  width: 24px;
  height: 24px;
`;

export class Icon extends Component<IconProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <StyledSvg
        {...passProps}
        className={classnames(className, baseClassName)}
      />
    );
  }
}
