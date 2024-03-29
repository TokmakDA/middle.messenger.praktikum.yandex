/// <reference types="vite/client" />

declare module '*?raw' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'handlebars-layouts';
