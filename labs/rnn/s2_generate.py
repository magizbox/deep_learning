import numpy as np
from s1_setup import total_series_length, echo_step, batch_size


def generateData():
    x = np.array(np.random.choice(2, total_series_length, p=[0.5, 0.5]))
    y = np.roll(x, echo_step)
    y[0:echo_step] = 0

    x = x.reshape((batch_size, -1))  # The first index changing slowest, subseries as rows
    y = y.reshape((batch_size, -1))

    return (x, y)


if __name__ == '__main__':
    x, y = generateData()
    print(0)
