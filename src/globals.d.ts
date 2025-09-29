// This will augment the existing Window interface
declare global {
  interface Window {
    messageHandler: any;  // Specify the type of messageHandler as `any` or the correct type
    safeAreaBottom: number;
    safeAreaTop:number
  }
}

export {}
