from __future__ import print_function, division
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt

num_epochs = 100
total_series_length = 6
truncated_backprop_length = 15
state_size = 4
num_classes = 2
echo_step = 3
batch_size = 2
num_batches = total_series_length//batch_size//truncated_backprop_length