import { readDB, writeDB } from "./db";
import { CreateResourceDto, Resource, UpdateResourceDto } from "./types";

export function createResource(input: CreateResourceDto): Resource {
  const db = readDB();
  const now = new Date().toISOString();
  const id = ++db.lastId;
  const resource: Resource = {
    id,
    name: input.name,
    description: input.description ?? "",
    price: typeof input.price === "number" ? input.price : 0,
    status: input.status ?? "ACTIVE",
    tags: input.tags ?? [],
    createdAt: now,
    updatedAt: now
  };
  db.resources.push(resource);
  writeDB(db);
  return resource;
}

export function getResourceById(id: number): Resource | undefined {
  const db = readDB();
  return db.resources.find(r => r.id === id);
}

export function updateResource(id: number, input: UpdateResourceDto): Resource | undefined {
  const db = readDB();
  const idx = db.resources.findIndex(r => r.id === id);
  if (idx === -1) return undefined;
  const current = db.resources[idx];
  const updated: Resource = {
    ...current,
    name: input.name ?? current.name,
    description: input.description ?? current.description,
    price: typeof input.price === "number" ? input.price : current.price,
    status: input.status ?? current.status,
    tags: input.tags ?? current.tags,
    updatedAt: new Date().toISOString()
  };
  db.resources[idx] = updated;
  writeDB(db);
  return updated;
}

export function deleteResource(id: number): boolean {
  const db = readDB();
  const before = db.resources.length;
  db.resources = db.resources.filter(r => r.id !== id);
  const changed = db.resources.length !== before;
  if (changed) writeDB(db);
  return changed;
}

export interface ListFilters {
  search?: string;
  status?: "ACTIVE" | "INACTIVE";
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
  sortBy?: "createdAt" | "price" | "name";
  sortOrder?: "asc" | "desc";
}

export function listResources(filters: ListFilters) {
  const {
    search,
    status,
    minPrice,
    maxPrice,
    limit = 20,
    offset = 0,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const db = readDB();
  let items = db.resources.slice();

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    );
  }
  if (status) items = items.filter(r => r.status === status);
  if (typeof minPrice === "number") items = items.filter(r => r.price >= minPrice);
  if (typeof maxPrice === "number") items = items.filter(r => r.price <= maxPrice);

  items.sort((a: any, b: any) => {
    const dir = (sortOrder?.toLowerCase() === "asc") ? 1 : -1;
    const av = a[sortBy];
    const bv = b[sortBy];
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });

  const total = items.length;
  const paged = items.slice(offset, offset + limit);

  return { items: paged, total, limit, offset };
}
