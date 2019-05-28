import React, { ReactNode, HTMLProps } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets } from '../utils';
import { allStates } from '../../utils/css/pseudo';
import { Omit } from '../../utils/typescript';

export interface HtmlAProps extends Omit<HTMLProps<HTMLAnchorElement>, 'ref'> {
  children: ReactNode;
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
