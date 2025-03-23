
export interface Company {
  id: number;
  name: string;
  stockTicker: string;
  exchange: string;
  isin: string;
  website?: string | null;
}
