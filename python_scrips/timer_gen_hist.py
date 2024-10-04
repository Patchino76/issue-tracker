import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import mpld3
import time

# Set the timer interval (in seconds)
interval = 3

while True:
    # Generate random data
    data = np.random.randn(100)

    # Create a figure and axis
    fig, ax = plt.subplots()

    # Generate the histogram
    sns.histplot(ax=ax, data=data, bins=30)

    # Save the figure as an HTML file using mpld3
    html = mpld3.fig_to_html(fig)
    with open('public/images/chart.html', 'w') as f:
        f.write(html)

    # Close the figure to free up resources
    plt.close(fig)

    # Wait for the timer interval
    time.sleep(interval)