# district-finder

### The Problem
I can think of a handful of reasons a civic application would need to be able to look up various districts at the city, county, state, or national level. Also things like TIRZs. You should be able to provide a lat/lon and have it return this data as JSON for use in other applications.

### Project Idea

Backend interface, database, and end user API where the following can happen:

1. Admins can upload a geojson, shapefile, etc. of voting precincts with an expiration date (usually they can only change at certain times by law).

1. Admins can then upload the same for district/area/zone/whatever.

1. Code runs to build a less intense to query database mapping the larger areas down to what precincts are in them.

1. API users can make queries like ```/geo/29.75/-95.36```

1. JSON/XML spat out with known data, and a tag of some sort if it's outdated according to the expiration set.

### Why It's Important

On it's own, it's not hugely important, but you could build all sorts of things with this data. Especially if the raw files were also provided somehow to download.

Off the top of my head, you could build the following:
* Simple district listing interface: http://whatsmydistrict.org/

* Who represents me, but like way more in depth: http://www.fyi.legis.state.tx.us/Home.aspx

* A digital clone of a voter registration card like this: [Texas voter registration card](https://cloud.githubusercontent.com/assets/1390578/15260137/bf478d78-191a-11e6-959a-c686203d0848.jpg)

* A digital version of the League of Women Voters Voter Guide, but without showing you all the stuff you can't actually vote for (the project I plan on doing next). For the primaries it was 51 pages. It took me 2 hours to get through, and at least half the time was just trying to find what was relevant to me.

## The App
What works so far:

1. get county
1. get precinct
1. get all

Left to do:

1. admin interface to make uploading trivial
1. expiration metadata
1. simple website with a lookup tool
1. API keys maybe?
1. Provide the full datasets
1. Find more data sets!

Examples!

Near where I live now and accurate!
```
http://localhost:5000/geo/29.7218989/-95.4562183

Returns:
{
  precinct: "0570",
  county: "harris"
}
```

Near where I used to live and also accurate!
```
http://localhost:5000/geo/29.656784/-95.7359787

Returns:
{
  precinct: "4082",
  county: "fort-bend"
}
```

Near where my grandma lives, and I guess I can call and ask her if it's right.
```
http://localhost:5000/geo/30.3234077/-95.4854002

Returns:
{
  precinct: "21",
  county: "montgomery"
}
```

## Run It Locally Yourself With the Sample Data

This probably works, and I'll test it later.

```
git clone https://github.com/sketch-city/district-finder.git district-finder
cd district-finder
npm install
vagrant up
cd /var/www/
nf start
```
