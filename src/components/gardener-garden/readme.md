# gardener-garden



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type            | Default     |
| -------- | --------- | ----------- | --------------- | ----------- |
| `fields` | --        |             | `GardenField[]` | `undefined` |
| `plants` | --        |             | `Plant[]`       | `undefined` |
| `size`   | `size`    |             | `number`        | `undefined` |


## Events

| Event         | Description | Type                  |
| ------------- | ----------- | --------------------- |
| `reload`      |             | `CustomEvent<any>`    |
| `selectField` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [gardener-app](../gardener-app)

### Depends on

- [gardener-field](../gardener-field)

### Graph
```mermaid
graph TD;
  gardener-garden --> gardener-field
  gardener-app --> gardener-garden
  style gardener-garden fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
