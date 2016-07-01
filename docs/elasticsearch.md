# Elasticsearch

<img src="http://substantial.com/assets/images/blog/2013/01/elasticsearch.png" alt="" />

<blockquote>
  Elasticsearch is a <strong>search server</strong> based on Lucene. It provides a distributed, multitenant-capable full-text search engine with a RESTful web interface and schema-free JSON documents. Elasticsearch is developed in Java and is released as open source under the terms of the Apache License. Elasticsearch is the second most popular enterprise search engine
</blockquote>

<h3>1. Basic Concenpts</h3>

<table>
<thead>
<tr>
<th>Relational Database</th>
<th>Elasticsearch</th>
</tr>
</thead>

<tbody>
<tr>
<td>Database</td>
<td>Index</td>
</tr>

<tr>
<td>Table</td>
<td>Type</td>
</tr>

<tr>
<td>Row</td>
<td>Document</td>
</tr>

<tr>
<td>Column</td>
<td>Field</td>
</tr>

<tr>
<td>Schema</td>
<td>Mapping</td>
</tr>
</tbody>
</table>

<h3>2. Index &amp; Query</h3>

<h4>Get all indices</h4>

<blockquote>
  /_stats
</blockquote>

<h3>Search API <sup id="fnref-1210-1"><a href="#fn-1210-1" rel="footnote">1</a></sup></h3>

<h4>Search All</h4>

<blockquote>
  /bank/_search?q=*
</blockquote>

<code>hits.hits</code> – actual array of search results (defaults to first 10 documents)

<h4>Query Language</h4>

elasticsearch provides a full <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html">Query DSL</a> based on JSON to define queries.

<blockquote>
  curl -XPOST /bank/_search
</blockquote>

[code language="javascript"]
// match all, limit 10 offset 10
{
  "query": { "match_all": {} },
  "from": 10,
  "size": 10
}

// select fields
{
  "query": { "match_all": {} },
  _source: ["account_number", "balance"]
  "size": 10
}

// where account equals 20
{
  "query": { "match": { "account_number": 20 } }
}
[/code]

<strong>Filter</strong>

[code]
curl -XPOST elastic:9200/index/type/_search -d '
{
  "query" : {
    "filtered" :
    {
      "query" : { "term" : { "feature" : 1 } } ,
      "filter" : {
        "and" : [
          {
            "range": {
              "_timestamp": {
                "from": 1441964671000,
                "to": 1441964672000
              }
            }
          }
        ]
      }
    }
  }
}
[/code]

**Sort**

[code]
curl -XPOST elastic:9200/index/type/_search -d '
{
  "query" : {
    "filtered" :
    {
      "query" : { "term" : { "feature" : 1 } } ,
      "filter" : {
        "and" : [
          {
            "range": {
              "_timestamp": {
                "from": 1441964671000,
                "to": 1441964672000
              }
            }
          }
        ]
      }
    }
  }
}
[/code]
<h3>3. Mapping</h3>

<h4>Timestamp <sup id="fnref-1210-2"><a href="#fn-1210-2" rel="footnote">2</a></sup></h4>

Enable and store timestamp

<blockquote>
  curl -XPOST localhost:9200/test
</blockquote>

[code]
{
"mappings" : {
    "_default_":{
        "_timestamp" : {
            "enabled" : true,
            "store" : true
        }
    }
  }
}'
[/code]



<h3>Relationships Management <sup id="fnref-1210-6"><a href="#fn-1210-6" rel="footnote">3</a></sup> <sup id="fnref-1210-7"><a href="#fn-1210-7" rel="footnote">4</a></sup></h3>

<strong>Inner Object</strong>

<ul>
<li>👍 Easy, fast, performant</li>
<li>👎 No need for special queries</li>
<li>☛ Only applicable when one-to-one relationships are maintained</li>
</ul>

<strong>Nested</strong>

<ul>
<li>👍 Nested docs are stored in the same Lucene block as each other, which helps read/query  performance. Reading a nested doc is faster than the equivalent parent/child.</li>
<li>👎 Updating a single field in a nested document (parent or nested children) forces ES to reindex the entire nested document. This can be very expensive for large nested docs</li>
<li>👎 “Cross referencing” nested documents is impossible</li>
<li>☛ Best suited for data that does not change frequently</li>
</ul>

<strong>Parent/Child</strong>

<ul>
<li>👍 Updating a child doc does not affect the parent or any other children, which can potentially save a lot of indexing on large docs</li>
<li>👎 Children are stored separately from the parent, but are routed to the same shard. So parent/children are slightly less performance on read/query than nested</li>
<li>👎 Parent/child mappings have a bit extra memory overhead, since ES maintains a “join” list in memory</li>
<li>👎 Sorting/scoring can be difficult with Parent/Child since the Has Child/Has Parent operations can be opaque at times</li>
</ul>

<strong>Denormalization</strong>

<ul>
<li>👍 You get to manage all the relations yourself!</li>
<li>👎 Most flexible, most administrative overhead</li>
<li>☛ May be more or less performant depending on your setup</li>
</ul>

<h3>4. Backup</h3>

<h4>Elastic Dump <sup id="fnref-1210-3"><a href="#fn-1210-3" rel="footnote">5</a></sup></h4>

Tools for moving and saving indicies.

[code]
bin/elasticdump
  --input=http://localhost:9200/index_1
  --output=http://localhost:9200/index_1_backup
  --type=data
  --scrollTime=100
[/code]

<h4>Alias <sup id="fnref-1210-5"><a href="#fn-1210-5" rel="footnote">6</a></sup></h4>

[code]
curl -XPOST 'http://localhost:9200/_aliases' -d '
{
    &quot;actions&quot; : [
        { &quot;remove&quot; : { &quot;index&quot; : &quot;test1&quot;, &quot;alias&quot; : &quot;alias1&quot; } },
        { &quot;add&quot; : { &quot;index&quot; : &quot;test1&quot;, &quot;alias&quot; : &quot;alias2&quot; } }
    ]
}'
[/code]

<h3>5. Module Scripting <sup id="fnref-1210-4"><a href="#fn-1210-4" rel="footnote">7</a></sup></h3>

<h3>Ranking</h3>

<a href="http://db-engines.com/en/ranking/search+engine">Rank #2 from DB-Engines Ranking of Search Engines</a>

<div class="footnotes">
<hr />
<ol>

<li id="fn-1210-1">
<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/_the_search_api.html">The Search API</a>&#160;<a href="#fnref-1210-1" rev="footnote">&#8617;</a>
</li>

<li id="fn-1210-2">
http://stackoverflow.com/a/17146144/772391&#160;<a href="#fnref-1210-2" rev="footnote">&#8617;</a>
</li>

<li id="fn-1210-6">
<a href="http://stackoverflow.com/a/23407367/772391">http://stackoverflow.com/a/23407367/772391</a>&#160;<a href="#fnref-1210-6" rev="footnote">&#8617;</a>
</li>

<li id="fn-1210-7">
<a href="https://www.elastic.co/guide/en/elasticsearch/guide/current/modeling-your-data.html">https://www.elastic.co/guide/en/elasticsearch/guide/current/modeling-your-data.html</a>&#160;<a href="#fnref-1210-7" rev="footnote">&#8617;</a>
</li>

<li id="fn-1210-3">
https://github.com/taskrabbit/elasticsearch-dump&#160;<a href="#fnref-1210-3" rev="footnote">&#8617;</a>
</li>

<li id="fn-1210-5">
https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-aliases.html&#160;<a href="#fnref-1210-5" rev="footnote">&#8617;</a>
</li>

<li id="fn-1210-4">
https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html&#160;<a href="#fnref-1210-4" rev="footnote">&#8617;</a>
</li>

</ol>
</div>

# Elasticsearch tutorial series 1: Metric Aggregations with Social Network Data

Table of content

* Avg, Max, Min, Sum Aggregation
* Cardinality Aggregation
* Stats Aggregation
* Extended Stats Aggregation
* Percentile Aggregation
* Percentile Ranks Aggregation
* Top hits Aggregation

### Avg, Max, Min, Sum, Count Aggregation

[Doc: Avg Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-avg-aggregation.html#search-aggregations-metrics-avg-aggregation), [Doc: Max Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-max-aggregation.html), [Doc: Min Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-min-aggregation.html)

**Get max, min, avg, sum, count about number of likes, shares, comments**

Request

[code lang="javascript"]
POST /facebook_crawler/post/_search
{"aggs":{"sum_like":{"sum":{"field":"num_like"}},"min_like":{"min":{"field":"num_like"}},"avg_like":{"avg":{"field":"num_like"}},"max_like":{"max":{"field":"num_like"}},"sum_share":{"sum":{"field":"num_share"}},"min_share":{"min":{"field":"num_share"}},"avg_share":{"avg":{"field":"num_share"}},"max_share":{"max":{"field":"num_share"}},"sum_comment":{"sum":{"field":"num_comment"}},"min_comment":{"min":{"field":"num_comment"}},"avg_comment":{"avg":{"field":"num_comment"}},"max_comment":{"max":{"field":"num_comment"}}}}
[/code]

Request

[code lang="javascript"]
{
"aggregations": {
      "avg_comment": {
         "value": 75.23860589812332
      },
      "min_like": {
         "value": 0
      },
      "avg_like": {
         "value": 1761974365266098.2
      },
      "sum_like": {
         "value": 3238508883359088600
      },
      "max_share": {
         "value": 30407
      },
      "max_comment": {
         "value": 11000
      },
      "sum_share": {
         "value": 117844
      },
      "max_like": {
         "value": 2751488761761411000
      },
      "avg_share": {
         "value": 250.19957537154988
      },
      "sum_comment": {
         "value": 28064
      },
      "min_comment": {
         "value": 2
      },
      "min_share": {
         "value": 1
      }
   }
}
[/code]

### Cardinality Aggregation

[Cardinality Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html#search-aggregations-metrics-cardinality-aggregation)

**Get total of users**

Request

[code lang="javascript"]
POST /facebook_crawler/post/_search
{
    "aggs" : {
        "num_authors" : { "cardinality" : { "field" : "from.fb_id" } }
    }
}
[/code]

Response

[code lang="javascript"]
{
   "aggregations": {
      "num_authors": {
         "value": 7385
      }
   }
}
[/code]

### [Stats Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-stats-aggregation.html)

[Doc: Stats Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-stats-aggregation.html)

**Basic Stats of like, share & comment**

Request

[code lang="javascript"]
POST /facebook_crawler/post/_search
{
    "aggs" : {
        "shares" : { "stats" : { "field" : "num_share" } },
        "likes" : { "stats" : { "field" : "num_like" } },
        "comments" : { "stats" : { "field" : "num_comment" } }
    }
}
[/code]

Response

[code lang="javascript"]
{
   "aggregations": {
      "shares": {
         "count": 471,
         "min": 1,
         "max": 30407,
         "avg": 250.19957537154988,
         "sum": 117844
      },
      "comments": {
         "count": 373,
         "min": 2,
         "max": 11000,
         "avg": 75.23860589812332,
         "sum": 28064
      },
      "likes": {
         "count": 1838,
         "min": 0,
         "max": 2751488761761411000,
         "avg": 1761974365266098.2,
         "sum": 3238508883359088600
      }
   }
}
[/code]



### Extended Stats Aggregation

[Extended Stats Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-extendedstats-aggregation.html)

**Stats of like, share & comment with more metrics, such as sum, std_deviation, std_deviation_bounds, variance**


Request

[code lang="javascript"]
POST /facebook_crawler/post/_search
{
    "aggs" : {
        "like_stats" : { "extended_stats" : { "field" : "num_like" } },
        "share_stats" : { "extended_stats" : { "field" : "num_share" } },
        "comment_stats" : { "extended_stats" : { "field" : "num_comment" } }
    }
}
[/code]

Response

[code lang="javascript"]
{
   "aggregations": {
      "like_stats": {
         "count": 1838,
         "min": 0,
         "max": 2751488761761411000,
         "avg": 1761974365266098.2,
         "sum": 3238508883359088600,
         "sum_of_squares": 7.667542671405507e+36,
         "variance": 4.168572634260795e+33,
         "std_deviation": 64564484310345070,
         "std_deviation_bounds": {
            "upper": 130890942985956240,
            "lower": -127366994255424050
         }
      },
      "share_stats": {
         "count": 471,
         "min": 1,
         "max": 30407,
         "avg": 250.19957537154988,
         "sum": 117844,
         "sum_of_squares": 1769467022,
         "variance": 3694230.367812983,
         "std_deviation": 1922.0380765773043,
         "std_deviation_bounds": {
            "upper": 4094.2757285261587,
            "lower": -3593.8765777830586
         }
      },
      "comment_stats": {
         "count": 373,
         "min": 2,
         "max": 11000,
         "avg": 75.23860589812332,
         "sum": 28064,
         "sum_of_squares": 131531392,
         "variance": 346970.2299304962,
         "std_deviation": 589.0417896299856,
         "std_deviation_bounds": {
            "upper": 1253.3221851580945,
            "lower": -1102.844973361848
         }
      }
   }
}
[/code]


### Percentiles Aggregation

[Doc: Percentiles Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-aggregation.html)

**Comment, Like, Share Percentiles**

Request

[code lang="javascript"]
POST /facebook_crawler/post/_search
{"aggs":{"like_percentiles":{"percentiles":{"field":"num_like"}},"share_percentiles":{"percentiles":{"field":"num_share"}},"comment_percentiles":{"percentiles":{"field":"num_comment"}}}}
[/code]

Response

[code lang="javascript"]
{
"aggregations": {
      "like_percentiles": {
         "values": {
            "1.0": 0,
            "5.0": 0,
            "25.0": 4,
            "50.0": 18.35,
            "75.0": 72.53579545454545,
            "95.0": 71343.74999999999,
            "99.0": 4338260523723.276
         }
      },
      "comment_percentiles": {
         "values": {
            "1.0": 2,
            "5.0": 2,
            "25.0": 5,
            "50.0": 10,
            "75.0": 26,
            "95.0": 139.39999999999998,
            "99.0": 1000
         }
      },
      "share_percentiles": {
         "values": {
            "1.0": 1,
            "5.0": 1,
            "25.0": 1,
            "50.0": 4,
            "75.0": 25,
            "95.0": 251.5,
            "99.0": 5560.3
         }
      }
   }
}
[/code]


**Like Percentiles with custom percents**

Request

[code lang="javascript"]
POST /facebook_crawler/post/_search
{
   "aggs": {
      "share_percentiles": {
         "percentiles": {
            "field": "num_share",
            "percents": [0, 10, 80, 90, 95]
         }
      }
   }
}
[/code]


Response

[code lang="javascript"]
{
   "aggregations": {
      "share_percentiles": {
         "values": {
            "0.0": 1,
            "10.0": 1,
            "80.0": 37.33333333333333,
            "90.0": 97,
            "95.0": 251.5
         }
      }
   }
}
[/code]


### Percentile Ranks Aggregation

[Doc: Percentile Ranks Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-rank-aggregation.html)

**How like, share, comment distribute**

Request

[code lang="javascript"]
POST /facebook_crawler/post/_search
{
   "aggs": {
      "like_percentile_ranks": {
         "percentile_ranks": {
            "field": "num_like",
            "values": [10, 100, 1000, 10000, 1000000, 10000000]
         }
      },
      "share_percentile_ranks": {
         "percentile_ranks": {
            "field": "num_share",
            "values": [10, 100, 1000, 10000, 1000000, 10000000]
         }
      },
      "comment_percentile_ranks": {
         "percentile_ranks": {
            "field": "num_comment",
            "values": [10, 100, 1000, 10000, 1000000, 10000000]
         }
      }
   }
}
[/code]

Response

[code lang="javascript"]
{
   "aggregations": {
      "share_percentile_ranks": {
         "values": {
            "10.0": 60.438782731776364,
            "100.0": 89.91507430997878,
            "1000.0": 97.37406386327386,
            "10000.0": 99.31579836222765,
            "1000000.0": 100,
            "1.0E7": 100
         }
      },
      "like_percentile_ranks": {
         "values": {
            "10.0": 39.281828073993466,
            "100.0": 79.39530545624125,
            "1000.0": 90.98349676683587,
            "10000.0": 94.14527905373414,
            "1000000.0": 95.9014681663581,
            "1.0E7": 96.57661015941164
         }
      },
      "comment_percentile_ranks": {
         "values": {
            "10.0": 49.865951742627345,
            "100.0": 92.18395545473294,
            "1000.0": 98.92761394101876,
            "10000.0": 99.56773202397807,
            "1000000.0": 100,
            "1.0E7": 100
         }
      }
   }
}
[/code]

> As we can see, only 0.7% posts have more than 10k shares, onley 0.04% posts have more than 10k comment, but there is an odd here. 4.1% posts have more than 1M like (WHAT!!!). We can spot some strange here.

### Top hits Aggregation

[Doc: Top hits Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html)

**Example**

Request

[code lang="javascript"]
[/code]

Response

[code lang="javascript"]
{

[/code]


### An Aggregation

[Doc: Link](link)

**Example**

Request

[code lang="javascript"]
[/code]

Response

[code lang="javascript"]
{

[/code]

# Config

`elasticsearch.yml`

[code]
discovery.zen.minimum_master_nodes: 1
discovery.zen.ping.multicast.enabled: false
discovery.zen.ping.unicast.hosts: ["localhost"]

network.host: 0.0.0.0
http.cors.enabled: true
http.cors.allow-origin: '*'
script.inline: on
script.indexed: on
[/code]

# Docker

**Image**

[https://hub.docker.com/r/_/elasticsearch/](https://hub.docker.com/r/_/elasticsearch/)

**Run**

[code]
docker run -d -v "$PWD/esdata":/usr/share/elasticsearch/data elasticsearch
[/code]

Docker Folder
[code]
elasticsearch/
├── config
│   └── elasticsearch.yml
└── Dockerfile
[/code]

`Dockerfile`

[code]
FROM elasticsearch:2.2.0

ADD config/elasticsearch.yml /elasticsearch/config/elasticsearch.yml
[/code]

**Compose**

[code]
elasticsearch:
    build: ./elasticsearch/.
    ports:
       - 9200:9200
       - 9300:9300
    volumes:
       - ./data/elasticsearch:/usr/share/elasticsearch/data
[/code]

# Elasticsearch: Search Ignore Accents

The ICU [^1] [^2] analysis plug-in for Elasticsearch uses the International Components for Unicode (ICU) libraries to provide a rich set of tools for dealing with Unicode. These include the icu_tokenizer, which is particularly useful for Asian languages, and a number of token filters that are essential for correct matching and sorting in all languages other than English.


## Step 1: Install ICU-Plugin [^3]

[code]
cd /usr/share/elasticsearch
sudo bin/plugin install analysis-icu
[/code]

## Step 2: Create an analyzer setting:

[code]
"settings": {
      "analysis": {
         "analyzer": {
            "vnanalysis": {
               "tokenizer": "icu_tokenizer",
               "filter": [
                  "icu_folding",
                  "icu_normalizer"
               ]
            }
         }
      }
   }
[/code]

## Step 3: Create your index, create a field with type string and analyzer is `vnanalysis` you have created

[code]
"key": {
     "type": "string",
     "analyzer": "vnanalysis"
}
[/code]

## Step 4: Search with `sense`

[code]
POST /your_index/your_doc_type/_search
{
   "query": {
      "match": {
         "key": "kiem tra"
      }
   }
}
[/code]

[^1]: [ICU plug-in Introduction](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis.html)
[^2]: [ICU plug-in Github](https://github.com/elastic/elasticsearch-analysis-icu)
[^3]: [Installing the ICU plug-in](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-icu.html)

# ES: Import CSV to Elasticsearch

https://gist.github.com/clemsos/8668698

# Install lastest Elasticdump with NVM

As a matter of best practice we’ll update our packages:

[code]
apt-get update
[/code]

The build-essential package should already be installed, however, we’re going still going to include it in our command for installation:
[code]
apt-get install build-essential libssl-dev
[/code]

To install or update nvm, you can use the install script using cURL:

[code]
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
[/code]

if you have below problem or after you type `nvm ls-remote` command it result N/A:
`curl: (77) error setting certificate verify locations:
  CAfile: /etc/pki/tls/certs/ca-bundle.crt
  CApath: none`

head to this [^1]:

[^1]:[how to solve https problem](http://stackoverflow.com/questions/26476744/nvm-ls-remote-command-results-in-n-a)

or Wget:

[code]
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
[/code]

*Don't forget to restart your terminal*

Then you use the following command to list available versions of nodejs

[code]
nvm ls-remote
[/code]

To download, compile, and install the latest v5.0.x release of node, do this:

[code]
nvm install 5.0
[/code]

And then in any new shell just use the installed version:

[code]
nvm use 5.0
[/code]

Or you can just run it:

[code]
nvm run 5.0 --version
[/code]

Or, you can run any arbitrary command in a subshell with the desired version of node:

[code]
nvm exec 4.2 node --version
[/code]

You can also get the path to the executable to where it was installed:

[code]
nvm which 5.0
[/code]

[Node Version Manager](https://github.com/creationix/nvm)


