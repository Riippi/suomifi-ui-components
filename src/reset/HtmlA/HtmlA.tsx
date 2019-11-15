import React, { ReactNode, HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';
import { allStates } from '../../utils/css';
import { Omit, asPropType } from '../../utils/typescript';

export interface HtmlAProps
  extends Omit<HTMLProps<HTMLAnchorElement>, 'ref' | 'as'> {
  children: ReactNode;
  as?: asPropType;
}

const aResets = css`
  ${resets.normalize.html}
  ${resets.normalize.a}
  ${resets.common}
  ${allStates('color: inherit; text-decoration: underline; cursor: pointer;')}
  display: inline;
  text-decoration: underline;
`;

const Ahref = styled.a`
  ${aResets}
`;

export const HtmlA = (props: HtmlAProps) => <Ahref {...props} />;
