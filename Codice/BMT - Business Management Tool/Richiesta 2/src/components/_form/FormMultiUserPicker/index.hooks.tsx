import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { JobFe } from "@/models/client/JobFe";
import { UserFe } from "@/models/client/UserFe";
import useFormField from "@/hooks/useFormField";
import { FormMultiAutocompleteOption } from "@/components/_form/FormMultiJobPicker/index.hooks";

export const useFormMultiUserPicker = (
  name: string,
  users: UserFe[],
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

  const usersOptions = useMemo(
    () =>
      users.map((user) => ({
        id: user._id,
        value: `${user.email}`,
      })),
    [users],
  );

  const selectableUsersOptions = useMemo(
    () =>
      usersOptions
        .filter((option) =>
          excludeSelected
            ? !(value ?? []).some((selected) => selected === option.id)
            : true,
        )
        .sort((a, b) => a.value.localeCompare(b.value)),
    [usersOptions, excludeSelected, value],
  );

  return {
    chipsIds,
    handleItemAdded,
    handleItemDeleted,
    error,
    usersOptions,
    selectableUsersOptions,
  };
};
