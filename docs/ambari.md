# Ambari

The Apache Ambari project is aimed at making Hadoop management simpler by developing software for provisioning, managing, and monitoring Apache Hadoop clusters. Ambari provides an intuitive, easy-to-use Hadoop management web UI backed by its RESTful APIs.

Ambari enables System Administrators to:

* Provision a Hadoop Cluster
    * Ambari provides a step-by-step wizard for installing Hadoop services across any number of hosts.
    * Ambari handles configuration of Hadoop services for the cluster.

* Manage a Hadoop Cluster
    * Ambari provides central management for starting, stopping, and reconfiguring Hadoop services across the entire cluster.

* Monitor a Hadoop Cluster
    * Ambari provides a dashboard for monitoring health and status of the Hadoop cluster.
    * Ambari leverages Ambari Metrics System for metrics collection.
    * Ambari leverages Ambari Alert Framework for system alerting and will notify you when your attention is needed (e.g., a node goes down, remaining disk space is low, etc).

Ambari enables Application Developers and System Integrators to:

* Easily integrate Hadoop provisioning, management, and monitoring capabilities to their own applications with the Ambari REST APIs.

# Docker

![](http://1s9ze3blueda-a.akamaihd.net/wp-content/uploads/2015/06/Ambari-logo-300x141.png)

Receipts:

* Image: [sequenceiq/ambari](https://hub.docker.com/r/sequenceiq/ambari/) ([git](https://github.com/sequenceiq/docker-ambari))

### Multinode cluster with Ambari 1.7.0 [^1]

Get the docker images

[code]
docker pull sequenceiq/ambari:1.7.0
[/code]


Get ambari-functions
[code]
curl -Lo .amb j.mp/docker-ambari-170 && . .amb
[/code]

Create your cluster – automated

[code]
amb-deploy-cluster 3
[/code]

[^1]: [Multinode cluster with Ambari 1.7.0](http://blog.sequenceiq.com/blog/2014/12/04/multinode-ambari-1-7-0/)