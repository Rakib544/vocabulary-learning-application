import { useState } from "react";

type MutationResult<T> = {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
  mutate: (payload: T) => Promise<void>; // Include the mutate function in the type
};

const useMutation = <T,>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationFunction: (payload: T) => Promise<any>
): MutationResult<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (payload: T) => {
    try {
      setIsLoading(true);
      setError(null);
      setData(null);

      const response = await mutationFunction(payload);

      setData(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, mutate };
};

export default useMutation;
