export type ResourceStatus = "ACTIVE" | "INACTIVE";

export interface Resource {
  id: number;
  name: string;
  description: string;
  price: number;
  status: ResourceStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateResourceDto {
  name: string;
  description?: string;
  price?: number;
  status?: ResourceStatus;
  tags?: string[];
}

export interface UpdateResourceDto {
  name?: string;
  description?: string;
  price?: number;
  status?: ResourceStatus;
  tags?: string[];
}
