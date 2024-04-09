import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import { Garden, GardenField, Plant } from '../../types';

@Component({
  tag: 'gardener-field-editor',
})
export class GardenerFieldEditor {
  /**
   * Event emitted when the field is saved
   */
  @Event({ eventName: 'save' }) onSave: EventEmitter<GardenField>;

  /**
   * Event emitted when the field is cleared
   */
  @Event({ eventName: 'clearField' }) onClearField: EventEmitter;

  /**
   * The field id
   */
  @Prop() fieldId: number;

  /**
   * The garden
   */
  @Prop() garden: Garden;

  /**
   * The list of plants
   */
  @Prop() plants: Plant[];

  @State() plantId: string = '';
  @State() note: string = '';
  @State() field: GardenField;

  componentWillLoad() {
    this.field = this.garden.fields[this.fieldId];
    if (this.field !== null) {
      this.plantId = this.field.plant;
      this.note = this.field.note;
    }
  }

  @Watch('fieldId')
  async onFieldChanged(value: number) {
    this.field = this.garden.fields[value];
    if (this.field !== null) {
      this.plantId = this.field.plant;
      this.note = this.field.note;
    } else {
      this.plantId = '';
      this.note = '';
    }
  }

  /**
   * Save the field
   */
  private saveField() {
    this.onSave.emit({ plant: this.plantId, note: this.note });
  }

  /**
   * Clear the field
   */
  private clearField() {
    this.onClearField.emit();
  }

  /**
   * Check if the save button should be disabled
   * @returns  True if the save button should be disabled
   */
  private isSaveDisabled() {
    return this.plantId === ''
  }

  /**
   * Select a plant
   * @param event The input event
   */
  private selectPlant(event: InputEvent) {
    this.plantId = (event.target as HTMLSelectElement).value;
  }

  /**
   * Update the note text
   * @param event The input event
   */
  private updateNoteText(event: InputEvent) {
    this.note = (event.target as HTMLTextAreaElement).value;
  }


  render() {
    return (
      <div class="rounded border-2 bg-orange-900 border-black p-4 flex flex-col justify-center items-center gap-4">
        <h1 class="text-4xl text-white">Field Editor</h1>
        <select class="w-1/2 p-2 rounded-md" onInput={(e) => this.selectPlant(e)}>
          <option value="">Select a plant</option>
          {this.plants.map(p => (
            <option selected={p.id === this.plantId} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <textarea class="w-1/2 p-2 rounded-md" placeholder="Note" value={this.note} onInput={e => this.updateNoteText(e)}></textarea>
        <button class={'w-1/2 p-2 rounded-md  text-white ' + (this.isSaveDisabled() ? 'bg-gray-200 cursor-not-allowed' : 'bg-green-500')} onClick={() => this.saveField()}>
          Save
        </button>
        {this.field?.plant && (
          <button class="w-1/2 p-2 rounded-md bg-red-500 text-white" onClick={() => this.clearField()}>
            Clear
          </button>
        )}
      </div>
    );
  }
}
