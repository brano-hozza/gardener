import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { GardenField, Plant } from '../../types';

@Component({
  tag: 'gardener-garden',
})
export class GardenerGarden {
  @Event({ eventName: 'reload' }) onReload: EventEmitter;
  @Event({ eventName: 'selectField' }) onSelect: EventEmitter<number>;

  @Prop() size: number;
  @Prop() fields: GardenField[];
  @Prop() plants: Plant[];

  generateFields(row: number) {
    const fields = [];
    for (let col = 0; col < this.size; col++) {
      const idx = row * this.size + col;
      fields.push(<gardener-field plants={this.plants} onSelectField={() => this.onSelect.emit(idx)} field={this.fields[idx] ?? null}></gardener-field>);
    }
    return fields;
  }

  generateGarden() {
    const garden = [];
    for (let row = 0; row < this.size; row++) {
      garden.push(<div class="flex w-full justify-evenly gap-4">{this.generateFields(row)}</div>);
    }
    return garden;
  }

  render() {
    return <div class="flex border-orange-900 border-4 rounded flex-col my-4 w-full gap-4 justify-evenly bg-green-800 p-4">{this.generateGarden()}</div>;
  }
}
