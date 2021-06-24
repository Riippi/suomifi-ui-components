import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { ariaLabelOrHidden, ariaFocusableNoLabel } from '../../utils/aria';
import {
  SuomifiStaticIcon,
  SuomifiStaticIconInterface,
  SuomifiComponentIconInterface,
  SuomifiComponentIcon,
} from 'suomifi-icons';
import {
  IconBaseProps,
  iconLogger,
  cursorPointerClassName,
  baseClassName,
} from '../Icon/Icon';
import { staticIconBaseStyles } from './StaticIcon.baseStyles';

export { IllustrativeIconKeys, DoctypeIconKeys } from 'suomifi-icons';

const staticIconBaseClassName = `fi-static-icon`;

export interface StaticIconProps
  extends IconBaseProps,
    SuomifiStaticIconInterface {
  highlightColor?: string;
  baseColor?: string;
}

const StyledSuomifiStaticIcon = styled(
  ({
    ariaLabel,
    mousePointer,
    highlightColor,
    ...passProps
  }: StaticIconProps) => (
    <SuomifiStaticIcon
      {...passProps}
      {...ariaLabelOrHidden(ariaLabel)}
      {...ariaFocusableNoLabel(ariaLabel)}
    />
  ),
)`
  ${staticIconBaseStyles}
`;

/**
 * Static icon-component
 */
export class StaticIcon extends Component<StaticIconProps> {
  render() {
    const { icon, className, mousePointer, ...passProps } = this.props;
    const { ariaLabel } = this.props;

    if (icon !== undefined) {
      return (
        <StyledSuomifiStaticIcon
          {...passProps}
          icon={icon}
          className={classnames(
            baseClassName,
            staticIconBaseClassName,
            className,
            {
              [cursorPointerClassName]: !!mousePointer,
            },
          )}
        />
      );
    }

    iconLogger(ariaLabel, className);

    return;
  }
}

export interface ComponentIconProps
  extends IconBaseProps,
    SuomifiComponentIconInterface {}

const StyledSuomifiComponentIcon = styled(
  ({ ariaLabel, mousePointer, ...passProps }: ComponentIconProps) => (
    <SuomifiComponentIcon
      {...passProps}
      {...ariaLabelOrHidden(ariaLabel)}
      {...ariaFocusableNoLabel(ariaLabel)}
    />
  ),
)`
  ${staticIconBaseStyles}
`;

export class ComponentIcon extends Component<ComponentIconProps> {
  render() {
    const { icon, className, ariaLabel, ...passProps } = this.props;
    if (icon !== undefined) {
      return (
        <StyledSuomifiComponentIcon
          {...passProps}
          ariaLabel={ariaLabel}
          className={className}
          icon={icon}
        />
      );
    }

    iconLogger(ariaLabel, className);

    return;
  }
}
