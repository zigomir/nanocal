declare module '*.html' {
  export default {}
}

// TODO: define state shape
export interface SvelteComponent {
  get(property: string): void
  set(property: object): void
  fire(eventName: string, payload: object): void
}
