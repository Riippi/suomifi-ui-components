import React, { Component, ReactNode, ReactElement } from 'react';
import classnames from 'classnames';
import { HtmlLabel, HtmlLabelProps, HtmlSpan } from '../../reset';
import { Paragraph, ParagraphProps } from '../Paragraph/Paragraph';
import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuPopoverProps,
  MenuItems,
  MenuItem,
  MenuItemProps,
  MenuPopover,
} from '@reach/menu-button';
import { positionMatchWidth } from '@reach/popover';
import { logger } from '../../utils/logger';
import { idGenerator } from '../../utils/uuid';
export { MenuItem as DropdownItem };

const baseClassName = 'fi-dropdown';

export const dropdownClassNames = {
  baseClassName,
  label: `${baseClassName}_label`,
  button: `${baseClassName}_button`,
  popover: `${baseClassName}_popover`,
  item: `${baseClassName}_item`,
};

export interface DropdownLabelProps extends HtmlLabelProps {}

export interface DropdownItemProps {
  /** Operation to run on select */
  onSelect: () => void;
  /** Item content */
  children: ReactNode;
}

type DropdownPopoverItems = DropdownItemProps;

interface DropdownState {
  selectedName: ReactNode;
}

type OptionalMenuButtonProps = {
  [K in keyof MenuButtonProps]?: MenuButtonProps[K];
};
type OptionalMenuPopoverProps = {
  [K in keyof MenuPopoverProps]?: MenuPopoverProps[K];
};
type OptionalMenuItemProps = { [K in keyof MenuItemProps]?: MenuItemProps[K] };

export interface DropdownProps {
  /** id */
  id?: string;
  /** Label */
  labelText: string;
  /** Custom props for label container */
  labelProps?: DropdownLabelProps;
  /** Custom props for Label text element */
  labelTextProps?: ParagraphProps;
  /**
   * Additional label id. E.g. form group label.
   * Used in addition to labelText for screen readers.
   */
  'aria-labelledby'?: string;
  /** visual hint to show if nothing is selected */
  visualPlaceholder?: ReactNode;
  /** Change visualPlaceholder by selection
   * @default true
   */
  changeVisualPlaceholderToSelection?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Properties given to dropdown's Button-component, className etc. */
  dropdownButtonProps?: OptionalMenuButtonProps;
  /** Properties given to dropdown's popover-component, className etc. */
  dropdownPopoverProps?: OptionalMenuPopoverProps;
  menuPopoverComponent?: React.ComponentType<OptionalMenuPopoverProps>;
  /** Properties given to dropdown's item-component, className etc. */
  dropdownItemProps?: OptionalMenuItemProps;
  /** DropdownItems */
  children?:
    | Array<ReactElement<DropdownPopoverItems>>
    | ReactElement<DropdownPopoverItems>;
}

export class Dropdown extends Component<DropdownProps> {
  state: DropdownState = { selectedName: undefined };

  changeName = (name: ReactNode) => this.setState({ selectedName: name });

  dropDownItems = (
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
      id: propId,
      children,
      labelProps,
      labelText,
      labelTextProps,
      'aria-labelledby': ariaLabelledBy,
      visualPlaceholder: name,
      className,
      dropdownButtonProps = {},
      dropdownPopoverProps = {},
      menuPopoverComponent: MenuPopoverComponentReplace,
      dropdownItemProps = {},
      changeVisualPlaceholderToSelection: changeNameToSelection = true,
      ...passProps
    } = this.props;

    if (React.Children.count(children) < 1) {
      logger.warn(`Dropdown '${name}' does not contain items`);
      return null;
    }

    const id = idGenerator(propId);

    const { selectedName } = this.state;
    const passDropdownButtonProps = {
      ...dropdownButtonProps,
      className: classnames(
        dropdownClassNames.button,
        dropdownButtonProps.className,
      ),
      'aria-labelledby': `${!!ariaLabelledBy ? `${ariaLabelledBy} ` : ''}${id}`,
    };
    const passDropdownPopoverProps = {
      ...dropdownPopoverProps,
      className: classnames(
        dropdownClassNames.popover,
        dropdownPopoverProps.className,
      ),
    };
    const passDropdownItemProps = {
      ...dropdownItemProps,
      className: classnames(
        dropdownClassNames.item,
        dropdownItemProps.className,
      ),
    };

    return (
      <HtmlSpan className={classnames(className, baseClassName)}>
        <HtmlLabel id={id} {...labelProps} className={dropdownClassNames.label}>
          <Paragraph {...labelTextProps}>{labelText}</Paragraph>
        </HtmlLabel>
        <Menu {...passProps}>
          <MenuButton {...passDropdownButtonProps}>
            {!!selectedName ? selectedName : name}
          </MenuButton>
          {!!MenuPopoverComponentReplace ? (
            <MenuPopoverComponentReplace {...passDropdownPopoverProps}>
              {this.dropDownItems(
                children,
                changeNameToSelection,
                passDropdownItemProps,
              )}
            </MenuPopoverComponentReplace>
          ) : (
            <MenuPopover
              position={positionMatchWidth}
              {...passDropdownPopoverProps}
            >
              <MenuItems>
                {this.dropDownItems(
                  children,
                  changeNameToSelection,
                  passDropdownItemProps,
                )}
              </MenuItems>
            </MenuPopover>
          )}
        </Menu>
      </HtmlSpan>
    );
  }
}
