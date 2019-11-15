# ⌨️ Development

After cloning suomifi-ui-components, run `yarn` to fetch its dependencies. Then, you can run several commands:

1. `yarn start` runs Styleguidist for displaying components stories.

2. `yarn test` runs written tests.

3. `yarn test:lint` checks TypeScript code for readability, maintainability, and functionality errors.

4. `yarn prettier:check` checks the code style.

5. `yarn prettier` write the code style fixes to all src-files.

6. `yarn validate` runs the complete test suite.

7. `yarn build` compiles TypeScript code to the dist directory.

8. `yarn styleguide:build` compiles static version of Styleguide to the styleguide directory.

9. `yarn bundle-analyzer` shows analyzation of bundle size.

## Source

[![suomifi-ui-components architecture diagram](suomifi-ui-components.png 'suomifi-ui-components architecture')](suomifi-ui-components.png)

Source contains 3 stages of components:

1. `reset` is for resetting html tags (don't do too opinionated stuff here).
2. `components` are accessible/a11y version of components and HTML-semantics without Suomi.fi related.
3. `core` contains Suomi.fi-styleguide as theme, components and CSS exports.

- _Export `src/core`-components at `src/core/index` and `src/index`._
- Export `src/components`-components at `src/components/index`.

**Don't do relative imports from `src/index`, use those 3-levels export locations.**

**Do not create duplication of source or styles for component, use syntax that can be used in exports.**

Export interfaces for exported functions/components. Typescript will generate declaration files from exported interfaces (.d.ts). Write comments/documentatiion to all properties that need to be shown at styleguide.

### Props that are passed on to another component

```jsx
// put rest of the props to passProps, but takeAwayProp and takeAanother
const { takeAwayProp, takeAanother: renamedAsProp, ...passprops } = withSuomifiDefaults(this.props);
const customProps = {
  takeAwayProp: !!takeAwayProp ? takeAwayProp : renamedAsProp,
  basedOnCondition: passProps.notTakenAwayProp ? 'one' : 'two',¨
};
return <Component {...passProps, customProps} />;

// Or something like
return <Component {...passProps}>
  <AnotherComponent wantProp={takeAwayProp} />
</Component>;
```

### `Styled components`-usage at `src/core`

```jsx
const StyledButton = styled(
  ({
    tokens,
    className,
    ...passProps
  }: ButtonProps & InternalTokensProp) => (
    <CompButton
      {...passProps}
      className={classnames(className, {
        [`${baseClassName}--${variant}`]: variant !== 'default'
      })}
    />
  )
)`
  ${props => baseStyles(props)}
`;
```

Syntax is based on:

```jsx
styled(Component)`
  color: black;
`;
```

Then with arrow-function to:

```jsx
styled(props => <Component {...props} />)`
  ${props => baseStyles(props)}
`;
```

## Styling

`src/components` will provide 'fi-' -prefixed classNames to all components - and then at `src/core` styling is based on those base classNames.

Use BEM naming convention with `fi-`-prefix:

```css
.fi-block
.fi-block--modifier
.fi-block_element
.fi-block_element--modifier
```

and/or atom-classes:

```css
.fi-block.fi-rounded
.fi-block_element.fi-highlight
```

- All colors, typography and spacing must come from tokens (suomifi-design-tokens) and all tokens not defined in suomifi-design-tokens must be defined at internal tokens
- Don't use relative units without an important reason
- Comment CSS when doing project specific solutions
- All opinionated resets to **theme**

Components' styles can be customized with [Styled Components](https://github.com/styled-components/styled-components) / [Emotion](https://github.com/emotion-js/emotion):

```javascript
styled(Button)...
```

and with CSS-ClassName:

```javascript
<Button className="button--custom">Example</Button>
```

```css
.fi-button.button--custom {
  ...;
}
```

Don't use ~~!important~~, if really needed - for specificity hack you can use `.fi-button.button--custom.button--custom {...}`

- TBD: CSS-exports (tested to be working , not implemented for all components)

## Git

Pull requests can be submitted from fork. [Read more from here.](https://guides.github.com/activities/forking/)

### Developing a feature:

```bash
git checkout -b <branchname>
git add <file1> <file2> ...
git commit -m "My commit message"
```

### Pushing your feature to Github:

```bash
git checkout develop
git pull
git checkout <branchname>
git rebase -i develop
```

- Resolve conflicts and continue:

```bash
git add <file1> <file2> ...
git rebase --continue
```

- After no conflicts:

```bash
git push --force-with-lease
```

(If your remote does not accept your local new branch: `git push -u origin HEAD`)

- Make a Pull Request at Github website.
