# gardener-app



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type      | Default |
| -------- | --------- | ----------- | --------- | ------- |
| `mock`   | `mock`    |             | `boolean` | `false` |


## Dependencies

### Depends on

- [gardener-garden](../gardener-garden)
- [gardener-plant-editor](../gardener-plant-editor)
- [gardener-field-editor](../gardener-field-editor)

### Graph
```mermaid
graph TD;
  gardener-app --> gardener-garden
  gardener-app --> gardener-plant-editor
  gardener-app --> gardener-field-editor
  gardener-garden --> gardener-field
  style gardener-app fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
