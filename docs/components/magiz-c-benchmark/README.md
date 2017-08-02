## magiz-c-benchmark: Benchmark Component UI

![Bower](https://img.shields.io/bower/v/magiz-c-benchmark.svg)

### Installation

```
bower install magiz-c-benchmark
```

### Usage

Insert scripts and styles in `index.html`

```html
<link rel="stylesheet" href="./src/benchmark.css">
<script src="./src/gspreadsheet.js"></script>
<script src="./src/bootstrap-popup.js"></script>
<script src="./src/benchmark.js"></script>
```

#### Normal Benchmark

```
<div class="benchmarks" gid="google_spread_sheet_id"></div>
```

Example

```html
<div class="benchmarks" gid="1Fg81wPNnC6aFC3mFIzMJqyV3Ig9m5VT1rgKpMhWV9j0"></div>
<div class="clearfix"></div>
```

![](http://i.imgur.com/5B8yPxi.png)

#### Benchmark with Custom Scores

```
<div class="benchmarks" gid="google_spread_sheet_id" scores="score_1,score_2"></div>
```

Example

```
<div class="benchmarks" gid="1nQYWwoBpOFOE82Pv_Z47Utrk6Gfei6rAuzVc-vpcyoo" scores="MAP,MRR"></div>
<div class="clearfix"></div>
```

![](http://i.imgur.com/e17iPsc.png)
