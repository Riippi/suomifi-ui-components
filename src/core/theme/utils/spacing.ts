import { FlattenSimpleInterpolation } from 'styled-components';
import {
  SpacingProp,
  spacingTokensKeys,
  SpacingDesignTokens,
} from '../spacing';
import { cssValueToString } from '../../../utils/css';

export const spacingUtils = (spacing: SpacingDesignTokens) =>
  Object.entries(spacing).reduce(
    (retObj, [key, value]) => ({
      ...retObj,
      [key]: cssValueToString(value),
    }),
    {} as { [key in keyof SpacingDesignTokens]: FlattenSimpleInterpolation },
  );

// TODO make this whole util again to work with suomifiTheme-util

import { SuomifiThemeProp, SuomifiTheme } from '../';

export type SpaceProp = SpacingProp | '0';

const spaceVal = (theme: SuomifiTheme) => (val?: SpaceProp) => {
  if (val === '0') return '0';
  return !!val ? theme.spacing[val] : '';
};

/**
 * Spacing type
 * @typedef {String} spacingType
 * @param {String} type 'padding' or 'margin'
 */
/**
 * Spacing tokens
 * @typedef {String} spacingTokens
 * @param {String} t token for top, or top and bottom, or all
 * @param {String} r token for right, or right and left
 * @param {String} b token for bottom
 * @param {String} l token for left
 */
/**
 * Set margin or padding pased on tokens
 * @param {Object} theme suomifiTheme
 * @return {(spacingType) => (spacingTokens) => String}
 */
const space = (theme: SuomifiTheme) => (type: 'padding' | 'margin') => (
  t?: SpaceProp,
  r?: SpaceProp,
  b?: SpaceProp,
  l?: SpaceProp,
) =>
  !!t
    ? `${!!t ? `${type}-top: ${spaceVal(theme)(t)};` : ''}
    ${!!r ? `${type}-right: ${spaceVal(theme)(r)};` : ''}
    ${!!b ? `${type}-bottom: ${spaceVal(theme)(b)};` : ''}
    ${!!l ? `${type}-left:${spaceVal(theme)(l)};` : ''}`
    : '';

/**
 * Set margin based on theme
 * @param {Object} theme
 */
export const margin = (props: SuomifiThemeProp) => space(props.theme)('margin');
/**
 * Set padding based on theme
 * @param {Object} theme
 */
export const padding = (props: SuomifiThemeProp) =>
  space(props.theme)('padding');

/**
 * Create spacing styles for CSS-selector (-xxs, -xs, -s...)
 * TODO: this should be in suomifiTheme? or integrated somehow with that
 * @param {Object} tokens Design tokens
 * @return {(spacingType) => (selector: String) => String}
 */
export const spacingModifiers = (props: SuomifiThemeProp) => (
  spacing: 'padding' | 'margin',
) => (selector: string) =>
  spacingTokensKeys.reduce(
    (ret, k) =>
      `${ret}${selector}-${k}{
        ${spacing}: ${spaceVal(props.theme)(k)}
  } `,
    '',
  );
