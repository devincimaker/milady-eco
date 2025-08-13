"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

type MarketCap = Record<string, number>;
interface NftCollection {
  id?: string;
  name?: string;
  market_cap?: MarketCap;
  [k: string]: any;
}

const API_BASE = "https://api.coingecko.com/api/v3";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

export function useCoingeckoData(collectionId: string) {
  const [data, setData] = useState<NftCollection | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<NftCollection>(
        `${API_BASE}/nfts/${collectionId}`,
        {
          headers: {
            Accept: "application/json",
            ...(PUBLIC_KEY ? { "x-cg-demo-api-key": PUBLIC_KEY } : {}),
          },
          timeout: 10000,
        }
      );
      setData(data);
    } catch (err: any) {
      const status = err?.response?.status ?? err?.code ?? "ERR";
      const message = err?.response?.data ?? err?.message ?? "Unknown error";
      setError(
        `${status}: ${
          typeof message === "string" ? message : JSON.stringify(message)
        }`
      );
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mcapUsd = useMemo(() => data?.market_cap?.usd ?? null, [data]);

  return {
    data,
    mcapUsd,
    loading,
    error,
    refetch: fetchData,
  };
}
