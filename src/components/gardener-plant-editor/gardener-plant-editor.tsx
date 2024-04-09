import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import { Plant } from '../../types';

@Component({
  tag: 'gardener-plant-editor',
})
export class GardenerPlantEditor {
  @Event({ eventName: 'save' }) onSave: EventEmitter<Plant>;

  @Prop() plants: Plant[] = [];
  @State() name: string = '';
  @State() description: string = '';
  @State() plantId: string = '';

  savePlant() {
    this.onSave.emit({ id: this.plantId, name: this.name, description: this.description });
    this.plantId = '';
  }

  isSaveDisabled() {
    return !this.name || !this.plantId;
  }

  @Watch('plantId')
  onPlantIdChange() {
    if (this.plantId === '@new' || !this.plantId) {
      this.name = '';
      this.description = '';
    } else {
      const plant = this.plants.find(p => p.id === this.plantId);
      if (plant) {
        this.name = plant.name;
        this.description = plant.description;
      }
    }
  }

  render() {
    return (
      <div class="w-full p-4 flex flex-col gap-2 items-center rounded bg-green-200 border-2 border-black">
        <h1 class="text-4xl">Plant Editor</h1>
        <select class=" w-1/2 p-2 rounded-md" onInput={e => (this.plantId = (e.target as HTMLSelectElement).value)}>
          <option value="">Select a plant</option>
          <option value="@new">New plant</option>
          {this.plants.map(p => (
            <option selected={p.id === this.plantId} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {this.plantId && (
          <div class="w-1/2 flex flex-col gap-2">
            <input type="text" class="p-2 rounded-md" placeholder="Name" value={this.name} onInput={e => (this.name = (e.target as HTMLInputElement).value)} />
            <textarea
              class="p-2 rounded-md"
              placeholder="Description"
              value={this.description}
              onInput={e => (this.description = (e.target as HTMLTextAreaElement).value)}
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
