
baseUrl: `/api/v1/`

## /company

**`GET /company/doctors`**

---

**`POST /company/doctors`**

``` ts
{
    phone: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    specials: number[], 
    workDays: {
        day: string
        workTime: string
        lunchTime: string
    }[], 
    services: number[]
}
```

Response

``` ts
{
    success: boolean,
}
```
---

**`GET /company/doctors/:id`**

---

**`GET /company/doctors/:id/schedule`**

---

**`GET /company/doctors/:id/pacients`**

---

**`GET /company/doctors/:id/orders`**

---

**`GET /company/pacients`**

---

**`GET /company/pacients/:id`**

---

**`GET /company/pacients/:id/orders`**

---

**`GET /company/orders`**

---

**`GET /company/orders/:id`**

---

**`GET /company/feedbacks`**

---
