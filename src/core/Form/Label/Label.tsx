import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { baseStyles } from './Label.baseStyles';
import { asPropType } from '../../../utils/typescript';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { HtmlSpan, HtmlSpanProps, HtmlDiv, HtmlDivProps } from '../../../reset';

export type LabelMode = 'hidden' | 'visible';

export interface LabelProps extends Omit<HtmlDivProps, 'as'> {
  /** id */
  id?: string;
  /** Label element content */
  children: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Label span props */
  labelSpanProps?: HtmlSpanProps;
  /** Render the wrapping element as another element
   *
   * @default 'label'
   */
  asProp?: asPropType;
  /** Text to mark the field as optional. Shown after labelText and wrapped in parentheses. */
  optionalText?: string;
}

const baseClassName = 'fi-label-text';
const labelTextClassNames = {
  labelSpan: `${baseClassName}_label-span`,
  optionalText: `${baseClassName}_optionalText`,
};

const StyledLabel = styled(
  ({
    className,
    theme,
    labelMode = 'visible',
    labelSpanProps = { className: undefined },
    children,
    asProp = 'label',
    optionalText,
    ...passProps
  }: LabelProps & SuomifiThemeProp) => (
    <HtmlDiv
      {...(asProp ? { as: asProp } : {})}
      className={classnames(className, baseClassName)}
      {...passProps}
    >
      {labelMode === 'hidden' ? (
        <VisuallyHidden>
          {children}
          {optionalText && `(${optionalText})`}
        </VisuallyHidden>
      ) : (
        <HtmlSpan
          {...labelSpanProps}
          className={classnames(
            labelTextClassNames.labelSpan,
            labelSpanProps.className,
          )}
        >
          {children}
          {optionalText && (
            <HtmlSpan className={labelTextClassNames.optionalText}>
              {` (${optionalText})`}
            </HtmlSpan>
          )}
        </HtmlSpan>
      )}
    </HtmlDiv>
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

export class Label extends Component<LabelProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledLabel theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
