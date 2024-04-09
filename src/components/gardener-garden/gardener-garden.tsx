import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { GardenField, Plant } from '../../types';
import { GardenerField } from '../gardener-field/gardener-field';

@Component({
  tag: 'gardener-garden',
})
export class GardenerGarden {
  /**
   * Event emitted when the garden is reloaded
   */
  @Event({ eventName: 'reload' }) onReload: EventEmitter;

  /**
   * Event emitted when a field is selected
   */
  @Event({ eventName: 'selectField' }) onSelect: EventEmitter<number>;

  /**
   * The garden size
   */
  @Prop() size: number;

  /**
   * The garden fields
   */
  @Prop() fields: GardenField[];

  /**
   * The list of plants
   */
  @Prop() plants: Plant[];


  /**
   * Select the field
   * @param idx The field index
   */
  private selectField(idx: number) {
    this.onSelect.emit(idx);
  }


  /**
   * Generate the fields for the given row
   * @param row The row index
   * @returns  The fields
   */
  private generateFields(row: number): GardenerField[] {
    const fields: GardenerField[] = [];
    for (let col = 0; col < this.size; col++) {
      const idx = row * this.size + col;
      fields.push(<gardener-field plants={this.plants} onSelectField={() => this.selectField(idx)} field={this.fields[idx] ?? null}></gardener-field>);
    }
    return fields;
  }

  /**
   * Generate the garden
   * @returns The garden
   */
  private generateGarden(): HTMLElement[] {
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
