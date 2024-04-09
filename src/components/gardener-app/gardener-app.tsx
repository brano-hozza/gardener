import { Component, Prop, State, Watch, forceUpdate, h } from '@stencil/core';
import { StyledHost } from '../../helpers/styled-host';
import { GardenServiceFactory } from '../../services/garden.service';
import { Garden, GardenField, Plant } from '../../types';

@Component({
  tag: 'gardener-app',
  shadow: true,
})
export class GardenerApp {
  /**
   * Whether to use the mock service
   */
  @Prop() mock: boolean = false;

  @State() garden: Garden | null = null;
  @State() plants: Plant[] = [];
  @State() selectedField: number = -1;
  @State() error: string;

  private gardenService = GardenServiceFactory.create('http://localhost:3000', this.mock);

  @Watch('mock')
  async onMockChange() {
    document.location.reload();
  }

  async componentWillLoad() {
    try {
      this.garden = await this.gardenService.getGarden();
      this.plants = await this.gardenService.getPlants();
    } catch (e) {
      this.error = `Failed to load garden: ${e.message}`
      console.error(e);
    }
  }

  /**
   * Reload the garden
   */
  private async reloadGarden() {
    try {
      this.garden = await this.gardenService.getGarden();
      forceUpdate(this);
    } catch (e) {
      this.error = `Failed to reload garden: ${e.message}`
      console.error(e);
    }
  }

  /**
   * Reload the plants
   */
  private async reloadPlants() {
    try {
      this.plants = await this.gardenService.getPlants();
      forceUpdate(this);
    } catch (e) {
      this.error = `Failed to reload plants: ${e.message}`
      console.error(e);
    }
  }

  /**
   * Select a field
   * @param ev Event containing the field index
   */
  private selectField(ev: CustomEvent<number>) {
    if (ev.detail === null) return;
    this.selectedField = ev.detail;
  }

  /**
   * Save the plant
   * @param plant The plant to save
   */
  private async savePlant(plant: Plant) {
    try {
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
    } catch (e) {
      this.error = `Failed to save plant: ${e.message}`
      console.error(e);
    }
  }

  /**
   * Save the field
   * @param field The field to save
   */
  private async saveField(field: GardenField) {
    if (this.selectedField === -1) return;
    try {
      await this.gardenService.updateField(this.selectedField, {
        plant: field.plant,
        note: field.note,
      });
      this.selectedField = -1;
      await this.reloadGarden();
    } catch (e) {
      this.error = `Failed to save field: ${e.message}`
      console.error(e);
    }
  }

  /**
   * Clear the field
   */
  private async clearField() {
    if (this.selectedField === -1) return;
    try {
      await this.gardenService.clearField(this.selectedField);
      this.selectedField = -1;
      await this.reloadGarden();
    } catch (e) {
      this.error = `Failed to clear field: ${e.message}`
      console.error(e);
    }
  }

  render() {
    return (
      <StyledHost>
        {this.error && <gardener-error class="w-full h-screen" error={this.error}></gardener-error>}
        {this.garden && (
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
        )}
      </StyledHost>
    );
  }
}
