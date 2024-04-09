import { Garden, Plant } from '../types';
import { CreatePlantRequestDTO, UpdateFieldRequestDTO, UpdateGardenRequestDTO, UpdatePlantRequestDTO } from '../types/dtos';
import { IGardenService } from './interfaces/garden.iservice';
import { GardenServiceMock } from './mock/garden.mock.service';

class GardenService implements IGardenService {
  constructor(private apiBase: string) {}

  async getGarden(): Promise<Garden> {
    const response = await fetch(`${this.apiBase}/garden`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  async getPlants(): Promise<Plant[]> {
    const response = await fetch(`${this.apiBase}/plants`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  async updateGarden(dto: UpdateGardenRequestDTO): Promise<void> {
    const response = await fetch(`${this.apiBase}/garden`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async updateField(idx: number, dto: UpdateFieldRequestDTO): Promise<void> {
    const response = await fetch(`${this.apiBase}/garden/field/${idx}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async clearField(idx: number): Promise<void> {
    const response = await fetch(`${this.apiBase}/garden/field/${idx}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  async createPlant(dto: CreatePlantRequestDTO): Promise<Plant> {
    const response = await fetch(`${this.apiBase}/plants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  async updatePlant(id: string, dto: UpdatePlantRequestDTO): Promise<void> {
    const response = await fetch(`${this.apiBase}/plants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }
}

export class GardenServiceFactory {
  static create(apiBase: string, mock = false): IGardenService {
    if (mock) {
      return new GardenServiceMock();
    }
    return new GardenService(apiBase);
  }
}
