# Problem 5 — ExpressJS + TypeScript CRUD (File persistence)

A minimal backend built with **ExpressJS** and **TypeScript**, implementing CRUD over a `Resource` entity with **simple file-based persistence** (JSON at `./data/db.json`). No native addons required.

## ✨ Features
- Create / List (filters, pagination, sorting) / Get / Update / Delete
- Persistence: JSON file (`./data/db.json`)
- Type-safe DTOs & lightweight validation
- Works on Node 18+ and Node 22 without build tools

## 📁 Structure
```
problem5-express-ts/
├─ src/
│  ├─ server.ts          # App entrypoint
│  ├─ db.ts              # File-based "DB" helpers
│  ├─ model.ts           # Data access (CRUD + filters)
│  ├─ types.ts           # Types & DTOs
│  └─ routes/
│     └─ resources.ts    # Express router
├─ data/                 # db.json lives here after first run
├─ package.json
├─ tsconfig.json
└─ README.md
```

## 🚀 Run locally
> Requires Node 18+

```bash
npm install
npm run dev
# or
npm run build
npm start
```

Server starts at: `http://localhost:3000`

### Health check
```
GET http://localhost:3000/health
```

## 📚 API Endpoints (base: `/api/resources`)

### 1) Create
```
POST /api/resources
Content-Type: application/json

{
  "name": "Sample",
  "description": "Optional text",
  "price": 12.5,
  "status": "ACTIVE",
  "tags": ["t1", "t2"]
}
```
**201 Created** → returns created resource.

### 2) List with filters / pagination / sorting
```
GET /api/resources?search=Sam&status=ACTIVE&minPrice=10&maxPrice=50&limit=10&offset=0&sortBy=createdAt&sortOrder=desc
```
**200 OK** →
```json
{
  "items": [ /* resources */ ],
  "total": 42,
  "limit": 10,
  "offset": 0
}
```

### 3) Get details
```
GET /api/resources/:id
```

### 4) Update (partial)
```
PATCH /api/resources/:id
Content-Type: application/json

{ "price": 19.99, "status": "INACTIVE" }
```

### 5) Replace (full)
```
PUT /api/resources/:id
Content-Type: application/json

{ "name": "New Name" }
```

### 6) Delete
```
DELETE /api/resources/:id
```
**204 No Content**

## 🔒 Notes
- `status`: `"ACTIVE"` or `"INACTIVE"`.
- `tags`: `string[]` (stored as JSON).
- `price`: number (defaults to 0).

## 🧪 Quick cURL tests
```bash
# Create
curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{ "name": "First", "price": 9.99, "tags": ["alpha"] }'

# List
curl "http://localhost:3000/api/resources?limit=5&offset=0"

# Get by id
curl http://localhost:3000/api/resources/1

# Patch
curl -X PATCH http://localhost:3000/api/resources/1 \
  -H "Content-Type: application/json" \
  -d '{ "status": "INACTIVE" }'

# Delete
curl -X DELETE http://localhost:3000/api/resources/1 -i
```

## ⚙️ Environment
- Optional: `PORT` in `.env` (default: 3000).
