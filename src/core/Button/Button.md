```js
import { Button } from 'suomifi-ui-components';

<>
  <Button
    className="my-button--test"
    onClick={() => console.log('Test button click')}
    type="submit"
  >
    Button
  </Button>

  <Button disabled fullWidth>
    Button disabled fullWidth
  </Button>
</>;
```

```js
import { Button } from 'suomifi-ui-components';

<>
  <Button icon="login" aria-label="Login">
    Button icon="login" aria-label="Login"
  </Button>

  <Button iconRight="login" aria-labelledby="button-label">
    <span id="button-label">Login</span> iconRight="login"
    aria-labelledby="button-label"
  </Button>
</>;
```

```js
import { Button } from 'suomifi-ui-components';

<>
  <div example="negative">
    <Button.negative>Button.negative</Button.negative>

    <Button.negative disabled fullWidth icon="login">
      Button.negative disabled fullWidth icon="login"
    </Button.negative>
  </div>
</>;
```

```js
import { Button } from 'suomifi-ui-components';

<>
  <Button.secondary>Button.secondary</Button.secondary>

  <Button.secondary icon="login">
    Button.secondary icon="login"
  </Button.secondary>

  <Button.secondary disabled fullWidth icon="login">
    Button.secondary disabled fullWidth icon="login"
  </Button.secondary>

  <Button.secondaryNoborder>
    Button.secondaryNoborder
  </Button.secondaryNoborder>

  <Button.secondaryNoborder icon="login">
    Button icon="login"
  </Button.secondaryNoborder>

  <Button.secondaryNoborder disabled icon="login">
    Button.secondaryNoborder disabled icon="login"
  </Button.secondaryNoborder>
</>;
```

```js
import { Button } from 'suomifi-ui-components';

<>
  <Button.tertiary>Button.tertiary</Button.tertiary>

  <Button.tertiary disabled icon="login">
    Button.tertiary disabled icon="login"
  </Button.tertiary>
</>;
```
