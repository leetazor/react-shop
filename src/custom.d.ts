// Declaring a Global Type for SVGs, so they can be imported as React Components
// need to add   "include": ["src", "src/custom.d.ts"] to tsconfig.json
declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const scr: string;
  export default scr;  
}