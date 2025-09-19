import { Router } from "express";
import { createResource, deleteResource, getResourceById, listResources, updateResource } from "../model";
import type { CreateResourceDto, UpdateResourceDto } from "../types";

export const resourcesRouter = Router();

// Create
resourcesRouter.post("/", (req, res, next) => {
  try {
    const body: CreateResourceDto = req.body || {};
    if (!body.name || typeof body.name !== "string") {
      return res.status(400).json({ error: "name is required (string)" });
    }
    const created = createResource(body);
    res.status(201).json(created);
  } catch (e) { next(e); }
});

// List with filters
resourcesRouter.get("/", (req, res, next) => {
  try {
    const { search, status, minPrice, maxPrice, limit, offset, sortBy, sortOrder } = req.query;
    const result = listResources({
      search: (search as string) || undefined,
      status: (status as any) || undefined,
      minPrice: minPrice !== undefined ? Number(minPrice) : undefined,
      maxPrice: maxPrice !== undefined ? Number(maxPrice) : undefined,
      limit: limit !== undefined ? Math.min(Number(limit), 100) : undefined,
      offset: offset !== undefined ? Number(offset) : undefined,
      sortBy: (sortBy as any) || undefined,
      sortOrder: (sortOrder as any) || undefined,
    });
    res.json(result);
  } catch (e) { next(e); }
});

// Get by id
resourcesRouter.get("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "invalid id" });
    const resource = getResourceById(id);
    if (!resource) return res.status(404).json({ error: "not found" });
    res.json(resource);
  } catch (e) { next(e); }
});

// Update (partial)
resourcesRouter.patch("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "invalid id" });
    const body: UpdateResourceDto = req.body || {};
    const updated = updateResource(id, body);
    if (!updated) return res.status(404).json({ error: "not found" });
    res.json(updated);
  } catch (e) { next(e); }
});

// Replace (full update)
resourcesRouter.put("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "invalid id" });
    const body: CreateResourceDto = req.body || {};
    if (!body.name || typeof body.name !== "string") {
      return res.status(400).json({ error: "name is required (string)" });
    }
    const updated = updateResource(id, body);
    if (!updated) return res.status(404).json({ error: "not found" });
    res.json(updated);
  } catch (e) { next(e); }
});

// Delete
resourcesRouter.delete("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "invalid id" });
    const ok = deleteResource(id);
    if (!ok) return res.status(404).json({ error: "not found" });
    res.status(204).send();
  } catch (e) { next(e); }
});
