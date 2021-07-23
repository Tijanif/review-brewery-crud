const express = require('express');

// our brewery routes
const breweriesRouter = express.Router();

let breweriesDB = [
  {
    id: 9094,
    obdb_id: 'bnaf-llc-austin',
    name: 'Bnaf, LLC',
    brewery_type: 'planning',
    street: null,
    address_2: null,
    address_3: null,
    city: 'Austin',
    state: 'Texas',
    county_province: null,
    postal_code: '78727-7602',
    country: 'United States',
    longitude: null,
    latitude: null,
    phone: null,
    website_url: null,
    updated_at: '2018-07-24T00:00:00.000Z',
    created_at: '2018-07-24T00:00:00.000Z',
  },
  {
    id: 9180,
    obdb_id: 'boulder-beer-co-boulder',
    name: 'Boulder Beer Co',
    brewery_type: 'regional',
    street: '2880 Wilderness Pl',
    address_2: null,
    address_3: null,
    city: 'Boulder',
    state: 'Colorado',
    county_province: null,
    postal_code: '80301-5401',
    country: 'United States',
    longitude: '-105.2480158',
    latitude: '40.026439',
    phone: null,
    website_url: null,
    updated_at: '2018-08-24T00:00:00.000Z',
    created_at: '2018-07-24T00:00:00.000Z',
  },
  {
    id: 9754,
    obdb_id: 'clermont-brewing-company-clermont',
    name: 'Clermont Brewing Company',
    brewery_type: 'planning',
    street: null,
    address_2: null,
    address_3: null,
    city: 'Clermont',
    state: 'Florida',
    county_province: null,
    postal_code: '34711-2108',
    country: 'United States',
    longitude: null,
    latitude: null,
    phone: null,
    website_url: null,
    updated_at: '2018-08-11T00:00:00.000Z',
    created_at: '2018-07-24T00:00:00.000Z',
  },
  {
    id: 10186,
    obdb_id: 'dimensional-brewing-co-dubuque',
    name: 'Dimensional Brewing Co.',
    brewery_type: 'planning',
    street: null,
    address_2: null,
    address_3: null,
    city: 'Dubuque',
    state: 'Iowa',
    county_province: null,
    postal_code: '52001',
    country: 'United States',
    longitude: null,
    latitude: null,
    phone: null,
    website_url: 'http://www.dimensionalbrewing.com',
    updated_at: '2018-08-11T00:00:00.000Z',
    created_at: '2018-07-24T00:00:00.000Z',
  },
  {
    id: 10217,
    obdb_id: 'dixie-brewing-co-inc-new-orleans',
    name: 'Dixie Brewing Co Inc.',
    brewery_type: 'contract',
    street: '6221 S Claiborne Ave Ste 101',
    address_2: null,
    address_3: null,
    city: 'New Orleans',
    state: 'Louisiana',
    county_province: null,
    postal_code: '70125-4191',
    country: 'United States',
    longitude: null,
    latitude: null,
    phone: '5048228711',
    website_url: null,
    updated_at: '2018-08-11T00:00:00.000Z',
    created_at: '2018-07-24T00:00:00.000Z',
  },
  {
    id: 10486,
    obdb_id: 'epidemic-ales-concord',
    name: 'Epidemic Ales',
    brewery_type: 'micro',
    street: '150 Mason Circle Stes I&J',
    address_2: null,
    address_3: null,
    city: 'Concord',
    state: 'California',
    county_province: null,
    postal_code: '94520',
    country: 'United States',
    longitude: null,
    latitude: null,
    phone: '9255668850',
    website_url: 'http://www.epidemicales.com',
    updated_at: '2018-08-11T00:00:00.000Z',
    created_at: '2018-07-24T00:00:00.000Z',
  },
  {
    id: 11039,
    obdb_id: 'goose-island-philadelphia-philadelphia',
    name: 'Goose Island Philadelphia',
    brewery_type: 'brewpub',
    street: '1002 Canal St',
    address_2: null,
    address_3: null,
    city: 'Philadelphia',
    state: 'Pennsylvania',
    county_province: null,
    postal_code: '19123',
    country: 'United States',
    longitude: '-75.13506341',
    latitude: '39.9648491',
    phone: null,
    website_url: null,
    updated_at: '2018-08-24T00:00:00.000Z',
    created_at: '2018-07-24T00:00:00.000Z',
  },
];

// A GET endpoint /breweries?brewery_type=TYPE
breweriesRouter.get('/', (req, res) => {
  const { brewery_type } = req.query;
  let response = null;

  if (brewery_type) {
    const filteredBreweries = breweriesDB.filter(
      (brewery) => brewery.brewery_type === brewery_type
    );

    response = filteredBreweries.length
      ? filteredBreweries
      : `Can't find breweries of that type!`;
  } else {
    response = breweriesDB;
  }
  res.json({ breweries: response });
});

// post to database
breweriesRouter.post('/', (req, res) => {
  // we are receiving the new brewery through body
  const newBrewery = req.body;

  breweriesDB = [...breweriesDB, newBrewery];

  res.json({ brewery: newBrewery });
});

// Delete a brewery/:id
breweriesRouter.delete('/:id', (req, res) => {
  let { id } = req.params;
  id = Number(id);

  const brewery = breweriesDB.find((brewery) => brewery.id === id);

  if (brewery) {
    breweriesDB = breweriesDB.filter((brewery) => brewery.id !== id);
    res.json({ deletedBrewery: brewery });
  } else {
    res.json({ deletedBrewery: `Brewery do not exist` });
  }
});

// Patch
// change the keys with the updated wersion, keeping the one's that don't change
breweriesRouter.patch('/:id', (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const brewery = breweriesDB.find((brewery) => brewery.id === id);

  const updatedBrewery = req.body;

  let responseBrewery = null;

  breweriesDB = breweriesDB.map((brewery) => {
    if (brewery.id === id) {
      responseBrewery = { ...brewery, ...updatedBrewery };
      return responseBrewery;
    } else {
      return brewery;
    }
  });

  res.json({ updatedBrewery: responseBrewery });
});

module.exports = breweriesRouter;
