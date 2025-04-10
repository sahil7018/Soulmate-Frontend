export function getAverageLuminance(coverImage, sampleFactor = 10) {
    return new Promise((resolve, reject) => {
      // Create a new Image instance
      const img = new Image();
      // Set crossOrigin if your image is hosted on another domain
      img.crossOrigin = "Anonymous";
      img.src = coverImage;
      
      // Wait for the image to load
      img.onload = function() {
        // Create an offscreen canvas and set its dimensions to the image dimensions
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
    
        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);
    
        // Get image data from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        let totalLuminance = 0;
        let count = 0;
        
        // Sample pixels by skipping some based on the sampleFactor for performance.
        for (let i = 0; i < data.length; i += 4 * sampleFactor) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Calculate luminance using the standard formula
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          totalLuminance += luminance;
          count++;
        }
        console.log("totalLuminance: ", totalLuminance / count);
        
        resolve(totalLuminance / count);
      };
  
      img.onerror = function(error) {
        reject(error);
      };
    });
  }
  