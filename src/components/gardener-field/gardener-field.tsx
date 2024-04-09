import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { GardenField, Plant } from '../../types';

@Component({
  tag: 'gardener-field',
})
export class GardenerField {
  /**
   * Event emitted when the field is selected
   */
  @Event({ eventName: 'selectField' }) onSelect: EventEmitter;

  /**
   * The field to display
   */
  @Prop() field: GardenField | null;

  /**
   * The list of plants
   */
  @Prop() plants: Plant[];

  /**
   * Get the plant for the given id
   * @param id The plant id
   * @returns The plant or null if not found
   */
  private getPlant(id: string): Plant | null {
    return this.plants.find(p => p.id === id) ?? null;
  }

  /**
   * Select the field
   */
  private selectField() {
    this.onSelect.emit();
  }

  render() {
    return (
      <div class="relative rounded min-w-36 min-h-36 border-2 bg-orange-900 border-black p-4 flex flex-col gap-1 justify-center items-center">
        <p class="text-white"> {this.field !== null ? this.getPlant(this.field.plant)?.name : 'No plant'}</p>
        <i class="text-xs text-center text-white">{this.field?.note ?? '_'}</i>
        <button class="w-full p-2 rounded-md bg-green-500 text-white" onClick={() => this.selectField()}>
          Edit
        </button>
      </div>
    );
  }
}
