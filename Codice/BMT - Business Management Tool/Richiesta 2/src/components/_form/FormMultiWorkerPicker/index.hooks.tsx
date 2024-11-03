import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormField from "@/hooks/useFormField";
import { WorkerFe } from "@/models/client/WorkerFe";

type FormMultiAutocompleteOption = {
  id: string;
  value: string;
};

export const useFormMultiWorkerPicker = (
  name: string,
  workers: WorkerFe[],
  excludeSelected: boolean,
) => {
  const { value, setValue, error } = useFormField<string[]>({ name });
  const chipsIds = useMemo(() => value ?? [], [value]);

  const handleItemDeleted = useMemo(
    () =>
      chipsIds?.map((_item, index) => () => {
        const array = [...chipsIds];
        array.splice(index, 1);
        setValue(array);
      }),
    [chipsIds, setValue],
  );

  const handleItemAdded = useCallback(
    (ev, chip: FormMultiAutocompleteOption) => {
      if (chip) {
        if (!chipsIds.includes(chip.id)) {
          setValue([...chipsIds, chip.id]);
        }
      }
    },
    [chipsIds, setValue],
  );

  const workersOptions = useMemo(
    () =>
      workers.map((worker) => ({
        id: worker._id,
        value: `${worker.fullName}`,
      })),
    [workers],
  );

  const selectableWorkersOptions = useMemo(
    () =>
      workersOptions
        .filter((option) =>
          excludeSelected
            ? !(value ?? []).some((selected) => selected === option.id)
            : true,
        )
        .sort((a, b) => a.value.localeCompare(b.value)),
    [workersOptions, excludeSelected, value],
  );

  return {
    chipsIds,
    handleItemAdded,
    handleItemDeleted,
    error,
    workersOptions,
    selectableWorkersOptions,
  };
};
