#Tree-a-thon!

Quick Map of Trees [here](http://magentanova.github.io/tree-a-thon/)

![animated-map](https://cloud.githubusercontent.com/assets/2483873/10630624/8a5e5b60-779d-11e5-944d-59a6bff98c04.gif)

##Status

Currently in the data processing phase.  Processed data has been included in the repo.  You can run the following if you have a need to re-process data:

### Convert `./data/trees.csv` to `./data/trees.json`

```bash
npm run convert-trees
```

### Clean `./data/trees.json` to `./data/trees.reduced.json`

```bash
npm run clean-trees
```

### Geocode `./data/trees.reduced.json` to `./data/trees.reduced.geocoded.json`

```bash
npm run geocode-trees
```


##data preprocessing

...description to come...

##helpful links

Google Maps distance matrix api: https://developers.google.com/maps/documentation/distance-matrix/intro

Raw tree spreadsheet: https://docs.google.com/spreadsheets/d/1by6VA29p3qnyeMAq1KR49JbLTiv0vYbnt7jECk9G7TM/edit?usp=sharing

Traveling salesman problem: https://simple.wikipedia.org/wiki/Travelling_salesman_problem
