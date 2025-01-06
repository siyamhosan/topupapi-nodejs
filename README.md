# TopUpAPI

Your TopUp business partner! A comprehensive TypeScript library for managing orders, stocks, users, nodes, and more.

## Website

[T4B.Top](https://t4b.top)

## Installation

Install the package using your preferred package manager:

```bash
npm install topupapi
# or
pnpm add topupapi
```

## Quick Start

```typescript
import { TopUpClient } from 'topupapi';

const client = new TopUpClient({
  token: 'YOUR_API_TOKEN'
});
```

---

# Features Overview

1. **Order Management**: Place orders, track their status, and manage order combinations.
2. **Stock Management**: Handle inventory with options for adding, buying, and refunding stocks.
3. **User Management**: Manage users and merchants with advanced permission settings.
4. **Node & Shard Management**: Configure and monitor nodes and shards for efficient system operation.

---

# Order Management

### Place New Orders

Create orders with game details, amount, and callback URLs.

```typescript
const order = await client.order.place({
  game: "GAME", // 'FREE_FIRE' | 'FREE_FIRE_SHELL' | 'FREE_FIRE_SG' | 'FREE_FIRE_ID
  amount: "100", // Diamond amount
  uid: "PLAYER_UID",
  callbackUrl: "https://your-callback-url.com",
  quantity: 1 // optional
});
```

**Endpoint**: `POST /order/`

---

### Fetch Orders

Retrieve orders with filtering and pagination options.

```typescript
// Get all orders
const allOrders = await client.order.fetch();

// Get a specific order
const order = await client.order.fetch("ORDER_ID");

// Get paginated orders
const paginatedOrders = await client.order.fetch({
  offset: 0,
  limit: 10
});
```

**Endpoints**:

- `GET /order/orders`
- `GET /order/:orderId`
- `GET /order?offset=0&limit=10`

---

### Check Order Status

Track the status of an order.

```typescript
const status = await client.order.status({ orderId: "ORDER_ID" });
```

**Endpoint**: `GET /order/status/:orderId`

---

### Manage Order Combinations

Calculate possible combinations for specified order amounts.

```typescript
const combinations = await client.order.combinationBreaker({
  amount: "100",
  game: "GAME", // 'FREE_FIRE' | 'FREE_FIRE_SHELL' | 'FREE_FIRE_SG' | 'FREE_FIRE_ID
});
```

**Endpoint**: `POST /order/combination-breaker`

---

# Stock Management

### Add New Stock

Add new stock items to your inventory.

```typescript
const newStock = await client.stocks.add({
  game: "GAME", // 'FREE_FIRE' | 'FREE_FIRE_SHELL' | 'FREE_FIRE_SG' | 'FREE_FIRE_ID
  codeTxt: "YOUR_CODE_TEXT",
  amount: 100,
  price: "10000"
});
```

**Endpoint**: `POST /stock/add`

---

### Buy Stock

Purchase stock with specified combinations and quantities.

```typescript
const purchase = await client.stocks.buy({
  game: "GAME", // 'FREE_FIRE' | 'FREE_FIRE_SHELL' | 'FREE_FIRE_SG' | 'FREE_FIRE_ID
  combination: [100, 200],
  quantity: 1
});
```

**Endpoint**: `POST /stock/buy`

---

### Refund Stock

Process refunds for purchased stocks.

```typescript
const refund = await client.stocks.refund({
  game: "GAME", // 'FREE_FIRE' | 'FREE_FIRE_SHELL' | 'FREE_FIRE_SG' | 'FREE_FIRE_ID
  checkCode: ["CODE_1", "CODE_2"]
});
```

**Endpoint**: `PATCH /stock/refund`

---

# User Management

### Register Users

Add a new user to the platform.

```typescript
const user = await client.users.register({
  name: "John Doe"
});
```

**Endpoint**: `POST /user/register`

---

### Add Merchants

Add merchants and configure their profit rates.

```typescript
const merchant = await client.users.addMerchant({
  userId: 123,
  profitRate: 0.15
});
```

**Endpoint**: `POST /user/merchant`

---

### Update Merchant Details

Update merchant configurations.

```typescript
const updated = await client.users.updateMerchant({
  userId: 123,
  profitRate: 0.20
});
```

**Endpoint**: `PATCH /user/merchant`

---

# Node Management (Admin Only)

### Configure Nodes

Add and manage nodes in your network.

```typescript
const node = await client.nodes.add({
  endPoint: "192.168.1.1",
  connectionToken: "YOUR_CONNECTION_TOKEN"
});
```

**Endpoints**:

- `POST /node/add`
- `GET /node/`

---

### Manage Shards

Configure and monitor shard behavior.

```typescript
const updatedConfig = await client.nodes.updateShardConfig({
  flowGate: true,
  flowGateMode: "LIMIT",
  flowGateLimit: 1000
});
```

**Endpoints**:

- `GET /node/shards/config`
- `PATCH /node/shards/config`

---

# Response Types

The library provides strongly typed responses for all operations:

- **Orders**: `Order`, `OrderStatus`, `OrderState`
- **Stocks**: `StockAddResponse`, `StockBuyResponse`, `StockRefundResponse`
- **Users**: `User`, `Merchant`
- **Nodes**: `Node`, `ShardConfigDto`

Refer to the types documentation for detailed schemas.

---

## Version History

Check the [Changelog](https://t4b.top/changelog) for version details and updates.

---

## License

This project is licensed under the MIT License.

For more details and documentation, visit [T4B.Top](https://t4b.top).
