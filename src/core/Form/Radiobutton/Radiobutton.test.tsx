import React from 'react';
import { render } from '@testing-library/react';
import { Radiobutton } from './Radiobutton';

describe('disabled', () => {
  it('has "--disabled"-class', () => {
    const { container } = render(
      <Radiobutton disabled={true}>Option 1</Radiobutton>,
    );
    expect(container.firstChild).toHaveClass('fi-radiobutton--disabled');
  });
  it('will add "disabled"-attribute for input', () => {
    const { getByRole } = render(
      <Radiobutton disabled={true}>Option 1</Radiobutton>,
    );
    expect(getByRole('radio')).toHaveAttribute('disabled');
  });
});

describe('className', () => {
  it('has the given custom className', () => {
    const { container } = render(
      <Radiobutton className="custom-className">Option 1</Radiobutton>,
    );
    expect(container.firstChild).toHaveClass('custom-className');
  });
});

describe('name', () => {
  it('has the given "name"-attribute', () => {
    const { getByRole } = render(
      <Radiobutton name="group-name">Option 1</Radiobutton>,
    );
    expect(getByRole('radio')).toHaveAttribute('name', 'group-name');
  });
});

describe('value', () => {
  it('has the given "value"-attribute', () => {
    const { getByRole } = render(
      <Radiobutton value="option-value-1">Option 1</Radiobutton>,
    );
    expect(getByRole('radio')).toHaveAttribute('value', 'option-value-1');
  });
});

describe('hintText', () => {
  it('has element for hintText when prop is given', () => {
    const { getByText } = render(
      <Radiobutton hintText="Example hint text">Option 1</Radiobutton>,
    );
    const hintText = getByText('Example hint text');
    expect(hintText.textContent).toBe('Example hint text');
    expect(hintText).toHaveClass('fi-radiobutton_hintText');
  });
});
