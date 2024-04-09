import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import { Plant } from '../../types';

@Component({
  tag: 'gardener-plant-editor',
})
export class GardenerPlantEditor {
  /**
   * Event emitted when the plant is saved
   */
  @Event({ eventName: 'save' }) onSave: EventEmitter<Plant>;

  /**
   * The list of plants
   */
  @Prop() plants: Plant[] = [];

  @State() name: string = '';
  @State() description: string = '';
  @State() plantId: string = '';

  /**
   * Save the plant
   */
  private savePlant() {
    this.onSave.emit({ id: this.plantId, name: this.name, description: this.description });
    this.plantId = '';
  }

  /**
   * Check if the save button is disabled
   * @returns True if the save button is disabled
   */
  private isSaveDisabled() {
    console.log(this.name, this.plantId)
    return this.name.length === 0 || this.plantId.length === 0;
  }

  @Watch('plantId')
  onPlantIdChange() {
    if (this.plantId === '@new' || this.plantId.length === 0) {
      this.name = '';
      this.description = '';
    } else {
      const plant = this.plants.find(p => p.id === this.plantId) ?? null;
      if (plant != null) {
        this.name = plant.name;
        this.description = plant.description;
      }
    }
  }

  /**
   * Update the plant
   * @param e The input event
   */
  private updatePlant(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.plantId = target.value;
  }

  /**
   * Update the name
   * @param e The input event
   */
  private updateName(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.name = target.value;
  }

  /**
   * Update the description
   * @param e The input event
   */
  private updateDescription(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.description = target.value;
  }

  render() {
    return (
      <div class="w-full p-4 flex flex-col gap-2 items-center rounded bg-green-200 border-2 border-black">
        <h1 class="text-4xl">Plant Editor</h1>
        <select class=" w-1/2 p-2 rounded-md" onInput={e => this.updatePlant(e)}>
          <option value="">Select a plant</option>
          <option value="@new">New plant</option>
          {this.plants.map(p => (
            <option selected={p.id === this.plantId} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {this.plantId.length > 0 && (
          <div class="w-1/2 flex flex-col gap-2">
            <input type="text" class="p-2 rounded-md" placeholder="Name" value={this.name} onInput={e => this.updateName(e)} />
            <textarea
              class="p-2 rounded-md"
              placeholder="Description"
              value={this.description}
              onInput={e => this.updateDescription(e)}
            ></textarea>
            <button class={'p-2 rounded-md  text-white ' + (this.isSaveDisabled() ? 'bg-gray-200 cursor-not-allowed' : 'bg-green-500')} onClick={() => this.savePlant()}>
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}
