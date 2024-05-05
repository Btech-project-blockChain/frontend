import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import convolve



x = plt.imread("/Users/drobot/Library/Mobile Documents/com~apple~CloudDocs/coding/frontend/finexo-html/images/bg9.jpg")

# flip_image = np.fliplr(x)
# plt.imsave("/Users/drobot/Library/Mobile Documents/com~apple~CloudDocs/coding/frontend/finexo-html/images/bg4_blur.png", flip_image)


def blurImage(img):
    def gaussian_kernel(size, sigma=1.0):
        """Generate a 2D Gaussian kernel."""
        kernel = np.fromfunction(
            lambda x, y: (1/(2*np.pi*sigma**2)) * np.exp(-((x-size//2)**2 + (y-size//2)**2)/(2*sigma**2)),
            (size, size)
        )
        return kernel / np.sum(kernel)  # Normalize the kernel to sum to 1

    def blur_image(img, kernel_size=30, sigma=5.0):
        """Blur the image using a Gaussian blur."""
        # Create Gaussian kernel
        kernel = gaussian_kernel(kernel_size, sigma)

        # Apply the convolution operation using scipy's convolve function
        blurred_img = np.zeros_like(img)
        for channel in range(img.shape[2]):  # Apply blur to each color channel
            blurred_img[:, :, channel] = convolve(img[:, :, channel], kernel, mode='constant')

        return blurred_img

    blurred_img = blur_image(img)

    # Save the blurred image
    plt.imsave('/Users/drobot/Library/Mobile Documents/com~apple~CloudDocs/coding/frontend/finexo-html/images/bg9_blur.png', blurred_img)

    print("Blurred image saved successfully.")

blurImage(x)