import { Garden, Plant } from "../../types";
import { CreatePlantRequestDTO, UpdateFieldRequestDTO, UpdatePlantRequestDTO } from "../../types/dtos";

export interface IGardenService{
  getGarden(): Promise<Garden>;
  getPlants(): Promise<Plant[]>;
  updateField(idx: number, dto: UpdateFieldRequestDTO): Promise<void>;
  clearField(idx: number): Promise<void>;
  createPlant(dto: CreatePlantRequestDTO): Promise<Plant>;
  updatePlant(id: string, dto: UpdatePlantRequestDTO): Promise<void>;
}
