import numpy as np
import time
import matplotlib.pyplot as plt
import seaborn as sns
import mpld3

# Initialize the array with 100 random values
arr = np.random.rand(100)

while True:
    fig, ax = plt.subplots()
    new_values = np.random.rand(1)  # adjust the number of new values as needed
    arr = np.append(arr, new_values)
    
    # Remove the oldest values to maintain a length of 100
    arr = arr[-100:]
    
    plt.plot(np.arange(len(arr)), arr, color="skyblue")
    plt.fill_between(np.arange(len(arr)), arr, 0, color="skyblue", alpha=0.3)
    plt.title("Array Values Over Time")
    plt.xlabel("Index")
    plt.ylabel("Value")
    plt.ylim(0, 1)
    
    html = mpld3.fig_to_html(fig)
    with open('public/images/chart.html', 'w') as f:
        f.write(html)
    plt.close()
    
    # Wait for 1 second before updating again
    time.sleep(1)