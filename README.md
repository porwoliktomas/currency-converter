# Currency converter

A simple application for currency conversion.

## Data source

This project uses a free version of the [openexchangerates.org](https://openexchangerates.org/).

## Architecture

- Typescript
- React
- Node.js with Express
- SQLite for storing data as a file database

## Public API

### Endpoint `/currencies` (GET)

Returns all supported currencies in the format:

```
{
    "currencies":
    {
        "AED": "United Arab Emirates Dirham",
        "AFN": "Afghan Afghani",
        "ALL": "Albanian Lek",
        ...
    }
}
```

### Endpoint `/convert` (GET)

Converts specified amount from one currency to another.

There are 3 required parameters:

- from - currency code to be converted
- to - destination currency code
- amount - floating point number

Parameters `from` and `to` must contain one of the currency codes returned by the endpoint `currencies`.

Example: `/convert?from=EUR&to=USD&amount=1`

Returns:

```
{
    "query":
    {
        "from": "EUR",
        "to": "USD",
        "amount": 1
    },
    "result": 1.0685632952782325
}
```

### Endpoint `/stats` (GET)

Returns statistics of usage:

- Most popular destination currencies (as an array, because there can be more than one or none in case of zero conversions made)
- Total amount converted in USD
- Total number of conversion requests made

Returned format:

```
{
    "stats":
    {
        "mostPopularDestinationCurrencies": ["USD"],
        "totalAmountConvertedInUsd": 311778.1887974073,
        "totalRequests": 219
    }
}
```

## Testing

Run these commands for running the testing instance:

### Frontend

```
cd frontend
npm install
npm start
```

For configuration details see readme in the `frontend` folder.

### Backend

```
cd backend
npm install
npm run dev
```

For configuration details see readme in the `backend` folder.
