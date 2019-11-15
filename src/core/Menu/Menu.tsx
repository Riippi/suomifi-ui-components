import React, { Component, ReactNode, Fragment } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { classnamesValue } from '../../utils/typescript';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import { baseStyles, menuListStyles } from './Menu.baseStyles';
import {
  Menu as CompMenu,
  MenuProps as CompMenuProps,
  MenuListItemsProps,
  MenuList as CompMenuList,
  MenuListProps as CompMenuListProps,
} from '../../components/Menu/Menu';
import {
  MenuItemLanguage,
  MenuItemLanguageProps,
  MenuLinkLanguage,
  MenuLinkLanguageProps,
} from './MenuItem';

import { Icon } from '../Icon/Icon';

const itemClassName = 'fi-menu_item';
const itemLangClassName = 'fi-menu-language_item';
const buttonClassName = 'fi-menu_button';
const buttonLangClassName = 'fi-menu-language_button';
const listClassName = 'fi-menu_list';
const listLangClassName = 'fi-menu-language_list';
const iconLangClassName = 'fi-menu-language_icon';

type ButtonVariant = 'default' | 'language';

export interface MenuProps extends CompMenuProps, TokensProp {
  /**
   * 'default' | 'language'
   * @default default
   */
  variant?: ButtonVariant;
}

const StyledMenu = styled(
  ({ tokens, ...passProps }: MenuProps & InternalTokensProp) => (
    <CompMenu {...passProps} />
  ),
)`
  ${props => baseStyles(props)}
`;

const MenuListWithProps = (children: ReactNode, addClass?: classnamesValue) =>
  React.Children.map(
    children,
    (child: React.ReactElement<MenuListItemsProps>) => {
      // Set defaul component-prop/type to be 'a' needed for links
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          component: 'a',
          className: classnames(itemClassName, addClass),
        });
      }
      return child;
    },
  );

const languageName = (name: ReactNode) => (
  <Fragment>
    {name}
    <Icon icon="chevronDown" className={iconLangClassName} />
  </Fragment>
);

interface MenuListProps extends CompMenuListProps, TokensProp {}

const StyledMenuList = styled(({ tokens, ...passProps }: MenuListProps) => (
  <CompMenuList {...passProps} />
))`
  ${props => menuListStyles(props.theme)}
`;

class MenuVariation extends Component<MenuProps> {
  render() {
    const {
      children,
      variant,
      name,
      className,
      menuListComponent: MenuListComponentProp,
      ...passProps
    } = withSuomifiDefaultProps(this.props);
    const ifMenuLanguage = variant === 'language';
    const menuButtonClassName = classnames(
      buttonClassName,
      {
        [buttonLangClassName]: ifMenuLanguage,
      },
      className,
    );
    const menuListProps = {
      className: classnames(listClassName, {
        [listLangClassName]: ifMenuLanguage,
      }),
    };

    return (
      <Fragment>
        <StyledMenu
          {...passProps}
          name={!!ifMenuLanguage ? languageName(name) : name}
          menuButtonClassName={menuButtonClassName}
          menuListProps={menuListProps}
          menuListComponent={
            !!MenuListComponentProp ? MenuListComponentProp : StyledMenuList
          }
        >
          {MenuListWithProps(children, {
            [itemLangClassName]: ifMenuLanguage,
          })}
        </StyledMenu>
      </Fragment>
    );
  }
}

/**
 * <i class="semantics" />
 * Use for dropdown menu.
 */
export class Menu extends Component<MenuProps> {
  static language = (props: MenuProps) => {
    return <MenuVariation {...props} variant="language" />;
  };

  static languageItem = (props: MenuItemLanguageProps) => {
    return <MenuItemLanguage {...props} />;
  };

  static LinkLanguage = (props: MenuLinkLanguageProps) => {
    return <MenuLinkLanguage {...props} />;
  };

  render() {
    return <MenuVariation {...this.props} />;
  }
}
