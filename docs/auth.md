
baseUrl: `/api/v1/`

## auth

**`POST /login`**

``` ts
{
    phone: string,
    password: string
}
```
Response

``` ts
{
    success: boolean,
    phone: string,
    company: {
        address: string;
        name: string;
        phone: string;
        telegram: string;
        TIN: string;
    },
    doctor: {
        firstName: string;
        lastName: string;
        specials: {
            name: string;
            tags: string;
        }[];
    },
    pacient: {
        firstName: string;
        lastName: string;
    },
    role: 'pacient' | 'company' | 'doctor',
    token: authToken,
}
```
**`GET /checkPhone?phone=`**

Response
``` ts
{
    allowLogin: boolean
}
```

**`POST /register`**
```ts
{   
    type: 'pacient' | 'company', 
    phone: string, 
    password: string, 
    pacinet: {
        firstName: string
        lastName: string
    }, 
    company: {
        name: string, 
        address: string, 
        TIN: string, 
        phone: string, 
        telegram: string, 
        countryCode: string
    } 
}
```
Response

```ts
{
    success: boolean,
    verificationId: string
}
```

**`GET /verify?vid=<verification-id>&code=<sms-code>`**

Response

``` ts
{
    success: boolean,
    phone: string,
    company: {
        address: string;
        name: string;
        phone: string;
        telegram: string;
        TIN: string;
    },
    pacient: {
        firstName: string;
        lastName: string;
    },
    role: 'pacient' | 'company',
    token: authToken,
}
```
