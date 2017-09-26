[ ![Codeship Status for databraid-dashboard/transit-api](https://app.codeship.com/projects/459d8c80-5ead-0135-6b43-16bdadfc7181/status?branch=master)](https://app.codeship.com/projects/238758)

# Databraid Transit API

## Description

An API that uses Express to give realtime public transit directions from a starting point to a destination and public transit alerts for the San Francisco Bay Area. This API uses the Google Directions API to retrieve multiple routes and travel information between an origin and a destination for respective routes by public transit. This API uses uses the 511.org API to retrieve alerts information for the bay area and parse the alerts for information on which bus lines are affected.

## Usage

Before beginning make sure you have Docker installed and running, then do:

```
npm i
npm run up
```

When finished developing do:

```
npm run down
```

Testing and linting can all be done respectively with:

```
npm test
npm run lint
```
