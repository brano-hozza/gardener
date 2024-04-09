
export interface Plant {
  id: string;
  name: string;
  description?: string;
}

export interface GardenField {
  plant: string;
  note?: string;
}

export interface Garden {
  name: string;
  size: number;
  fields: (GardenField|null)[];
}
