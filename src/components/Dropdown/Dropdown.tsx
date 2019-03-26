import React, { Component, ReactNode, ReactElement } from 'react';
import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuList,
  MenuListProps,
  MenuItem,
  MenuItemProps,
} from '@reach/menu-button';
import { logger } from '../../utils/logger';
import '@reach/menu-button/styles.css';

export { MenuItem as DropdownItem };

export interface DropdownItemProps {
  /** Operation to run on select */
  onSelect: () => void;
  /** Item content */
  children: ReactNode;
}

type DropdownListItems = DropdownItemProps;

interface DropdownState {
  selectedName: ReactNode;
}

type OptionalMenuButtonProps = {
  [K in keyof MenuButtonProps]?: MenuButtonProps[K]
};
type OptionalMenuListProps = { [K in keyof MenuListProps]?: MenuListProps[K] };
type OptionalMenuItemProps = { [K in keyof MenuItemProps]?: MenuItemProps[K] };

export interface DropdownProps {
  /** Name to show for the dropdown */
  name: ReactNode;
  /** Change name by selection
   * @default true
   */
  changeNameToSelection?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Properties given to dropdown's Button-component, className etc. */
  dropdownButtonProps?: OptionalMenuButtonProps;
  /** Properties given to dropdown's list-component, className etc. */
  dropdownListProps?: OptionalMenuListProps;
  /** Properties given to dropdown's item-component, className etc. */
  dropdownItemProps?: OptionalMenuItemProps;
  /** DropdownItems */
  children?:
    | Array<ReactElement<DropdownListItems>>
    | ReactElement<DropdownListItems>;
}

export class Dropdown extends Component<DropdownProps> {
  state: DropdownState = { selectedName: undefined };

  changeName = (name: ReactNode) => this.setState({ selectedName: name });

  list = (
    children: ReactNode,
    changeNameToSelection: boolean,
    dropdownItemProps?: OptionalMenuItemProps,
  ) =>
    React.Children.map(children, (child: React.ReactElement<MenuItemProps>) => {
      const { children: childChildren } = child.props;
      const isChildString =
        !!changeNameToSelection &&
        !!childChildren &&
        typeof childChildren === 'string';
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...dropdownItemProps,
          ...(!!isChildString && {
            onSelect: () => {
              child.props.onSelect();
              this.changeName.bind(this)(childChildren);
            },
          }),
        });
      }
      return child;
    });

  render() {
    const {
      children,
      name,
      className,
      dropdownButtonProps,
      dropdownListProps,
      dropdownItemProps,
      changeNameToSelection = true,
      ...passProps
    } = this.props;
    const { selectedName } = this.state;

    if (React.Children.count(children) < 1) {
      logger.warn(`Dropdown '${name}' does not contain items`);
      return null;
    }

    return (
      <span className={className}>
        <Menu {...passProps}>
          <MenuButton {...dropdownButtonProps}>
            {!!selectedName ? selectedName : name}
          </MenuButton>
          <MenuList {...dropdownListProps}>
            {this.list(children, changeNameToSelection, dropdownItemProps)}
          </MenuList>
        </Menu>
      </span>
    );
  }
}
