# idmint

**Simple, secure, and scalable unique ID generator for modern applications**

`idmint` is a lightweight, TypeScript-friendly unique ID generator designed for **high-traffic frontend and backend applications**.  
It uses **cryptographically secure randomness** to generate **collision-resistant IDs** without any database, server coordination, or external dependency.

---

## ✨ Features

- 🔐 **Cryptographically secure IDs** (Node.js `crypto`)
- ⚡ **Extremely low collision probability** (safe for millions to billions of IDs)
- 🧩 **Optional size parameter** (flexible length)
- 🕒 **Time-based sortable IDs**
- 🏷 **Prefix support**
- 📦 **Zero runtime dependencies**
- 🟦 **Written in TypeScript**
- 🚀 **Works in high-traffic & distributed systems**

---

## 📦 Installation

```bash
npm install idmint
```

## 🚀 Usage

### Generate a default ID

```bash
import { generateId } from "idmint";

const id = generateId();
console.log(id);
// → "V1StGXR8_Z5jdHi6B-myT"
```

### Generate ID with custom size

```bash
generateId(7);    // shorter ID
generateId(32);   // longer, ultra-safe ID
```

ℹ️ Allowed size range: 4 to 64

### Generate ID with prefix

```bash
import { generateIdWithPrefix } from "idmint";

const id = generateIdWithPrefix("user", 10);
console.log(id);
// → "user_K9dLx2PqA"
```

Useful for:

- User IDs
- Order IDs
- Entity-based identifiers

### Generate time-based sortable ID

```bash
import { timeBasedId } from "idmint";

const id = timeBasedId();
console.log(id);
// → "lq9z3a8c4kH9dP2"
```

These IDs naturally sort by creation time, which is useful for:

- Logs
- Tables
- Pagination
- Short URLs
- Analytics & tracking

### Preset generators

```bash
import { idmint } from "idmint";

idmint.short();    // 8 characters
idmint.medium();   // 21 characters (default, recommended)
idmint.long();     // 32 characters
```

## Error handling

All public APIs validate input and throw descriptive errors.
This is intentional to avoid silent failures in production.

## 🔒 How uniqueness is ensured

idmint does not store IDs in any database.

Uniqueness is achieved through:

- Cryptographically secure random bytes
- High-entropy alphabet (64 URL-safe characters)
- Configurable ID length

## Collision probability

With default settings:

- Alphabet size: 64
- Length: 21 characters
- Entropy: 126 bits

This makes collision probability astronomically low, even with millions or billions of generated IDs.

## 🧠 When to use idmint

- React keys
- Short URLs
- Client-side ID generation
- Temporary IDs before database insert
- Logs & request tracking
- Distributed systems (no coordination required)

## 📄 License

MIT

## ❤️ Why idmint?

- uuid is long and unreadable
- nanoid is minimal by design

idmint focuses on clarity, flexibility, and enterprise readiness while remaining lightweight and easy to use.
