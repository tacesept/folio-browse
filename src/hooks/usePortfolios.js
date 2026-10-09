import { useQuery } from "@tanstack/react-query";

const DATA_URL = import.meta.env.DEV
  ? "/feed.json"
  : "https://raw.githubusercontent.com/emmabostian/developer-portfolios/master/feed.json";

async function fetchPortfolios() {
  const response = await fetch(DATA_URL);
  if (!response.ok) throw new Error("Failed to load portfolios");

  const data = await response.json();

  return data
    .filter((item) => item.name && item.url)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function usePortfolios() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["portfolios"],
    queryFn: fetchPortfolios,
    staleTime: 1000 * 60 * 5, // Cache data securely for 5 minutes
  });

  return {
    portfolios: data,
    loading: isLoading,
    error: isError ? "Couldn't load portfolios." : "",
  };
}
