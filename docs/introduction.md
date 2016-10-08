### Modern Practical Deep Networks

* Feedforward Deep Networks
* Regularization
* Optimization for Training Deep Models
* Convolutional Networks
* Sequence Modeling: Recurrent and Recursive Nets
* Applications

### Deep Learning Research

* Structured Probabilistic Models for Deep Learning
* Monte Carlo Methods
* Linear Factor Models and Auto-Encoders
* Representation Learning
* The Manifold Perspective on Representation Learning
* Confronting the Partition Function
* Approximate Inference
* Deep Generative Models

### Slide

* Andrew Ng, Deep Learning, http://www.slideshare.net/mobile/ExtractConf/andrew-ng-chief-scientist-at-baidu

Compare Deep Learning Framework

https://github.com/zer0n/deepframeworks/blob/master/README.md


# Papers

[Awesome Deep Learning Papers](https://github.com/terryum/awesome-deep-learning-papers)

# Deep Learning Q&A

Deep Learning Q&A [^1]

1. What is an auto-encoder? Why do we "auto-encode"? Hint: it's really a misnomer.
2. What is a Boltzmann Machine? Why a Boltzmann Machine?
3. Why do we use sigmoid for an output function? Why tanh? Why not cosine? Why any function in particular?
4. Why are CNNs used primarily in imaging and not so much other tasks?
5. Explain backpropagation. Seriously. To the target audience described above.
6. Is it OK to connect from a Layer 4 output back to a Layer 2 input?
7. A data-scientist person recently put up a YouTube video explaining that the essential difference between a Neural Network and a Deep Learning network is that the former is trained from output back to input, while the latter is trained from input toward output. Do you agree? Explain.

8. Can you derive the back-propagation and weights update?
9. Extend the above question to non-trivial layers such as convolutional layers, pooling layers, etc.
10. How to implement dropout
11. Your intuition when and why some tricks such as max pooling, ReLU, maxout, etc. work. There are no right answers but it helps to understand your thoughts and research experience.
12. Can youabstract the forward, backward, update operations as matrix operations, to leverage BLAS and GPU?

[^1]: https://www.quora.com/What-are-the-toughest-neural-networks-and-deep-learning-interview-questions

# Intro to Deep Learning

<img class=" aligncenter" src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/34/a4bf10352d11e4ae1bdd88b9e8f59b/large-icon.png" alt="" />

<h3>What is deep learning?</h3>

According to wikipedia <sup id="fnref-781-1"><a href="#fn-781-1" rel="footnote">1</a></sup>

<blockquote><strong>Deep learning</strong>  is a branch of machine learning based on a set of algorithms that <strong>attempt to model high-level abstractions</strong> in data by <em>using model architectures</em>, with <em>complex structures</em> or otherwise, <em>composed of multiple non-linear transformations.</em>

Deep learning is part of a broader family of machine learning methods based on <strong>learning representations</strong> of data.

An observation (e.g., an image) can be represented in many ways such as a vector of intensity values per pixel, or in a more abstract way as a set of edges, regions of particular shape, etc.. Some representations make it easier to learn tasks (e.g., face recognition or facial expression recognition) from examples.

One of the promises of deep learning is replacing <em>handcrafted features</em> with efficient algorithms for unsupervised or semi-supervised feature learning and hierarchical feature extraction.</blockquote>

<h3>Traditional Model vs Deep Learning</h3>

In <em>traditional models</em>, we must extract features by hand, after that we train these features with some classifiers

<img class="alignnone" src="https://lh3.googleusercontent.com/-2EOuB2hL-w7rctwo-bPZKfm_r6_QmHxYM3KvhKx9Oq4=w969-h400-no" alt="" />

With <em>deep learning</em>, we can learn representation of objects as well as its classifiers.

<img class="alignnone" src="https://lh3.googleusercontent.com/-aHhQ9VC-XHfbiLFql0oWt02mibCHGkyPUPlhod8ZQYi=w827-h400-no" alt="" />

Hierarchy of representations with increasing level of abstraction. Each stage is a kind of trainable feature transform.

<strong>Image recognition</strong>

pixel &gt; edge &gt; texton &gt; motif &gt; part &gt; object

<strong>Text</strong>

character &gt; word &gt; word group &gt; clause &gt; sentence &gt; story

<strong>Speech</strong>

sample &gt; spectral band &gt; sound &gt; ... &gt; phone &gt; phoneme &gt; word

<h3>Demos and Applications</h3>

Yann Lecun with ImageNetOnline Learning Demo in his deep learning class <sup id="fnref-781-2"><a href="#fn-781-2" rel="footnote">2</a></sup>. This program auto learn new object when he pointed camera to it

<img class=" aligncenter" src="https://lh3.googleusercontent.com/BZ2dcxpylU8j3sE4RdQh-IJFoAJ54aEOYUJlsKD-nP0Y=w508-h400-no" alt="" width="508" height="400" />

Voice recognition systems like Apple Siri, Google Now and Windows Cortana all use deep learning <sup id="fnref-781-3"><a href="#fn-781-3" rel="footnote">3</a></sup>

<img class="alignnone" src="https://lh3.googleusercontent.com/9dy9t3Bj5hQiQLDT3kmTaMjB569GFmL09Tk77dR2j8h0=w1000-h575-no" alt="" width="1000" height="575" />

Facebook's DeepFace Software Can Match Faces With 97.25% Accuracy <sup id="fnref-781-4"><a href="#fn-781-4" rel="footnote">4</a></sup>

<img class="alignnone" src="http://blogs-images.forbes.com/amitchowdhry/files/2014/03/DeepFace.jpg" alt="" />

<h3>Useful Resources</h3>

<ul>
<li>Introduction about Deep Learning, http://colah.github.io/</li>
</ul>

<div class="footnotes">
<hr />
<ol>

<li id="fn-781-1">
 <a href="https://en.wikipedia.org/wiki/Deep_learning" target="_blank">Deep Learning, wikipedia</a>&#160;<a href="#fnref-781-1" rev="footnote">&#8617;</a>
</li>

<li id="fn-781-2">
<a href="http://cilvr.cs.nyu.edu/doku.php?id=deeplearning:slides:start#week_1" target="_blank">Deep Learning Course of Yann Lecu, Week 1</a>&#160;<a href="#fnref-781-2" rev="footnote">&#8617;</a>
</li>

<li id="fn-781-3">
<a href="http://www.forbes.com/sites/roberthof/2013/05/01/meet-the-guy-who-helped-google-beat-apples-siri/" target="_blank">Meet The Guy Who Helped Google Beat Apple's Siri</a>&#160;<a href="#fnref-781-3" rev="footnote">&#8617;</a>
</li>

<li id="fn-781-4">
 <a href="http://www.forbes.com/sites/amitchowdhry/2014/03/18/facebooks-deepface-software-can-match-faces-with-97-25-accuracy/" target="_blank">Facebook's DeepFace Software Can Match Faces With 97.25% Accuracy</a>&#160;<a href="#fnref-781-4" rev="footnote">&#8617;</a>
</li>

</ol>
</div>

# TensorFlow

![](https://api.tensorflow.org/system/image/body/238/tensors_flowing.gif)

TensorFlow™ [^2] is an open source software library for numerical computation using data flow graphs. Nodes in the graph represent mathematical operations, while the graph edges represent the multidimensional data arrays (tensors) communicated between them. The flexible architecture allows you to deploy computation to one or more CPUs or GPUs in a desktop, server, or mobile device with a single API. TensorFlow was originally developed by researchers and engineers working on the Google Brain Team within Google's Machine Intelligence research organization for the purposes of conducting machine learning and deep neural networks research, but the system is general enough to be applicable in a wide variety of other domains as well.

### Getting Started

[Linux](http://tensorflow.org/get_started/os_setup.md#), [Mac](http://tensorflow.org/get_started/os_setup.md#), [Windows](http://stackoverflow.com/questions/33616094/tensorflow-is-it-or-will-it-sometime-soon-be-compatible-with-a-windows-work)

Windows [^1]

[code lang="shell"]
docker-machine ssh default
docker run -it b.gcr.io/tensorflow/tensorflow
[/code]

### Resources

* TensorFlow Explained by Jeff Dean ([video](https://youtu.be/90-S1M7Ny_o?t=1267))

[^1]: [Docker: Tensorflow returning error](http://stackoverflow.com/questions/33621547/docker-tensorflow-returning-error)
[^2]: [tensorflow](http://tensorflow.org/)

# Architectures

According to Yann Lecun <sup id="fnref-777-2"><a href="#fn-777-2" rel="footnote">1</a></sup>, there are three types of deep architectures: feed-forward, feed-back and bi-directional.

<h3>Feed-Forwards</h3>

<h4>Multilayer Neural Nets <sup id="fnref-777-5"><a href="#fn-777-5" rel="footnote">2</a></sup></h4>

A multilayer perceptron (MLP) is a feedforward artificial neural network model that maps sets of input data onto a set of appropriate outputs. A MLP consists of multiple layers of nodes in a directed graph, with each layer fully connected to the next one. Except for the input nodes, each node is a neuron (or processing element) with a nonlinear activation function.

<img class="alignnone" src="http://technobium.com/wordpress/wp-content/uploads/2015/04/MultiLayerNeuralNetwork.png" alt="" width="904" height="356" />

task: any supervised learning pattern recognition process

<h4>Convolutional Neural Nets <sup id="fnref-777-1"><a href="#fn-777-1" rel="footnote">3</a></sup></h4>

In machine learning, a convolutional neural network (CNN, or ConvNet) is a type of feed-forward artificial neural network where the individual neurons are tiled in such a way that they respond to overlapping regions in the visual field.Convolutional networks were inspired by biological processes and are variations of multilayer perceptrons which are designed to use minimal amounts of preprocessing. They are widely used models for image and video recognition.

<img class="alignnone" src="http://www.codeproject.com/KB/recipes/523074/p1.png" alt="" />

task: Computer Vision

<h3>Feed-Back</h3>

<h4>Stacked sparse coding</h4>

<h4>Deconvolutional nets</h4>

<h3>Bi-Directional</h3>

<h4>Recurrent neural network <sup id="fnref-777-4"><a href="#fn-777-4" rel="footnote">4</a></sup></h4>

A recurrent neural network (RNN) is a class of artificial neural network where connections between units form a directed cycle. This creates an internal state of the network which allows it to exhibit dynamic temporal behavior.

<img class="alignnone" src="http://image.slidesharecdn.com/23jan15cvapvissemdl-150123131205-conversion-gate01/95/visualsemantic-embeddings-some-thoughts-on-language-43-638.jpg?cb=1422040501" alt="" />

Task: <a href="http://deeplearning.net/tutorial/rnnslu.html#recurrent-neural-network-model" target="_blank">Word Embeddings</a>

<h4>Deep Boltzmann Network</h4>

<img class="alignnone" src="http://www.sigvc.org/bbs/data/attachment/forum/201309/22/1127350hf2ycc2re000ehg.jpg" alt="" />

<h4>Stacked auto-encoders <sup id="fnref-777-3"><a href="#fn-777-3" rel="footnote">5</a></sup></h4>

<img class="alignnone" src="http://ufldl.stanford.edu/wiki/images/5/5c/Stacked_Combined.png" alt="" width="915" height="794" />

<div class="footnotes">
<hr />
<ol>

<li id="fn-777-2">
<a href="http://www.slideshare.net/yandex/yann-le-cun" target="_blank">http://www.slideshare.net/yandex/yann-le-cun</a>&#160;<a href="#fnref-777-2" rev="footnote">&#8617;</a>
</li>

<li id="fn-777-5">
https://en.wikipedia.org/wiki/Multilayer_perceptron&#160;<a href="#fnref-777-5" rev="footnote">&#8617;</a>
</li>

<li id="fn-777-1">
 <a href="https://en.wikipedia.org/wiki/Convolutional_neural_network" target="_blank">https://en.wikipedia.org/wiki/Convolutional_neural_network</a>&#160;<a href="#fnref-777-1" rev="footnote">&#8617;</a>
</li>

<li id="fn-777-4">
<a href="https://en.wikipedia.org/wiki/Recurrent_neural_network" target="_blank">Recurrent neural network</a>&#160;<a href="#fnref-777-4" rev="footnote">&#8617;</a>
</li>

<li id="fn-777-3">
<a href="http://ufldl.stanford.edu/wiki/index.php/Stacked_Autoencoders" target="_blank">http://ufldl.stanford.edu/wiki/index.php/Stacked_Autoencoders</a>&#160;<a href="#fnref-777-3" rev="footnote">&#8617;</a>
</li>

</ol>
</div>

## Deep Reinforcement Learning

[David Silver (Google DeepMind) - Deep Reinforcement Learning](https://www.youtube.com/watch?v=ppOIy0okmW0)

## Recurrent Neural Networks

A recurrent neural network (RNN) is a class of artificial neural network where connections between units form a directed cycle. This creates an internal state of the network which allows it to exhibit dynamic temporal behavior. Unlike feedforward neural networks, RNNs can use their internal memory to process arbitrary sequences of inputs. This makes them applicable to tasks such as unsegmented connected handwriting recognition or speech recognition

### 1. Applications [^1]

#### 1.1 Sequence-to-sequence language translation [^2]

![](http://image.slidesharecdn.com/generalsequencelearningwithrecurrentneuralnetworksfornextml-150217161745-conversion-gate01/95/general-sequence-learning-using-recurrent-neural-networks-15-638.jpg?cb=1430750838)

#### 1.2 Generate image caption

![](http://www.dataversity.net/wp-content/uploads/2014/11/google.jpg)

#### 1.3 Translate videos to sentences

![](https://lh3.googleusercontent.com/grb8wISPmQOWdakd9ezrgraYHKY0UCLGW1bzL_mXj8wNhTcTvrt6=w852-h278-no)

### 2. Challenges

* [Bag of Words Meets Bags of Popcorn](https://www.kaggle.com/c/word2vec-nlp-tutorial)

### 3. Tutorials

* [Anyone Can Learn To Code an LSTM-RNN in Python (Part 1: RNN)](http://iamtrask.github.io/2015/11/15/anyone-can-code-lstm/)
* [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/)

### 4. Library

* [neuraltalk2](https://github.com/karpathy/neuraltalk2) <small>(realtime demo)[https://vimeo.com/146492001]</small>

[^1]: [Recurrent Neural Network](https://s3.amazonaws.com/piazza-resources/i48o74a0lqu0/i6ys94c8na8i2/RNN.pdf?AWSAccessKeyId=AKIAJKOQYKAYOBKKVTKQ&Expires=1447755970&Signature=vjfU8ucY6%2Fi2cBZWE1B1Jsb3sPE%3D)
[^2]: [General Sequence Learning using Recurrent Neural Networks](http://www.slideshare.net/indicods/general-sequence-learning-with-recurrent-neural-networks-for-next-ml)
