# Interest Calculator API Documentation

## 1. Overview

The Interest Calculator API is a lightweight Node.js (Express) service for performing financial calculations and currency conversions. It exposes three HTTP endpoints:

1. `POST /api/simple-interest` – calculates simple interest totals.
2. `POST /api/compound-interest` – calculates compound growth over time.
3. `GET /api/exchange-rate` – fetches live currency conversion quotes via the Frankfurter API.

The API accepts JSON or URL-encoded payloads and responds in JSON. It is typically served on port `3000` (configurable through the `API_PORT` environment variable).

---

## 2. Installation and Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the API server**
   ```bash
   npm run start:api   # or: API_PORT=3000 node index.js
   ```

---

## 3. Request/Response Format

- **Content types accepted:** `application/json`, `application/x-www-form-urlencoded`
- **Response format:** JSON
- **Error handling:** Standard HTTP status codes with an `{ "error": "message" }` body.

---

## 4. Endpoints

### 4.1 POST `/api/simple-interest`

Calculates simple interest using the formula **I = (P × R × T) / 100**.

| Parameter  | Type   | Required | Description                        |
|------------|--------|----------|------------------------------------|
| principal  | number | Yes      | Principal amount (`P`)             |
| rate       | number | Yes      | Annual interest rate (%) (`R`)     |
| time       | number | Yes      | Time in years (`T`)                |

**Sample Request**
```http
POST /api/simple-interest
Content-Type: application/json

{
  "principal": 1000,
  "rate": 5,
  "time": 2
}
```

**Sample Response**
```json
{
  "principal": 1000,
  "rate": 5,
  "time": 2,
  "interest": 100,
  "totalAmount": 1100
}
```

---

### 4.2 POST `/api/compound-interest`

Calculates compound growth using **A = P × (1 + R / (100 × n))^(n × t)**.

| Parameter  | Type   | Required | Description                                    |
|------------|--------|----------|------------------------------------------------|
| principal  | number | Yes      | Principal amount (`P`)                         |
| rate       | number | Yes      | Annual interest rate (%) (`R`)                 |
| time       | number | Yes      | Time in years (`t`)                            |
| frequency  | number | Yes      | Compounds per year (`n`) (e.g. 12 for monthly) |

**Sample Request**
```http
POST /api/compound-interest
Content-Type: application/json

{
  "principal": 5000,
  "rate": 6,
  "time": 3,
  "frequency": 12
}
```

**Sample Response**
```json
{
  "principal": 5000,
  "rate": 6,
  "time": 3,
  "frequency": 12,
  "interest": 972.46,
  "totalAmount": 5972.46
}
```

---

### 4.3 GET `/api/exchange-rate`

Fetches a live FX quote from the [Frankfurter](https://www.frankfurter.app/) public API (no API key required).

| Query Param | Type   | Required | Description                       |
|-------------|--------|----------|-----------------------------------|
| from        | string | No       | Base currency code (default USD)  |
| to          | string | No       | Target currency code (default EUR)|
| amount      | number | No       | Amount to convert (default 1)     |

**Sample Request**
```
GET /api/exchange-rate?from=USD&to=EUR&amount=100
```

**Sample Response**
```json
{
  "from": "USD",
  "to": "EUR",
  "amount": 100,
  "rate": 0.9321,
  "convertedAmount": 93.21
}
```

---

## 5. Error Responses

| Status Code | Endpoint(s)                | Cause                                      |
|-------------|----------------------------|-------------------------------------------|
| 400         | All                        | Missing or invalid parameters             |
| 500         | All                        | Unexpected server errors                   |
| 502         | `/api/exchange-rate`       | Frankfurter API not reachable/invalid data |

All error responses follow the format:
```json
{ "error": "Description of the failure" }
```

---

## 6. Environment Variables

| Variable  | Default | Description                        |
|-----------|---------|------------------------------------|
| API_PORT  | 3000    | Port where the API server listens  |
| UI_PORT   | 3000    | (Frontend server, if used)         |
| API_URL   |  (none) | UI proxy target for API requests   |

---

## 7. Testing

1. **Automated**: no automated tests are included yet (placeholder `npm test` script).
2. **Manual**:
   - Use curl/Postman with JSON payloads.
   - If the UI tester is running, submit forms to call each endpoint.
   - For `/api/exchange-rate`, confirm responses change with different currency pairs.

---

## 8. Notes & Future Enhancements

- Add authentication if exposed publicly.
- Parameterize the Frankfurter API base URL for alternative providers.
- Extend with amortization schedules, loan payoff calculations, or savings projections.
- Consider rate-limiting and request validation middleware for production.

---

<<<<<<< HEAD:docs/getting-started.md
**Maintainer:** Michael Akinwonmi
=======
**Maintainer:** Michael Akinwonmi  

>>>>>>> cb74d8f (Add user authentication middleware):docs/api-documentation.md


