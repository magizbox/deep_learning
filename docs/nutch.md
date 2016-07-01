# Nutch

<blockquote>
  <p>Highly extensible, highly scalable Web crawler <sup id="fnref-1382-1"><a href="#fn-1382-1" rel="footnote">1</a></sup> Nutch is a well matured, production ready Web crawler. Nutch 1.x enables fine grained configuration, relying on Apache Hadoop™ data structures, which are great for batch processing.</p>
</blockquote>

### History

<p><img src="http://image.slidesharecdn.com/jnioche-apachecon-2012-121107041657-phpapp01/95/large-scale-crawling-with-apache-nutch-5-638.jpg?cb=1353925333" alt="" /></p>

<h3>Usecases</h3>

<p><img src="http://image.slidesharecdn.com/jnioche-apachecon-2012-121107041657-phpapp01/95/large-scale-crawling-with-apache-nutch-11-638.jpg?cb=1353925333" alt="" /></p>

<h3>1&#46; Features <sup id="fnref-1382-1"><a href="#fn-1382-1" rel="footnote">1</a></sup> <img src="http://www.yuml.me/diagram/scruffy/usecase/(Transparency)-(Understanding),%20(Understanding)-(Extensibility).png" alt="" /></h3>

<p><strong>1&#46; Transparency</strong> Nutch is open source, so anyone can see how the ranking algorithms work. With commercial search engines, the precise details of the algorithms are secret so you can never know why a particular search result is ranked as it is. Furthermore, some search engines allow rankings to be based on payments, rather than on the relevance of the site's contents. Nutch is a good fit for academic and government organizations, where the perception of fairness of rankings may be more important.</p>

<p><strong>2&#46; Understanding</strong> We don't have the source code to Google, so Nutch is probably the best we have. It's interesting to see how a large search engine works. Nutch has been built using ideas from academia and industry: for instance, core parts of Nutch are currently being re-implemented to use the <a href="http://research.google.com/archive/mapreduce.html">MapReduce</a>.</p>

<p>Map Reduce distributed processing model, which emerged from Google Labs last year. And Nutch is attractive for researchers who want to try out new search algorithms, since it is so easy to extend.</p>

<p><strong>3&#46; Extensibility</strong> Don't like the way other search engines display their results? Write your own search engine--using Nutch! Nutch is very flexible: it can be customized and incorporated into your application. For developers, Nutch is a great platform for adding search to heterogeneous collections of information, and being able to customize the search interface, or extend the out-of-the-box functionality through the plugin mechanism. For example, you can integrate it into your site to add a search capability.</p>

<h3>2&#46; Architectures <sup id="fnref-1382-3"><a href="#fn-1382-3" rel="footnote">2</a></sup> <sup id="fnref-1382-4"><a href="#fn-1382-4" rel="footnote">3</a></sup></h3>

<p><img src="https://sites.google.com/site/nutch1936/_/rsrc/1427176500763/home/introduction/Nutch_Overview.png" alt="" /></p>

<h4>Data Structures <sup id="fnref-1382-2"><a href="#fn-1382-2" rel="footnote">4</a></sup></h4>

<p><strong>The web database</strong> is a specialized persistent data structure for mirroring the structure and properties of the web graph being crawled. It persists as long as the web graph that is being crawled (and re-crawled) exists, which may be months or years. The WebDB is used only by the crawler and does not play any role during searching. The WebDB stores two types of entities: pages and links.</p>

<p><code>A page</code> represents a page on the Web, and is indexed by its URL and the MD5 hash of its contents. Other pertinent information is stored, too, including</p>

<ul>
<li>the number of links in the page (also called outlinks);</li>
<li>fetch information (such as when the page is due to be refetched);</li>
<li>the page's score, which is a measure of how important the page is (for example, one measure of importance awards high scores to pages that are linked to from many other pages).</li>
</ul>

<p><code>A link</code> represents a link from one web page (the source) to another (the target). In the WebDB web graph, the nodes are pages and the edges are links.</p>

<p><strong>A segment</strong> is a collection of pages fetched and indexed by the crawler in a single run. The fetchlist for a segment is a list of URLs for the crawler to fetch, and is generated from the WebDB. The fetcher output is the data retrieved from the pages in the fetchlist. The fetcher output for the segment is indexed and the index is stored in the segment. Any given segment has a limited lifespan, since it is obsolete as soon as all of its pages have been re-crawled. The default re-fetch interval is 30 days, so it is usually a good idea to delete segments older than this, particularly as they take up so much disk space. Segments are named by the date and time they were created, so it's easy to tell how old they are.</p>

<p><strong>The index</strong> is the inverted index of all of the pages the system has retrieved, and is created by merging all of the individual segment indexes. Nutch uses Lucene for its indexing, so all of the Lucene tools and APIs are available to interact with the generated index. Since this has the potential to cause confusion, it is worth mentioning that the Lucene index format has a concept of segments, too, and these are different from Nutch segments. A Lucene segment is a portion of a Lucene index, whereas a Nutch segment is a fetched and indexed portion of the WebDB.</p>

<p><a href="https://github.com/apache/nutch/blob/branch-2.3/conf/gora-hbase-mapping.xml">View <code>gora-hbase-mapping.xml</code> for more details</a></p>

<h4>Process <sup id="fnref-1382-5"><a href="#fn-1382-5" rel="footnote">5</a></sup></h4>

<p><em>0&#46;</em> initialize CrawlDb, inject <code>seed</code> URLs Repeat <code>generate-fetch-update</code> cycle n times:</p>

<p><strong>1&#46;</strong> The <code>Injector</code> takes all the URLs of the nutch.txt file and adds them to the <code>CrawlDB</code>. As a central part of Nutch, the <code>CrawlDB</code> maintains information on all known URLs (fetch schedule, fetch status, metadata, …).</p>

<p><strong>2&#46;</strong> Based on the data of <code>CrawlDB</code>, the <code>Generator</code> creates a fetchlist and places it in a newly created <code>Segment directory</code>.</p>

<p><strong>3&#46;</strong> Next, the <code>Fetcher</code> gets the content of the URLs on the fetchlist and writes it back to the <code>Segment directory</code>. This step usually is the most time-consuming one.</p>

<p><strong>4&#46;</strong> Now the <code>Parser</code> processes the content of each web page and for example omits all html tags. If the crawl functions as an update or an extension to an already existing one (e.g. depth of 3), the <code>Updater</code> would add the new data to the <code>CrawlDB</code> as a next step.</p>

<p><strong>5&#46;</strong> Before indexing, all the links need to be inverted by <code>Link Inverter</code>, which takes into account that not the number of outgoing links of a web page is of interest, but rather the number of inbound links. This is quite similar to how Google PageRank works and is important for the scoring function. The inverted links are saved in the <code>Linkdb</code>.</p>

<p><strong>6-7.</strong> Using data from all possible sources (<code>CrawlDB</code>, <code>LinkDB</code> and <code>Segments</code>), the <code>Indexer</code> creates an index and saves it within the Solr directory. For indexing, the popular Lucene library is used. Now, the user can search for information regarding the crawled web pages via Solr.</p>

<h3>3&#46; Install Nutch <sup id="fnref-1382-6"><a href="#fn-1382-6" rel="footnote">6</a></sup></h3>

<h4>Requirements</h4>

<h4>Require</h4>

<p><strong>1&#46;</strong> OpenJDK 7 &amp; ant</p>

<p><strong>2&#46;</strong> Nutch 2.3 RC (yes, you need 2.3, 2.2 will not work)</p>

[code lang="shell"]
wget https://archive.apache.org/dist/nutch/2.3/apache-nutch-2.3-src.tar.gz
tar -xzf apache-nutch-2.3-src.tar.gz
[/code]

<p><strong>3&#46;</strong> HBase 0.94.27 (HBase 0.98 won't work)</p>

[code lang="shell"]
wget https://www.apache.org/dist/hbase/hbase-0.94.27/hbase-0.94.27.tar.gz
tar -xzf hbase-0.94.27.tar.gz
[/code]

<p><strong>4&#46;</strong> ElasticSearch 1.7</p>

[code lang="sh"]
wget https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.7.0.tar.gz
tar -xzf elasticsearch-1.7.0.tar.gz
[/code]

Other Options: `nutch-2.3`, `hbase-0.94.26`, `ElasticSearch 1.4`

<h4>Setup HBase</h4>

<p><em>1&#46;</em> edit <code>$HBASE_ROOT/conf/hbase-site.xml</code> and add</p>

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

<p><em>2&#46;</em> edit <code>$HBASE_ROOT/conf/hbase-env.sh</code> and enable <code>JAVA_HOME</code> and set it to the proper path:</p>

[code lang="diff"]
-# export JAVA_HOME=/usr/java/jdk1.6.0/ +export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64/
[/code]

<p>This step might seem redundant, but even with <code>JAVA_HOME</code> being set in my shell, HBase just didn't recognize it.</p>

<p><em>3&#46;</em> kick off HBase:</p>

<p><code>$HBASE_ROOT/bin/start-hbase.sh</code></p>

<h3>4&#46; Setting up Nutch</h3>

<p><em>1&#46;</em> enable the HBase dependency in</p>

<p><code>$NUTCH_ROOT/ivy/ivy.xml</code> by uncommenting the line</p>

<p><code>&lt;dependency org="org.apache.gora" name="gora-hbase" rev="0.5" conf="*-&gt;default" /&gt;</code></p>

<p><em>2&#46;</em> configure the HBase adapter by editing the <code>$NUTCH_ROOT/conf/gora.properties</code>:</p>

<p><code>-#gora.datastore.default=org.apache.gora.mock.store.MockDataStore +gora.datastore.default=org.apache.gora.hbase.store.HBaseStore</code></p>

<p><em>3&#46;</em> build Nutch</p>

<p><code>$ cd $NUTCH_ROOT $ ant clean $ ant runtime</code></p>

<p>This can take a while and creates <code>$NUTCH_ROOT/runtime/local</code>.</p>

<p><em>4&#46;</em> configure Nutch by editing <code>$NUTCH_ROOT/runtime/local/conf/nutch-site.xml</code>:</p>

<p>
[code lang="xml"]
<configuration>
    <property>
        <name>http.agent.name</name>
        <value>mycrawlername</value>
        <!-- this can be changed to something more sane if you like -->
    </property>
    <property>
        <name>http.robots.agents</name>
        <value>mycrawlername</value>
        <!-- this is the robot name we're looking for in robots.txt files -->
    </property>
    <property>
        <name>storage.data.store.class</name>
        <value>org.apache.gora.hbase.store.HBaseStore</value>
    </property>
    <property>
        <name>plugin.includes</name>
        <!-- do \*\*NOT\*\* enable the parse-html plugin, if you want proper HTML parsing. Use something like parse-tika! -->
        <value>
            protocol-httpclient|urlfilter-regex|parse-(text|tika|js)|index-(basic|anchor)|query-(basic|site|url)|response-(json|xml)|summary-basic|scoring-opic|urlnormalizer-(pass|regex|basic)|indexer-elastic
        </value>
    </property>
    <property>
        <name>db.ignore.external.links</name>
        <value>true</value>
        <!-- do not leave the seeded domains (optional) -->
    </property>
    <property>
        <name>elastic.host</name>
        <value>localhost</value>
        <!-- where is ElasticSearch listening -->
    </property>
</configuration>
[/code]

or you configure Nutch by editing <code>$NUTCH_ROOT/runtime/local/conf/nutch-site.xml</code>:</p>
[code lang="xml"]
<configuration>
    <property>
        <name>plugin.includes</name>
        <!-- do \*\*NOT\*\* enable the parse-html plugin, if you want proper HTML parsing. Use something like parse-tika! -->
        <value>
            protocol-http|protocol-httpclient|urlfilter-regex|
parse-(text|tika|js)|index-(basic|anchor)|query-(basic|site|url)|response-(json|xml)|
summary-basic|scoring-opic|urlnormalizer-(pass|regex|basic)|indexer-elastic|
index-metadata|index-more
        </value>
    </property>
    <property>
        <name>db.ignore.external.links</name>
        <value>true</value>
        <!-- do not leave the seeded domains (optional) -->
    </property>


<!-- elasticsearch index properties -->
<property>
  <name>elastic.host</name>
  <value>localhost</value>
  <description>The hostname to send documents to using TransportClient.
  Either host and port must be defined or cluster.
  </description>
</property>

<property>
  <name>elastic.port</name>
  <value>9300</value>
  <description>
  The port to connect to using TransportClient.
  </description>
</property>
<property>
  <name>elastic.index</name>
  <value>nutch</value>
  <description>
  The name of the elasticsearch index. Will normally be autocreated if it
  doesn't exist.
  </description>
</property>
<!-- end index -->
</configuration>
[/code]


<p><em>5&#46;</em> configure HBase integration by editing <code>$NUTCH_ROOT/runtime/local/conf/hbase-site.xml</code>:</p>

[code lang="xml"]
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
   <property>
      <name>hbase.rootdir</name>
      <value>file:///full/path/to/where/the/data/should/be/stored</value>
      <!-- same path as you've given for HBase above -->
   </property>
   <property>
      <name>hbase.cluster.distributed</name>
      <value>false</value>
   </property>
</configuration>
[/code]
or you configure HBase integration by editing <code>$NUTCH_ROOT/runtime/local/conf/hbase-site.xml</code>:</p>
[code lang="xml"]
<configuration>
  <property>
    <name>hbase.rootdir</name>
    <value>file:///$PATH/database</value>
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

<p>That's it. Everything is now setup to crawl websites.</p>

<h3>5&#46; Use Nutch</h3>

<h5>5&#46;1 Adding new Domains to crawl with Nutch</h5>

<ol>
<li>create an empty directory. Add a textfile containing a list of seed URLs. </li>
</ol>

[code lang="shell"]
$ mkdir seed $ echo "https://www.website.com" &gt;&gt; seed/urls.txt
$ echo "https://www.another.com" &gt;&gt; seed/urls.txt
$ echo "https://www.example.com" &gt;&gt; seed/urls.txt
[/code]

<ol>
<li>inject them into Nutch by giving a file URL (!) </li>
</ol>

<p><code>$ $NUTCH_ROOT/runtime/local/bin/nutch inject file:///path/to/seed/ [/code]</code></p>

<h5>5&#46;2 Actual Crawling Procedure</h5>

<ol>
<li>Generate a new set of URLs to fetch. This is is based on both the injected URLs as well as outdated URLs in the Nutch crawl db.</li>
</ol>

<p><code>$ $NUTCH_ROOT/runtime/local/bin/nutch generate -topN 10</code></p>

<p>The above command will create job batches for 10 URLs. 2. Fetch the URLs. We are not clustering, so we can simply fetch all batches:</p></p>

<p><code>$ $NUTCH_ROOT/runtime/local/bin/nutch fetch -all</code></p>

<ol>
<li>Now we parse all fetched pages:</li>
</ol>

<p><code>$ $NUTCH_ROOT/runtime/local/bin/nutch parse -all</code></p>

<ol>
<li>Last step: Update Nutch's internal database: </li>
</ol>

<p><code>$ $NUTCH_ROOT/runtime/local/bin/nutch updatedb -all</code></p>

<p>On the first run, this will only crawl the injected URLs. The procedure above is supposed to be repeated regulargy to keep the index up to date.</p>

<h5>5&#46;3 Putting Documents into ElasticSearch Easy peasy:</h5>

<p><code>$ $NUTCH_ROOT/runtime/local/bin/nutch index -all</code></p>

<h5>5&#46;4 Configuration</h5>

<p><strong>Crawl nutch via proxy</strong></p>

<p>Change <code>$NUTCH_ROOT/runtime/local/conf/nutch-site.xml</code></p>

[code lang="xml"]
<configuration>
    <property>
        <name>http.proxy.host</name>
        <value>192.168.80.1</value>
        <description>The proxy hostname. If empty, no proxy is used.</description>
    </property>
    <property>
        <name>http.proxy.port</name>
        <value>port</value>
        <description>The proxy port.</description>
    </property>
    <property>
        <name>http.proxy.username</name>
        <value>username</value>
        <description>Username for proxy. This will be used by 'protocol-httpclient', if the proxy server requests basic,
            digest
            and/or NTLM authentication. To use this, 'protocol-httpclient' must be present in the value of
            'plugin.includes'
            property. NOTE: For NTLM authentication, do not prefix the username with the domain, i.e. 'susam' is correct
            whereas
            'DOMAINsusam' is incorrect.
        </description>
    </property>
    <property>
        <name>http.proxy.password</name>
        <value>password</value>
        <description>Password for proxy. This will be used by 'protocol-httpclient', if the proxy server requests basic,
            digest
            and/or NTLM authentication. To use this, 'protocol-httpclient' must be present in the value of
            'plugin.includes'
            property.
        </description>
    </property>
</configuration>
[/code]

<h3>6&#46; Nutch Plugins <sup id="fnref-1382-7"><a href="#fn-1382-7" rel="footnote">7</a></sup></h3>

#### 6.1 Extension Points

In writing a plugin, you're actually providing one or more extensions of the existing extension-points . The core Nutch extension-points are themselves defined in a plugin, the NutchExtensionPoints plugin (they are listed in the NutchExtensionPoints plugin.xml file). Each extension-point defines an interface that must be implemented by the extension. The core extension points are:

<table>
  <tr>
    <td>
      Point
    </td>

    <td>
      Description
    </td>

    <td>
      Example
    </td>
  </tr>

  <tr>
    <td>
      IndexWriter
    </td>

    <td>
      Writes crawled data to a specific indexing backends (Solr, ElasticSearch, a CVS file, etc.).
    </td>

    <td>
    </td>
  </tr>

  <tr>
    <td>
      IndexingFilter
    </td>

    <td>
      Permits one to add metadata to the indexed fields. All plugins found which implement this extension point are run sequentially on the parse (from javadoc).
    </td>

    <td>
    </td>
  </tr>

  <tr>
    <td>
      Parser
    </td>

    <td>
      Parser implementations read through fetched documents in order to extract data to be indexed. This is what you need to implement if you want Nutch to be able to parse a new type of content, or extract more data from currently parseable content.
    </td>

    <td>
    </td>
  </tr>

  <tr>
    <td>
      HtmlParseFilter
    </td>

    <td>
      Permits one to add additional metadata to HTML parses (from javadoc).
    </td>

    <td>
    </td>
  </tr>

  <tr>
    <td>
      Protocol
    </td>

    <td>
      Protocol implementations allow Nutch to use different protocols (ftp, http, etc.) to fetch documents.
    </td>

    <td>
    </td>
  </tr>

  <tr>
    <td>
      URLFilter
    </td>

    <td>
      URLFilter implementations limit the URLs that Nutch attempts to fetch. The RegexURLFilter distributed with Nutch provides a great deal of control over what URLs Nutch crawls, however if you have very complicated rules about what URLs you want to crawl, you can write your own implementation.
    </td>

    <td>
    </td>
  </tr>

  <tr>
    <td>
      URLNormalizer
    </td>

    <td>
      Interface used to convert URLs to normal form and optionally perform substitutions.
    </td>

    <td>
    </td>
  </tr>

  <tr>
    <td>
      ScoringFilter
    </td>

    <td>
      A contract defining behavior of scoring plugins. A scoring filter will manipulate scoring variables in CrawlDatum and in resulting search indexes. Filters can be chained in a specific order, to provide multi-stage scoring adjustments.
    </td>

    <td>
    </td>
  </tr>

  <tr>
    <td>
      SegmentMergeFilter
    </td>

    <td>
      Interface used to filter segments during segment merge. It allows filtering on more sophisticated criteria than just URLs. In particular it allows filtering based on metadata collected while parsing page.
    </td>

    <td>
    </td>
  </tr>
</table>

<h4>6&#46;2 Getting Nutch to Use a Plugin <sup id="fnref2:1382-7"><a href="#fn-1382-7" rel="footnote">7</a></sup></h4>

<p>In order to get Nutch to use a given plugin, you need to edit your conf/nutch-site.xml file and add the name of the plugin to the list of plugin.includes. Additionally we are required to add the various build configurations to build.xml in the plugin directory.</p>

#### 6.3 Project structure of a plugin

[code lang="text"]
plugin-name
plugin.xml # file that tells Nutch about the plugin. build.xml # file that tells ant how to build the plugin. ivy.xml # file that describes any dependencies required by the plugin. src org apache nutch indexer uml-meta # source folder URLMetaIndexingFilter.java scoring uml-meta # source folder URLMetaScoringFilter.java test org apache nutch indexer uml-meta # test folder URLMetaIndexingFilterTest.java scoring uml-meta # test folder URLMetaScoringFilterTest.java
[/code]

<p><li id="fn-1382-1">
  <a href="http://nutch.apache.org/">http://nutch.apache.org/</a> <a href="#fnref-1382-1" rev="footnote">↩</a>
</li>
<li id="fn-1382-3">
  <a href="https://sites.google.com/site/nutch1936/home/introduction">https://sites.google.com/site/nutch1936/home/introduction</a> <a href="#fnref-1382-3" rev="footnote">↩</a>
</li>
<li id="fn-1382-4">
  <a href="http://events.linuxfoundation.org/sites/events/files/slides/aceu2014-snagel-web-crawling-nutch.pdf">Web Crawling with Apache Nutch</a> <a href="#fnref-1382-4" rev="footnote">↩</a>
</li>
<li id="fn-1382-2">
  <a href="https://today.java.net/pub/a/today/2006/01/10/introduction-to-nutch-1.html">Introduction to Nutch, Part 1: Crawling</a> <a href="#fnref-1382-2" rev="footnote">↩</a>
</li>
<li id="fn-1382-5">
  <a href="http://florianhartl.com/nutch-how-it-works.html">Nutch – How It Works</a> <a href="#fnref-1382-5" rev="footnote">↩</a>
</li>
<li id="fn-1382-6">
  <a href="https://gist.github.com/xrstf/b48a970098a8e76943b9">Nutch 2.3 + ElasticSearch 1.7 + HBase 0.94 Setup</a> <a href="#fnref-1382-6" rev="footnote">↩</a>
</li>
<li id="fn-1382-7">
  <a href="https://wiki.apache.org/nutch/AboutPlugins">AboutPlugins</a> <a href="#fnref-1382-7" rev="footnote">↩</a> <a href="1382-7" rev="footnote">↩</a> </fn></footnotes></p></p></p></p></p></p></p></p></p></p></p></p></p></p>

# Config nutch run intellij

### Copy file
[code]
 copy all the files in the runtime/conf on out/test/apache-Nutch-2.3 and out/production/apache-Nutch-2.3
[/code]

### add these lines to file `$NUTCH_SRC/out/test/nutch-site.xml`
[code]
<property>
   <name>plugin.folders</name>
   <value><nutch_src>/build/plugins</value>
 </property>
[/code]

### Run nutch in intellij
[code]
Run->Edit Configurations...->add path agrs:path to file list links crawler
[/code]

# Crawler

Conferences

Web Search and Data Mining

Challenge

Static Crawler

- [Apache Nutch](http://magizbox.com/index.php/apache-nutch/)

Dynamic Crawler

- [nutch-selenium](https://github.com/momer/nutch-selenium)

Intelligent Extractor

- [boilerpipe](https://code.google.com/p/boilerpipe/)
- [Web Content Extraction Through Machine Learning](http://cs229.stanford.edu/proj2013/ZhouMashuq-WebContentExtractionThroughMachineLearning.pdf)

Priority Crawler

Social Crawler

# A New Approach to Dynamic Crawler

Build a crawler system for dynamic websites is not easy task. While you can use a web browser automator (like [`selenium`](http://www.seleniumhq.org/)), or event when you can integrate selenium with nutch (by using [`nutch-selenium`](https://github.com/momer/nutch-selenium)). These solutions are still hard to develop, hard to test and hard to manage sessions because we still "translate" our process to languages (such as java or python)

I suppose a new approach for this problem. Instead of using a  web browser automator, we can inject native javascript codes into browser (via extension or add-on).The advantages of this approach is we can easily inject third party libraries (like `jquery` (for dom selector), `Run.js` (for complicated process) and APIs that supported by browsers). And we can take advance of debugging tool and testing framework in javascript world.

If you want to know about more details, feel free to [contact me](http://magizbox.com/team/anhv/).

# Dev Nutch in Intellij

Receipts: `IntellIJ 14`, `Apache Nutch 2.3`

**1.** Get Nutch source

[code lang="shell"]
wget http://www.eu.apache.org/dist/nutch/2.3/apache-nutch-2.3-src.tar.gz
tar -xzf apache-nutch-2.3-src.tar.gz
[/code]

**2.** Import Nutch source in IntellIJ

[wonderplugin_slider id="1"]

<div style="clear:both; height:80px;"></div>

**3.** Get Dependencies by Ant

[wonderplugin_slider id="3"]

<div style="clear:both; height:80px;"></div>

**4.** Import Dependencies to IntellIJ

[wonderplugin_slider id="4"]

<div style="clear:both; height:80px;"></div>

# Nutch Dev

1.Intasll java in ubuntu

-Downloads java version .zip
[code lang="xml"]
 http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html
[/code]

-Create folder jvm
[code lang="xml"]
 sudo mkdir /usr/lib/jvm/
[/code]

-Cd to folder downloads java version .zip
[code lang="xml"]
 sudo mv jdk1.7.0_x/ /usr/lib/jvm/jdk1.7.0_x
[/code]

-Run command line
[code lang="xml"]
  sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk1.7.0_x/jre/bin/java 0
[/code]

-Tets version java
[code lang="xml"]
  java -version
[/code]

2.Intasll ant in ubuntu

-Downloads ant
[code lang="xml"]
http://ant.apache.org/manualdownload.cgi
[/code]

-Add path ant vao file environment
[code lang="xml"]
 sudo nano /etc/environment
 $ANT_ROOT/bin
[/code]

-Run command line
[code lang="xml"]
source /etc/environment
ant -version
[/code]

3.Intasll hbase in ubuntu

-Downloads and extract hbase 0.94.27
[code lang="xml"]
  https://archive.apache.org/dist/hbase/hbase-0.94.27/
[/code]

-Edit file $HABSE_ROOT/conf/hbase-site.xml
[code lang="xml"]
 <configuration>
  <property>
    <name>hbase.rootdir</name>
    <value>file:///$PATH_DATA_BASE/database</value>
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

-Edit file $HBASE_ROOT/conf/hbase-env.sh
[code lang="xml"]
  export JAVA_HOME=$PATH_JAVA_HOME
[/code]

-Edit file $HBASE_ROOT/conf/regionservers
[code lang="xml"]
hbase.io.nutch
[/code]

-Edit file hosts in ubuntu
[code lang="xml"]
  sudo nano /etc/hosts
  {ip} hbase.io.nutch
[/code]

-Edit file hostname in ubuntu
[code lang="xml"]
 sudo nano /etc/hostname
 hbase.io.nutch
[/code]

-Run and stop hbase in ubuntu
[code]
 Run hbase : cd $HBASE_ROOT/bin ./start-hbase.sh
 Stop hbase: cd $HBASE_ROOT/bin ./stop-hbase.sh
[/code]

*Error in intasll hbase
[code lang="xml"]
- Error regionserver localhost(Edit file hosts and file host name)
- Error client no remote server intasll hbase(Turn off file firewall)
[/code]

4.Build nutch in ant

-Downloads and extract nutch
[code lang="xml"]
  http://nutch.apache.org/
[/code]

-Edit file $NUTCH_ROOT/ivy/ivy.xml
[code lang="xml"]
 <dependency org="org.apache.gora" name="gora-hbase" rev="0.5"
conf="*->default" />
[/code]

-Edit file $NUTCH_ROOT/ivy/ivysettings.xml
[code lang="xml"]
 #<property name="repo.maven.org"
 #   value="http://repo1.maven.org/maven2/"
 #  override="false"/>

<property name = "repo.maven.org"
   value = "http://maven.oschina.net/content/groups/public/"
   override = "false" />
[/code]

-Edit file $NUTCH_ROOT/conf/nutch-site.xml
[code lang="xml"]
<configuration>
<property>
   <name>plugin.folders</name>
   <value>$NUTCH_ROOT/build/plugins</value>
 </property>
<property>
        <name>http.agent.name</name>
        <value>mycrawlername</value>
        <!-- this can be changed to something more sane if you like -->
    </property>
    <property>
        <name>http.robots.agents</name>
        <value>mycrawlername</value>
        <!-- this is the robot name we're looking for in robots.txt files -->
    </property>
    <property>
        <name>storage.data.store.class</name>
        <value>org.apache.gora.hbase.store.HBaseStore</value>
    </property>
    <property>
        <name>plugin.includes</name>
        <!-- do \*\*NOT\*\* enable the parse-html plugin, if you want proper HTML parsing. Use something like parse-tika! -->
        <value>
            protocol-http|protocol-httpclient|urlfilter-regex|parse-(text|tika|js)|index-(basic|anchor)|query-(basic|site|url)|response-(json|xml)|summary-basic|scoring-opic|urlnormalizer-(pass|regex|basic)|indexer-elastic|index-metadata|index-more
        </value>
    </property>
    <property>
        <name>db.ignore.external.links</name>
        <value>true</value>
        <!-- do not leave the seeded domains (optional) -->
    </property>


<!-- elasticsearch index properties -->
<property>
  <name>elastic.host</name>
  <value>localhost</value>
  <description>The hostname to send documents to using TransportClient.
  Either host and port must be defined or cluster.
  </description>
</property>

<property>
  <name>elastic.port</name>
  <value>9300</value>
  <description>
  The port to connect to using TransportClient.
  </description>
</property>
<property>
  <name>elastic.index</name>
  <value>nutch</value>
  <description>
  The name of the elasticsearch index. Will normally be autocreated if it
  doesn't exist.
  </description>
</property>
<!-- end index -->

<property>
        <name>http.proxy.host</name>
        <value>192.168.80.1</value>
    </property>
    <property>
        <name>http.proxy.port</name>
        <value>8080</value>
    </property>
    <property>
        <name>http.proxy.username</name>
        <value>user1</value>
    </property>
    <property>
        <name>http.proxy.password</name>
        <value>user1</value>
    </property>
</configuration>
[/code]

-Edit file file $NUTCH_ROOT/conf/gora.property
[code lang="xml"]
 gora.datastore.default=org.apache.gora.hbase.store.HBaseStore
[/code]

-Build nucth
[code lang="xml"]
 ant runtime
 or
 ant eclipse -verbose
[/code]

-Cread file links

-Runn nutch
[code lang="xml"]
 cd $NUTCH_ROOT/runtime/local/bin
 run inject : ./nutch inject file:///$PATH_LIKNS
 run generate : ./nutch generate -topN 10
 run fetch : ./nutch fetch -all
 run parse : ./nutch parse -all
 run updatedb : ./nutch updatedb -all
[/code]

-Downloads and extract elastic
[code lang="xml"]
 https://www.elastic.co/downloads/elasticsearch
[/code]

-Run elastic
[code lang="xml"]
cd $ELASTIC/bin
./elasticsearch
[/code]

-Index data in elastic
[code lang="xml"]
 cd $NUTCH_ROOT/runtime/bin
 run index : ./nutch index -all
[/code]

5.Run nutch intellij





Change `$NUTCH_ROOT/runtime/local/conf/hbase-site.xml`
[code lang="xml"]
<configuration>
<property>
<name>hbase.rootdir</name>
<value>file:///home/hainv/Downloads/crawler/data</value>
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

# Nutch plugin intellij

### 1.Structure nutch :<a href="https://fossies.org/dox/apache-nutch-2.3-src/classorg_1_1apache_1_1nutch_1_1parse_1_1html_1_1DOMBuilder.html">[1]</a>

### 2.Run nutch intellij
 Downloads nucth2.3:<a href ="http://nutch.apache.org/downloads.html">http://nutch.apache.org/downloads.html</a>
 Editing file $NUTCH_ROOT/ivy/ivysettings.xml
[code lang="xml"]
<ivysettings>
  <property name="oss.sonatype.org"
    value="http://oss.sonatype.org/content/repositories/releases/"
    override="false"/>
  <property name = "repo.maven.org"
      value = "http://maven.oschina.net/content/groups/public/"
      override = "false" />
  <property name="repository.apache.org"
    value="https://repository.apache.org/content/repositories/snapshots/"
    override="false"/>
  <property name="maven2.pattern"
    value="[organisation]/[module]/[revision]/[module]-[revision]"/>
  <property name="maven2.pattern.ext"
    value="${maven2.pattern}.[ext]"/>
  <!-- pull in the local repository -->
  <include url="${ivy.default.conf.dir}/ivyconf-local.xml"/>
  <settings defaultResolver="default"/>
  <resolvers>
    <ibiblio name="maven2"
      root="${repo.maven.org}"
      pattern="${maven2.pattern.ext}"
      m2compatible="true"
      />
    <ibiblio name="apache-snapshot"
      root="${repository.apache.org}"
      changingPattern=".*-SNAPSHOT"
      m2compatible="true"
      />
    <ibiblio name="restlet"
      root="http://maven.restlet.org"
      pattern="${maven2.pattern.ext}"
      m2compatible="true"
      />
     <ibiblio name="sonatype"
      root="${oss.sonatype.org}"
      pattern="${maven2.pattern.ext}"
      m2compatible="true"
      />

    <chain name="default" dual="true">
      <resolver ref="local"/>
      <resolver ref="maven2"/>
      <resolver ref="sonatype"/>
      <resolver ref="apache-snapshot"/>
    </chain>
    <chain name="internal">
      <resolver ref="local"/>
    </chain>
    <chain name="external">
      <resolver ref="maven2"/>
      <resolver ref="sonatype"/>
    </chain>
    <chain name="external-and-snapshots">
      <resolver ref="maven2"/>
      <resolver ref="apache-snapshot"/>
      <resolver ref="sonatype"/>
    </chain>
    <chain name="restletchain">
      <resolver ref="restlet"/>
    </chain>
  </resolvers>
  <modules>
    <module organisation="org.apache.nutch" name=".*" resolver="internal"/>
    <module organisation="org.restlet" name=".*" resolver="restletchain"/>
    <module organisation="org.restlet.jse" name=".*" resolver="restletchain"/>
  </modules>
</ivysettings>
[/code]

Editing file $NUTCH_ROOT/ivy/ivy.xml
[code lang="xml"]
<dependency org="org.apache.gora" name="gora-hbase" rev="0.5" conf="*->default" />
[/code]

Editing file $NUCTH_ROOT/conf/gora.properties
[code lang="xml"]
gora.datastore.default=org.apache.gora.hbase.store.HBaseStore
[/code]

Editing file $NUTCH_ROOT/conf/nutch_site.xml
[code lang="xml"]
<configuration>
<property>
   <name>plugin.folders</name>
   <value>$NUTCH_ROOT/build/plugins</value>
 </property>
<property>
        <name>http.agent.name</name>
        <value>mycrawlername</value>
        <!-- this can be changed to something more sane if you like -->
    </property>
    <property>
        <name>http.robots.agents</name>
        <value>mycrawlername</value>
        <!-- this is the robot name we're looking for in robots.txt files -->
    </property>
    <property>
        <name>storage.data.store.class</name>
        <value>org.apache.gora.hbase.store.HBaseStore</value>
    </property>
    <property>
        <name>plugin.includes</name>
        <!-- do \*\*NOT\*\* enable the parse-html plugin, if you want proper HTML parsing. Use something like parse-tika! -->
        <value>
            protocol-httpclient|urlfilter-regex|parse-(text|tika|js)|index-(basic|anchor)|query-(basic|site|url)|response-(json|xml)|summary-basic|scoring-opic|urlnormalizer-(pass|regex|basic)|indexer-elastic
        </value>
    </property>
    <property>
        <name>db.ignore.external.links</name>
        <value>true</value>
        <!-- do not leave the seeded domains (optional) -->
    </property>
    <property>
        <name>elastic.host</name>
        <value>localhost</value>
        <!-- where is ElasticSearch listening -->
    </property>

<property>
        <name>http.proxy.host</name>
        <value>192.168.80.1</value>
        <description>The proxy hostname. If empty, no proxy is used.</description>
    </property>
    <property>
        <name>http.proxy.port</name>
        <value>8080</value>
        <description>The proxy port.</description>
    </property>
    <property>
        <name>http.proxy.username</name>
        <value>user1</value>
        <description>Username for proxy. This will be used by 'protocol-httpclient', if the proxy server requests basic,
            digest
            and/or NTLM authentication. To use this, 'protocol-httpclient' must be present in the value of
            'plugin.includes'
            property. NOTE: For NTLM authentication, do not prefix the username with the domain, i.e. 'susam' is correct
            whereas
            'DOMAINsusam' is incorrect.
        </description>
    </property>
    <property>
        <name>http.proxy.password</name>
        <value>user1</value>
        <description>Password for proxy. This will be used by 'protocol-httpclient', if the proxy server requests basic,
            digest
            and/or NTLM authentication. To use this, 'protocol-httpclient' must be present in the value of
            'plugin.includes'
            property.
        </description>
    </property>
</configuration>
[/code]

Editing file $NUCTH_ROOT/conf/hbase-site.xml
[code lang="xml"]
<configuration>
	<property>
		<name>hbase.rootdir</name>
		<value>file:///home/rombk/Downloads/database</value>
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

Run terminal
[code lang="xml"]
 ant eclipse -verbose
[/code]

Import nucth intellij
[code lang="xml"]

[/code]

### 3.Run plugin creativecommons
Sample plugins that parse and index Creative Commons medadata.<a href="https://nutch.apache.org/apidocs/apidocs-1.7/org/creativecommons/nutch/package-summary.html">1</a>
Step 1. Create folder creativecommons in path `$NUTCH_HOME/out/test/`

Step 2. Create file `nutch-site.xml` in folder `$NUTCH_HOME/out/test/creativecommons`  and add content

[code lang="xml"]
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<!-- Put site-specific property overrides in this file. -->
<configuration>
<property>
   <name>plugin.folders</name>
   <value>$NUTCH_HOME/build/plugins</value>
 </property>
<property>
   <name>http.agent.name</name>
   <value>mycrawlername</value>
<!-- this can be changed to something more sane if you like -->
</property>
<property>
   <name>http.robots.agents</name>
   <value>mycrawlername</value>
<!-- this is the robot name we're looking for in robots.txt files -->
</property>
<property>
   <name>storage.data.store.class</name>
   <value>org.apache.gora.hbase.store.HBaseStore</value>
</property>
<property>
   <name>plugin.includes</name>
  <!-- do \*\*NOT\*\* enable the parse-html plugin, if you want proper HTML parsing. Use something like parse-tika! -->
  <value>indexer-elastic|creativecommons|parse-html</value>
</property>
<property>
   <name>db.ignore.external.links</name>
   <value>true</value>
<!-- do not leave the seeded domains (optional) -->
</property>
<property>
   <name>elastic.host</name>
   <value>localhost</value>
<!-- where is ElasticSearch listening -->
</property>
<!-- config proxy-->
<property>
   <name>http.proxy.host</name>
   <value><hosts></value>
   <description>The proxy hostname. If empty, no proxy is used.</description>
</property>
<property>
   <name>http.proxy.port</name>
   <value><port></value>
   <description>The proxy port.</description>
</property>
<property>
   <name>http.proxy.username</name>
   <value><user1></value>
   <description>Username for proxy. This will be used by 'protocol-httpclient', if the proxy server requests basic,
digest
and/or NTLM authentication. To use this, 'protocol-httpclient' must be present in the value of
'plugin.includes'
property. NOTE: For NTLM authentication, do not prefix the username with the domain, i.e. 'susam' is correct
whereas
'DOMAINsusam' is incorrect.
     </description>
</property>
<property>
   <name>http.proxy.password</name>
   <value><user1></value>
   <description>Password for proxy. This will be used by 'protocol-httpclient', if the proxy server requests basic,
digest
and/or NTLM authentication. To use this, 'protocol-httpclient' must be present in the value of
'plugin.includes'
property.
    </description>
</property>
</configuration>
[/code]

### 2.Run plugin feed
Plugin feed parsing of rss
Error : Parsing of RSS feeds fails (tejasp) <a href = "https://issues.apache.org/jira/browse/NUTCH-1053"> [2] </a> and read file $NUTCH_ROOT/CHANFES.txt

# Nutch Plugins

http://florianhartl.com/nutch-plugin-tutorial.html

# Web Scrapping

[What are some good free web scrapers / scraping techniques?](https://www.quora.com/What-are-some-good-free-web-scrapers-scraping-techniques)

Import.io | Web Data Platform & Free Web Scraping Tool is a very useful tool and very easy to use. Import can operate in “Magic” mode where you point it at a URL and it slices and dices the content to produce a table automatically. The "Magic Api" page also provides options for re-running the query and downloading the results in JSON or tab-separated variable format.

[commoncrawl](http://commoncrawl.org/)

[Feed Aggregators]

[API]
