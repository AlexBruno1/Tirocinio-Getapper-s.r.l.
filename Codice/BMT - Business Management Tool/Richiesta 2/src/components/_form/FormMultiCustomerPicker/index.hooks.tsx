import { useCallback, useMemo } from "react";
import useFormField from "@/hooks/useFormField";
import { CustomerFe } from "@/models/client/CustomerFe";

type FormMultiAutocompleteOption = {
  id: string;
  value: string;
};

export const useFormMultiCustomerPicker = (
  name: string,
  customers: CustomerFe[],
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

  const customersOptions = useMemo(
    () =>
      customers.map((customer) => ({
        id: customer._id,
        value: `${customer.name}`,
      })),
    [customers],
  );

  const selectableCustomersOptions = useMemo(
    () =>
      customersOptions
        .filter((option) =>
          excludeSelected
            ? !(value ?? []).some((selected) => selected === option.id)
            : true,
        )
        .sort((a, b) => a.value.localeCompare(b.value)),
    [customersOptions, excludeSelected, value],
  );

  return {
    chipsIds,
    handleItemAdded,
    handleItemDeleted,
    error,
    customersOptions,
    selectableCustomersOptions,
  };
};
