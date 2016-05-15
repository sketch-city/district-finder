# district-finder

What works so far:
1. get county
1. get precinct
1. get all

Left to do:
1. admin interface to make uploading trivial.
1. Find more data sets!

Examples!

Near where I live now and accurate!
```
http://districtfinder.dev:5000/geo/29.7218989/-95.4562183

Returns:
{
  precinct: "0570",
  county: "harris"
}
```

Near where I used to live and also accurate!
```
http://districtfinder.dev:5000/geo/29.656784/-95.7359787

Returns:
{
  precinct: "4082",
  county: "fort-bend"
}
```

Near where my grandma lives, and I guess I can call and ask her if it's right.
```
http://districtfinder.dev:5000/geo/30.3234077/-95.4854002

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
