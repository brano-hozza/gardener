import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { GardenField, Plant } from '../../types';

@Component({
  tag: 'gardener-field',
})
export class GardenerField {
  @Event({ eventName: 'selectField' }) onSelect: EventEmitter;

  @Prop() field: GardenField | null;
  @Prop() plants: Plant[];

  getPlant(id: string): Plant | null {
    return this.plants.find(p => p.id === id) ?? null;
  }

  render() {
    return (
      <div class="relative rounded min-w-36 min-h-36 border-2 bg-orange-900 border-black p-4 flex flex-col gap-1 justify-center items-center">
        <p class="text-white"> {this.field ? this.getPlant(this.field.plant)?.name : 'No plant'}</p>
        <i class="text-xs text-center text-white">{this.field?.note ?? '_'}</i>
        <button class="w-full p-2 rounded-md bg-green-500 text-white" onClick={() => this.onSelect.emit()}>
          Edit
        </button>
      </div>
    );
  }
}
