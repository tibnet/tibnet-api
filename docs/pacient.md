
baseUrl: `/api/v1/`

## /pacient

**`GET /pacient/companies`**

---

**`GET /pacient/companies/:id`**

---

**`GET /pacient/companies/:id/doctors`**

---

**`GET /pacient/doctors?name=<string>&special=<string>`**

---

**`GET /pacient/doctors/:doc_id`**

---

**`GET /pacient/orders`**

---

**`POST /pacient/orders`**

```ts
{
    doctorId: number, 
    comment: string
}
```

---

**`GET /pacient/orders/:id`**

---

**`PUT /pacient/orders/:id/reject`**

---

**`GET /pacient/feedbacks`**

---

**`GET /pacient/feedbacks/:id`**

---