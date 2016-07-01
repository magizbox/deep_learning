# HBase

<blockquote>
  Apache HBase™ is the Hadoop database, a distributed, scalable, big data store.  Download Apache HBase™  Click here to download Apache HBase™.
</blockquote>

<img src="http://hbase.apache.org/images/jumping-orca_rotated_25percent.png" alt="" />

<h3>1. When Would I Use Apache HBase? <sup id="fnref-1577-2"><a href="#fn-1577-2" rel="footnote">1</a></sup></h3>

HBase isn’t suitable for every problem.

First, make sure you have enough data. If you have hundreds of millions or billions of rows, then HBase is a good candidate. If you only have a few thousand/million rows, then using a traditional RDBMS might be a better choice due to the fact that all of your data might wind up on a single node (or two) and the rest of the cluster may be sitting idle.

Second, make sure you can live without all the extra features that an RDBMS provides (e.g., typed columns, secondary indexes, transactions, advanced query languages, etc.) An application built against an RDBMS cannot be "ported" to HBase by simply changing a JDBC driver, for example. Consider moving from an RDBMS to HBase as a complete redesign as opposed to a port.

Third, make sure you have enough hardware. Even HDFS doesn’t do well with anything less than 5 DataNodes (due to things such as HDFS block replication which has a default of 3), plus a NameNode.

HBase can run quite well stand-alone on a laptop - but this should be considered a development configuration only.

<h3>2. Features <sup id="fnref-1577-1"><a href="#fn-1577-1" rel="footnote">2</a></sup></h3>

<ul>
<li>Linear and modular scalability.</li>
<li>Strictly consistent reads and writes.</li>
<li>Automatic and configurable sharding of tables</li>
<li>Automatic failover support between RegionServers.</li>
<li>Convenient base classes for backing Hadoop MapReduce jobs with Apache HBase tables.</li>
<li>Easy to use Java API for client access.</li>
<li>Block cache and Bloom Filters for real-time queries.</li>
<li>Query predicate push down via server side Filters</li>
<li>Thrift gateway and a REST-ful Web service that supports XML, Protobuf, and binary data encoding options</li>
<li>Extensible jruby-based (JIRB) shell</li>
<li>Support for exporting metrics via the Hadoop metrics subsystem to files or Ganglia; or via JMX</li>
</ul>

<h3>3. Architecture</h3>

<img src="http://image.slidesharecdn.com/tokyo-nosql-slides-only-101102130551-phpapp02/95/apache-hadoop-and-hbase-39-638.jpg?cb=1422651141" alt="" />

<h3>HBase Shell</h3>

[code lang="shell"]
# list all table
list
[/code]

<h3>Up &amp; Running</h3>

<h4>1. Download </h4>

HBase 0.94.27 (HBase 0.98 won't work)

[code lang="shell"]
wget https://www.apache.org/dist/hbase/hbase-0.94.27/hbase-0.94.27.tar.gz
tar -xzf hbase-0.94.27.tar.gz
[/code]

<h4>2. Setup </h4>

<em>1.</em> edit <code>$HBASE_ROOT/conf/hbase-site.xml</code> and add

[code lang="xml"]
<configuration>
  <property>
    <name>hbase.rootdir</name>
    <value>file:///full/path/to/where/the/data/should/be/stored</value>
  </property>
  <property>
    <name>hbase.cluster.distributed</name>
    <value>false</value>
  </property>
</configuration>
[/code]

<h4>3. Verify </h4>

Go to <code>http://localhost:60010</code> to see if HBase is running.

<div class="footnotes">
<hr />
<ol>

<li id="fn-1577-2">
<a href="http://hbase.apache.org/book.html#arch.overview">When Should I Use HBase?</a>&#160;<a href="#fnref-1577-2" rev="footnote">&#8617;</a>
</li>

<li id="fn-1577-1">
<a href="http://hbase.apache.org/">HBase</a>&#160;<a href="#fnref-1577-1" rev="footnote">&#8617;</a>
</li>

</ol>
</div>

# Config HBase Remote

### 1. Change `/etc/hosts`

[code]
127.0.0.1 [username]
[server_ip] hbase.io
[/code]

Example

[code]
127.0.0.1 crawler
192.168.0.151 hbase.io
[/code]

### 2. Change hostname

[code]
hostname hbase.io
[/code]

### 3. Change region servers

Edit `$HBASE_ROOT/conf/regionservers`

[code]
hbase.io
[/code]

### 4. Change `$HABSE_ROOT/conf/hbase-site.xml`

[code lang="xml" title="hbase-site.xml"]
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
<property>
<name>hbase.rootdir</name>
<value>file:///home/username/Downloads/hbase/data</value>
</property>
<property>
<name>hbase.cluster.distributed</name>
<value>false</value>
</property>
<property>
<name>hbase.zookeeper.quorum</name>
<value>hbase.io</value>
</property>
<property>
<name>zookeeper.znode.parent</name>
<value>/hbase-unsecure</value>
</property>
<property>
<name>hbase.rpc.timeout</name>
<value>2592000000</value>
</property>
</configuration>
[/code]

# Docker

HBase 0.94

Image: https://github.com/Banno/docker-hbase-standalone

[code]
docker run -d -p 2181:2181 -p 60000:60000 -p 60010:60010 -p 60020:60020 -p 60030:60030 banno/hbase-standalone
[/code]

Compose

[code]
hbase.vmware:
    build: ./docker-hbase-standalone/.
    command: "/opt/hbase/hbase-0.94.15-cdh4.7.0/bin/hbase master start"
    hostname: hbase.vmware
    ports:
      - 2181:2181
      - 60000:60000
      - 60010:60010
      - 60020:60020
      - 60030:60030
    volumes:
      - ./docker-hbase-standalone/hbase-0.94.15-cdh4.7.0:/opt/hbase/hbase-0.94.15-cdh4.7.0
      - ./data/hbase:/tmp/hbase-root/hbase
/code]
