interface Ethereum {
  request: (request: { method: string }) => Promise<any>;
  on: (event: string, callback: (value: any) => void) => void;
  // Добавьте другие свойства и методы, если это необходимо
}

interface CustomEthereum extends Ethereum {
  selectedAddress: string | null;
  chainId: string | null;
}

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}

// Экспорт пустого объекта позволяет TypeScript принять этот файл как модуль
export {};