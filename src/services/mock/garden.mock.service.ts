import { Garden, GardenField, Plant } from '../../types';
import { CreatePlantRequestDTO, UpdateFieldRequestDTO, UpdateGardenRequestDTO, UpdatePlantRequestDTO } from '../../types/dtos';
import { IGardenService } from '../interfaces/garden.iservice';

export class GardenServiceMock implements IGardenService {
  static garden: Garden = {
    name: 'My Garden',
    size: 4,
    fields: [
      { plant: 'Tomato', note: 'This is a tomato' },
      { plant: 'Carrot', note: 'This is a carrot' },
      { plant: 'Potato' },
      { plant: 'Cabbage', note: 'This is a cabbage' },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  };

  static plants: Plant[] = [
    { id: 'Tomato', name: 'Tomato', description: 'This is a tomato' },
    { id: 'Carrot', name: 'Carrot', description: 'This is a carrot' },
    { id: 'Potato', name: 'Potato', description: 'This is a potato' },
    { id: 'Cabbage', name: 'Cabbage', description: 'This is a cabbage' },
  ];

  constructor() {}

  async getGarden(): Promise<Garden> {
    console.log('Getting garden', GardenServiceMock.garden);
    return GardenServiceMock.garden;
  }

  async getPlants(): Promise<Plant[]> {
    console.log('Getting plants');
    return GardenServiceMock.plants;
  }

  async updateGarden(dto: UpdateGardenRequestDTO): Promise<void> {
    console.log('Updating garden:', dto);
    if (dto.name) GardenServiceMock.garden.name = dto.name;
    if (dto.size) GardenServiceMock.garden.size = dto.size;
  }

  async updateField(idx: number, dto: UpdateFieldRequestDTO): Promise<void> {
    console.log('Updating field:', idx, dto);

    const origField = GardenServiceMock.garden.fields[idx] ?? null;
    const newField: GardenField = {
      plant: dto.plant ?? origField?.plant,
      note: dto.note ?? origField?.note ?? undefined,
    };
    GardenServiceMock.garden.fields = GardenServiceMock.garden.fields.map((field, i) => {
      if (i === idx) return newField;
      return field;
    });
  }

  async clearField(idx: number): Promise<void> {
    console.log('Clearing field:', idx);
    const newFields = GardenServiceMock.garden.fields.reduce<(GardenField | null)[]>((acc, field, i) => {
      if (i === idx) return [...acc, null];
      return [...acc, field];
    }, []);
    GardenServiceMock.garden.fields = newFields;
  }

  async createPlant(dto: CreatePlantRequestDTO): Promise<Plant> {
    console.log('Creating plant:', dto);
    const plant: Plant = { id: dto.name, name: dto.name, description: dto.description ?? '' };
    GardenServiceMock.plants = [...GardenServiceMock.plants, plant];
    return plant;
  }

  async updatePlant(id: string, dto: UpdatePlantRequestDTO): Promise<void> {
    console.log('Updating plant:', id, dto);
    const origPlant = GardenServiceMock.plants.find(p => p.id === id);
    const newPlant: Plant = {
      id: id,
      name: dto.name ?? origPlant?.name ?? 'Missing name',
      description: dto.description ?? origPlant?.description ?? undefined,
    };
    GardenServiceMock.plants = GardenServiceMock.plants.map(plant => {
      if (plant.id === id) return newPlant;
      return plant;
    });
  }
}
