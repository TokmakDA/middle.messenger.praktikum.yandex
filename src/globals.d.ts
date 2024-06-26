/// <reference types="vite/client" />

declare module '*?raw' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module 'vite-plugin-handlebars';
declare module 'handlebars-layouts';
declare module 'vite-plugin-sass';
