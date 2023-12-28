import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getBike,
  getBikes,
  getBikesStats,
  createBike as createBikeApi,
  updateBike as updateBikeApi,
  deleteBike as deleteBikeApi,
} from "../../services/apiBikes";

export function useBikes() {
  const {
    isLoading,
    data: bikes,
    error,
  } = useQuery({
    queryKey: ["bikes"],
    queryFn: getBikes,
    onError: (err) => {
      alert(err.message);
    },
  });
  return { isLoading, error, bikes };
}

export function useBikesStats() {
  const {
    isLoading,
    data: bikesStats,
    error,
  } = useQuery({
    queryKey: ["bikesStats"],
    queryFn: getBikesStats,
    onError: (err) => {
      alert(err.message);
    },
    retry: false,
  });
  return { isLoading, error, bikesStats };
}

export function useOne(id) {
  const {
    isLoading,
    data: bike,
    error,
  } = useQuery({
    queryKey: ["bike", id],
    queryFn: () => getBike(id),
    onError: (err) => {
      alert(err.message);
    },
  });
  return { isLoading, error, data: bike };
}

export function useCreateBike() {
  const queryClient = useQueryClient();

  const { mutate: createBike, isLoading: isCreating } = useMutation({
    mutationFn: createBikeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      alert("Bike created successfully");
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  return { isCreating, createBike };
}

export function useUpdateBike() {
  const queryClient = useQueryClient();
  const { mutate: updateBike, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newData, id }) => updateBikeApi(newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      alert("bike successfully updated");
    },
    onError: (err) => {
      alert("error", err);
    },
  });
  return { isUpdating, updateBike };
}

export function useDeleteBike() {
  const queryClient = useQueryClient();
  const { mutate: deleteBike, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBikeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      alert("bike successfully deleted");
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  return { isDeleting, deleteBike };
}
