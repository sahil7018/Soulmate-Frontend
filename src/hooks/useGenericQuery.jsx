import { useQuery } from "@tanstack/react-query";

export const useGenericQuery = ({ queryKey, queryFn, config = {} }) => {
  return useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn,
    ...config,
  });
};
