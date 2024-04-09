import { Component, Prop, State, Watch, forceUpdate, h } from '@stencil/core';
import { StyledHost } from '../../helpers/styled-host';
import { GardenServiceFactory } from '../../services/garden.service';
import { Garden, GardenField, Plant } from '../../types';

@Component({
  tag: 'gardener-app',
  shadow: true,
})
export class GardenerApp {
  @Prop() mock: boolean = false;

  @State() garden: Garden;
  @State() plants: Plant[] = [];
  @State() selectedField: number = -1;

  private gardenService = GardenServiceFactory.create('http://localhost:3000', this.mock);

  @Watch('mock')
  async onMockChange() {
    document.location.reload();
  }

  async componentWillLoad() {
    this.garden = await this.gardenService.getGarden();
    this.plants = await this.gardenService.getPlants();
  }

  async reloadGarden() {
    this.garden = await this.gardenService.getGarden();
    forceUpdate(this);
  }

  async reloadPlants() {
    this.plants = await this.gardenService.getPlants();
    forceUpdate(this);
  }

  selectField(ev: CustomEvent<number>) {
    if (ev.detail === null) return;
    this.selectedField = ev.detail;
  }

  getField(id: number): GardenField | null {
    console.log(this.garden.fields, id);
    const field = this.garden.fields[id] ?? null;
    return field;
  }

  async savePlant(plant: Plant) {
    if (plant.id === '@new') {
      await this.gardenService.createPlant({
        name: plant.name,
        description: plant.description,
      });
    } else {
      await this.gardenService.updatePlant(plant.id, {
        name: plant.name,
        description: plant.description,
      });
    }
    await this.reloadPlants();
  }

  async saveField(field: GardenField) {
    if (this.selectedField === -1) return;
    await this.gardenService.updateField(this.selectedField, {
      plant: field.plant,
      note: field.note,
    });
    this.selectedField = -1;
    await this.reloadGarden();
  }

  async clearField() {
    if (this.selectedField === -1) return;
    await this.gardenService.clearField(this.selectedField);
    this.selectedField = -1;
    await this.reloadGarden();
  }

  render() {
    return (
      <StyledHost>
        <div class="w-full h-screen bg-green-100 p-4 flex flex-col items-center gap-2">
          <h1 class="text-4xl">🌷Gardener v0.1🌼</h1>
          <h2 class="text-xl">{this.garden.name}</h2>
          <gardener-garden
            class="w-full"
            plants={this.plants}
            onSelectField={e => this.selectField(e)}
            onReload={() => this.reloadGarden()}
            fields={this.garden.fields}
            size={this.garden.size}
          ></gardener-garden>
          <gardener-plant-editor class="w-full" plants={this.plants} onSave={ev => this.savePlant(ev.detail)}></gardener-plant-editor>
          {this.selectedField !== -1 && (
            <gardener-field-editor
              fieldId={this.selectedField}
              onClearField={() => this.clearField()}
              onSave={e => this.saveField(e.detail)}
              class="w-full"
              plants={this.plants}
              garden={this.garden}
            ></gardener-field-editor>
          )}
        </div>
      </StyledHost>
    );
  }
}
