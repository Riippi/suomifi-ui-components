import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { defaultThemeTokens } from '../theme';
import classnames from 'classnames';
import {
  SuomifiStaticIcon,
  SuomifiStaticIconInterface,
  SuomifiComponentIconInterface,
  SuomifiComponentIcon,
} from 'suomifi-icons';
import { ariaLabelOrHidden, ariaFocusableNoLabel } from '../../utils/aria';
import { iconBaseStyles } from '../Icon/Icon.baseStyles';
import {
  IconBaseProps,
  iconLogger,
  cursorPointerClassName,
  baseClassName,
} from '../Icon/Icon';
export { IllustrativeIconKeys, DoctypeIconKeys } from 'suomifi-icons';

const staticIconBaseClassName = `fi-static-icon`;

export interface StaticIconProps
  extends IconBaseProps,
    SuomifiStaticIconInterface {
  highlightColor?: string;
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
  ${iconBaseStyles}
`;

/**
 * Static icon-component
 */
export class StaticIcon extends Component<StaticIconProps> {
  render() {
    const {
      icon,
      highlightColor,
      className,
      mousePointer,
      ...passProps
    } = this.props;
    const { ariaLabel } = this.props;

    if (icon !== undefined) {
      return (
        <StyledSuomifiStaticIcon
          {...passProps}
          {...(!!highlightColor
            ? { highlightColor }
            : { highlightColor: defaultThemeTokens.colors.accentBase })}
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
  ${iconBaseStyles}
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
