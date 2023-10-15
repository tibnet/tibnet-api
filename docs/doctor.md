
baseUrl: `/api/v1/`

## /doctor

**`GET /doctor/pacients`**

---

**`GET /doctor/pacients/:id`**

---

**`GET /doctor/orders`**

---

**`GET /doctor/orders/:id`**

---

**`PUT /doctor/orders/:id/cofirm`**

```ts
{
    meetingDate: Date
}
```

---

**`PUT /doctor/orders/:id/reject`**


---

**`GET /doctor/meetings`**

---

**`POST /doctor/meetings`**

```ts
{
    name: string, 
    pacients: number[]
}
```

**`GET /doctor/meetings/:id/join`**
