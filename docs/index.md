# TibNet API

baseUrl: `/api/v1/`

## auth

/login

``` json
{
    "phone": "998911233212",
    "password": "pass1234"
}
```
Response

``` ts
{
    success: boolean,
    phone: string,
    company: {
        id: number;
        address: string;
        name: string;
        phone: string;
        telegram: string;
        TIN: string;
    },
    role: 'pacient' | 'company' | 'doctor',
    token: authToken,
}```

## admin

## doctor

## pacient