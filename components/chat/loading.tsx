import React from "react";

// Custom CSS for the glare animation
// This is embedded directly in the component for simplicity,
// but in a larger application, you might put this in a global CSS file.
const customGlareaAnimation = `
  @keyframes glare {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .animate-glare {
    background: linear-gradient(to right,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 20%, /* More subtle white */
      rgba(255, 255, 255) 50%,  /* More subtle white */
      rgba(255, 255, 255, 0.1) 80%, /* More subtle white */
      transparent 100%
    );
    background-size: 200% 100%;
    animation: glare 4s infinite linear; /* Changed to 4 seconds for slower animation */
  }
`;

// Assuming 'loading' is a prop or state variable that determines if the component should show loading state
export const LoadingComponent = () => {
  // Default to true for demonstration

  return (
    <div className="w-full h-full flex flex-col font-inter text-gray-400">
      {" "}
      {/* Adjusted overall background and text color */}
      {/* Inject the custom CSS directly into the component */}
      <style dangerouslySetInnerHTML={{ __html: customGlareaAnimation }} />
      {/* Header section with pulse animation - adjusted colors */}
      <div className="h-14 p-3 gap-3 border-b  flex items-center justify-center">
        <div className="h-10 rounded-full aspect-square bg-accent/50 animate-pulse" />{" "}
        {/* Grayish pulse */}
        <div className="h-10 flex-grow bg-accent/50 animate-pulse" />{" "}
        {/* Grayish pulse */}
      </div>
      {/* Main content area with glare animation */}
      <div className="flex-grow w-full relative overflow-hidden bg-accent/50">
        {" "}
        {/* Main background is already dark gray */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* The actual glare animation element */}
          <div className="absolute inset-0 animate-glare" />
          {/* Removed the "Loading..." text */}
        </div>
      </div>
      {/* Footer section with pulse animation - adjusted colors */}
      <div className="h-14 w-full px-3 py-2 border-t ">
        <div className="h-10 bg-accent/50 w-full animate-pulse rounded-md"></div>{" "}
        {/* Grayish pulse */}
      </div>
    </div>
  );
};

export default LoadingComponent;
