## [`arc-plugin-functions`](https://www.npmjs.com/package/arc-plugin-functions)

> Simplifies the creation of event-less custom Lambda functions in Architect

An event-less Lambda function is a Lambda function that is deployable standalone
without any of Architect's typical scaffolding (e.g. connected to API Gateway or
an SNS queue).

## Install

Into your existing Architect project:

```sh
npm i arc-plugin-functions --save-dev
```

Add the following to your Architect project manifest (usually `app.arc`):

```arc
@plugins
arc-plugin-functions
```

## Configuration

Add one or more function declarations under the `@functions` pragma:

```arc
@functions
my-eventless-function
```

This will assume the path to your function handler be `src/functions/my-eventless-function`.

You can also configure a custom alternative path to your handler code as follows:

```arc
@functions
another-fn
  src foo/bar/baz
```
