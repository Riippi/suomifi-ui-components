import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { Icon } from '../../Icon/Icon';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { ExternalLinkStyles } from './ExternalLink.baseStyles';
import { HtmlA } from '../../../reset';
import { BaseLinkProps, baseClassName } from '../BaseLink/BaseLink';

const iconClassName = 'fi-link_icon';
const externalClassName = 'fi-link--external';

type newWindowProps =
  | {
      toNewWindow: false;
      labelNewWindow?: never;
    }
  | {
      toNewWindow?: true;
      labelNewWindow: string;
    };

interface InternalExternalLinkProps extends BaseLinkProps {
  /** Hide the icon */
  hideIcon?: boolean;
  /** Open to a new window */
  toNewWindow?: boolean;
  /** Translated explanation of 'opens to a new window' */
  labelNewWindow?: string;
}

export type ExternalLinkProps = newWindowProps & InternalExternalLinkProps;

class BaseExternalLink extends Component<ExternalLinkProps> {
  render() {
    const {
      asProp,
      children,
      className,
      toNewWindow = true,
      labelNewWindow,
      hideIcon,
      ...passProps
    } = this.props;
    return (
      <HtmlA
        {...passProps}
        className={classnames(baseClassName, className, externalClassName)}
        target={!!toNewWindow ? '_blank' : undefined}
        rel={!!toNewWindow ? 'noopener' : undefined}
        as={asProp}
      >
        {children}
        {toNewWindow && <VisuallyHidden>{labelNewWindow}</VisuallyHidden>}
        {!hideIcon && (
          <Icon
            icon="linkExternal"
            className={iconClassName}
            color="currentColor"
          />
        )}
      </HtmlA>
    );
  }
}

const StyledExternalLink = styled(
  (props: ExternalLinkProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseExternalLink {...passProps} />;
  },
)`
  ${({ theme }) => ExternalLinkStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Used for adding a external site link
 */
export class ExternalLink extends Component<ExternalLinkProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledExternalLink theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
