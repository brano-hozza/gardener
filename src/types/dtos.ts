export interface UpdateFieldRequestDTO {
  plant?: string;
  note?: string;
}

export interface UpdatePlantRequestDTO {
  name?: string;
  description?: string;
}

export interface CreatePlantRequestDTO {
  name: string;
  description?: string;
}
