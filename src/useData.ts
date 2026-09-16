import { useEffect, useState } from "react";

interface Data<DataItem> {
  error: string | null;
  loading: boolean;
  data: DataItem | null;
}

export function useData<DataItem>(url: string) {
  const [data, setData] = useState<Data<DataItem[]>>({
    error: null,
    loading: true,
    data: null,
  });
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Fetch failed");
        }
        const json = await response.json();
        setData({
          ...data,
          loading: false,
          data: json,
        });
      } catch (error) {
        setData({
          ...data,
          error: getErrorMsg(error),
        });
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);
  return data;
}

export function getErrorMsg(error: unknown) {
  if (error instanceof Error) return error["message"];
  return String(error);
}
