import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';
import { Omit, asPropType } from '../../utils/typescript';

export interface HtmlSpanProps
  extends Omit<HTMLProps<HTMLSpanElement>, 'ref' | 'as'> {
  as?: asPropType;
}

const spanResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: inline;
  max-width: 100%;
  word-wrap: normal;
  word-break: normal;
  white-space: normal;
`;

const Span = (props: HtmlSpanProps) => <span {...props} />;

export const HtmlSpan = styled(Span)`
  ${spanResets}
`;
