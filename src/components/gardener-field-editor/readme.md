# gardener-field-editor



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description | Type      | Default     |
| --------- | ---------- | ----------- | --------- | ----------- |
| `fieldId` | `field-id` |             | `number`  | `undefined` |
| `garden`  | --         |             | `Garden`  | `undefined` |
| `plants`  | --         |             | `Plant[]` | `undefined` |


## Events

| Event        | Description | Type                       |
| ------------ | ----------- | -------------------------- |
| `clearField` |             | `CustomEvent<any>`         |
| `save`       |             | `CustomEvent<GardenField>` |


## Dependencies

### Used by

 - [gardener-app](../gardener-app)

### Graph
```mermaid
graph TD;
  gardener-app --> gardener-field-editor
  style gardener-field-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
