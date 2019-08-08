import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../utils/test/axe';

import { Block } from './Block';

const TestBlock = (
  <div data-testid="test-block">
    <Block>Hey this is test</Block>
    <Block padding="xl">Hey this is test lead</Block>
    <Block.section>Hey this is test bold</Block.section>
  </div>
);

test('calling render with the same component on the same container does not remount', () => {
  const BlockRendered = render(TestBlock);
  const { container } = BlockRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestBlock));
