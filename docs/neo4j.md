# Neo4J

<img src="http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/05/1400324777logo.png" alt="" />

<blockquote>
  Neo4j is an <strong>open-source graph database</strong>, implemented in Java. The developers describe Neo4j as "embedded, disk-based, fully transactional Java persistence engine that stores data structured in graphs rather than in tables". Neo4j is the most popular graph database.
</blockquote>

<h4>Python Client</h4>

<strong><a href="http://py2neo.org/2.0/">py2neo</a></strong>

[code language="python"]
# connect to graph
authenticate(&quot;localhost:7474&quot;, &quot;neo4j&quot;, &quot;passwd&quot;)
graph = Graph(&quot;http://localhost:7474/db/data/&quot;)

# create unique
graph.schema.create_uniqueness_constraint('Person', 'name')

# add nodes
graph.create(Node.cast('Person', {&quot;name&quot;: &quot;Alice&quot;}))
graph.create(Node.cast('Person', {&quot;name&quot;: &quot;Bob&quot;}))

# add relationship
source = graph.merge_one(&quot;Person&quot;, &quot;name&quot;, &quot;Alice&quot;)
target graph.merge_one(&quot;Person&quot;, &quot;name&quot;, &quot;Bob&quot;)
graph.create_unique(Relationship(source, &quot;FRIEND&quot;, target))

# update property
alice = graph.merge_one(&quot;Person&quot;, &quot;name&quot;, &quot;Alice&quot;)
alice[&quot;age&quot;] = 30
alice.push()
[/code]

<strong>Graph Algorithms</strong>

<code>shortestPath</code>, <code>dijkstra</code>

[code lang="text"]
POST http://localhost:7474/db/data/node/72/paths

Headers
Accept: application/json
Authorization: Basic bmVvNGo6cGFzc3dk

Body
{
  &quot;to&quot; : &quot;http://localhost:7474/db/data/node/77&quot;,
  &quot;max_depth&quot; : 5,
  &quot;relationships&quot; : {
    &quot;type&quot; : &quot;FRIEND&quot;,
    &quot;direction&quot; : &quot;out&quot;
  },
  &quot;algorithm&quot; : &quot;shortestPath&quot;
}
[/code]

<strong>Graph Analystic</strong>

<code>pagerank</code>, <code>closeness_centrality</code>, <code>betweenness_centrality</code>, <code>triangle_count</code>,
<code>connected_components</code>, <code>strongly_connected_components</code>

<img src="https://datayo.files.wordpress.com/2015/08/docker.png" alt="" /> <a href="https://hub.docker.com/r/kbastani/docker-neo4j/">kbastani/docker-neo4j</a>

<blockquote>
  docker run -d -p 7474:7474 -v /Users//path/to/neo4j/data:/opt/data --name graphdb kbastani/docker-neo4j
</blockquote>

<img src="https://datayo.files.wordpress.com/2015/08/docker.png" alt="" /> <a href="https://hub.docker.com/r/kbastani/neo4j-graph-analytics/">kbastani/neo4j-graph-analytics/</a>

<h3>References</h3>

<a href="http://db-engines.com/en/ranking/graph+dbms"><strong>#1</strong> from DB-Engines Ranking of Graph DBMS</a>

http://www.kennybastani.com/2014/11/using-apache-spark-and-neo4j-for-big.html

<code>Big Data Stack</code>: <a href="https://datayo.wordpress.com/2015/08/31/hadoop-distributed-file-system-hdfs/"><code>HDFS</code></a>, <a href="https://datayo.wordpress.com/2015/08/31/kibana/"><code>Kibana</code></a>, <a href="https://datayo.wordpress.com/2015/08/31/elastic-search/"><code>ElasticSearch</code></a>, <a href="https://datayo.wordpress.com/2015/08/31/neo4j/"><strong>Neo4J</strong></a>, <a href="https://datayo.wordpress.com/2015/08/25/spark/"><code>Apache Spark</code></a>

# Neo4j Quick Notes

### Schema Discovery

List all nodes label, list all relation type

[code]
> START n=node(*) RETURN distinct labels(n)

> match n-[r]-() return distinct type(r)
[/code]

**UI Way**: Click to Overtab in Neo4j Browser

### Sample 10 entities

[code]
> MATCH (n:Entity) RETURN n, rand() as random ORDER BY random LIMIT 10
[/code]

### Group By

http://www.markhneedham.com/blog/2013/02/17/neo4jcypher-sql-style-group-by-functionality/

# Neo4J: Docker

[https://hub.docker.com/r/library/neo4j/](https://hub.docker.com/r/library/neo4j/)

[code]
docker run \
    --detach \
    --publish=7474:7474 \
    --volume=$HOME/neo4j/data:/data \
    neo4j
[/code]

Dockerfile
[code]
FROM neo4j:2.3.1
[/code]

Compose

[code]
  neo4j:
    build: ./neo4j/.
    ports:
       - 7474:7474
    volumes:
       - ./data/neo4j:/data
    environment:
       - NEO4J_AUTH=neo4j/root
[/code]

