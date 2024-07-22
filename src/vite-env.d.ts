/// <reference types="vite/client" />

declare module "view-ui-plus/*" {
  interface Locale {
    name: string;
    messages: Record<string, string>;
    [key: string]: unknown; // allow any custom properties
  }

  const locale: Locale;

  export default locale;
}
