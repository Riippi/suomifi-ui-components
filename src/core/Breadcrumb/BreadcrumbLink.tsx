import React, { Fragment } from 'react';
import { TokensProp } from '../theme';
import { withSuomifiDefaultProps, colorValue } from '../theme/utils';
import { baseClassName } from '../../components/Breadcrumb/Breadcrumb';
import { Link, LinkProps } from '../Link/Link';
import { Icon } from '../Icon/Icon';
import { HtmlSpan } from '../../reset';
import classnames from 'classnames';
import { Omit } from '../../utils/typescript';

const linkClassName = `${baseClassName}_link`;
const iconClassName = `${baseClassName}_icon`;

export interface BreadcrumbLinkProps
  extends Omit<LinkProps, 'href'>,
    TokensProp {
  /** Indicating the link is the current page */
  current?: boolean;
  /** url for the link */
  href?: string;
}

export const BreadcrumbLink = ({
  current,
  children,
  className,
  href = '',
  ...origPassProps
}: BreadcrumbLinkProps) => {
  if (!!current)
    return (
      <HtmlSpan className={className} aria-current="location">
        {children}
      </HtmlSpan>
    );
  const passProps = withSuomifiDefaultProps(origPassProps);
  return (
    <Fragment>
      <Link
        {...passProps}
        className={classnames(linkClassName, className)}
        href={href}
      >
        {children}
      </Link>
      <Icon
        icon="linkBreadcrumb"
        className={iconClassName}
        color={colorValue(passProps)('blackBase')}
      />
    </Fragment>
  );
};
