import matplotlib.pyplot as plt
import mpld3

# Create a sample plot
fig, ax = plt.subplots()
ax.plot([1, 2, 3, 4], [10, 20, 25, 30])
ax.set_title('Sample Chart')

# Convert the plot to HTML
html_str = mpld3.fig_to_html(fig)

# Save the HTML to a file
with open("public/images/chart.html", "w") as f:
    f.write(html_str)
