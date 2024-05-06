import React, { useEffect, useRef, useState } from 'react';

type Props = {
  inkId: string;
  selectedOption: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const GeneratorCanvas = ({ inkId, selectedOption, canvasRef}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loadImages = async () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas first
    
      const inkSrc = inkId ? `/assets/inks/${inkId}.webp` : null;
      const optionSrc = selectedOption ? `/assets/generator-assets/${selectedOption}` : null;
    
      // Load and draw the main character image without transformation
      if (inkSrc) {
        await drawImage(ctx, inkSrc, 0, 0, canvas.width, canvas.height);
      }
    
      // Load and draw the selected SVG with rotation and scaling
      if (optionSrc) {
        await drawImage(ctx, optionSrc, 0, 0, canvas.width / 3, canvas.height / 3, { rotate: -45, scale: 0.5 });
      }
    
      setIsLoaded(true);
    };

    loadImages();

    return () => ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clean up the canvas when the component unmounts or updates
  }, [inkId, selectedOption]);  // Depend on inkId and selectedOption to redraw when they change

  const drawImage = (ctx, src, dx, dy, dw, dh, options = {}) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        ctx.save();  // Save the current state of the canvas
        const canvas = canvasRef.current;  // Ensure canvas is correctly referenced from the ref
        if (!canvas) {
          reject(new Error("Canvas is not defined"));
          return;
        }
  
        // Calculate center position
        const cx = canvas.width / 12;
        const cy = canvas.height / 2;
  
        if (options.rotate || options.scale) {
          ctx.translate(cx, cy);  // Move the canvas context to center of the canvas
          ctx.rotate((options.rotate || 0) * Math.PI / 180);  // Rotate the context
          ctx.scale(options.scale || 1, options.scale || 1);  // Scale the context
          ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);  // Draw the image centered
        } else {
          ctx.drawImage(img, dx, dy, dw, dh);
        }
        ctx.restore();  // Restore the canvas state to what it was before the transformation
        resolve(undefined);
      };
      img.onerror = () => reject(new Error(`Failed to load image at ${src}`));
      img.src = src;
    });
  };
  

  return (
    <div className="w-full flex justify-center items-center" style={{ height: '50vh' }}>
      <canvas ref={canvasRef} width="400" height="400" />
    </div>
  );
};

export default GeneratorCanvas;
