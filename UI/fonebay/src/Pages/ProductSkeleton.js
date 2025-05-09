import React from "react";
import ContentLoader from "react-content-loader";

const ProductSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {/* Image Placeholder */}
    <rect x="10" y="10" rx="10" ry="10" width="380" height="200" />
    {/* Text Placeholders */}
    <rect x="10" y="220" rx="5" ry="5" width="300" height="20" />
    <rect x="10" y="250" rx="5" ry="5" width="200" height="15" />
    <rect x="10" y="280" rx="5" ry="5" width="250" height="15" />
    <rect x="10" y="310" rx="5" ry="5" width="180" height="15" />
  </ContentLoader>
);

export default ProductSkeleton;
