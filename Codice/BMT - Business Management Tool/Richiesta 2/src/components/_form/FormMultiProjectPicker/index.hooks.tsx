import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserFe } from "@/models/client/UserFe";
import { ProjectFe } from "@/models/client/ProjectFe";
import useFormField from "@/hooks/useFormField";
import { FormMultiAutocompleteOption } from "@/components/_form/FormMultiJobPicker/index.hooks";

export const useFormMultiProjectPicker = (
  name: string,
  projects: ProjectFe[],
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

  const projectsOptions = useMemo(
    () =>
      projects.map((project) => ({
        id: project._id,
        value: `${project.name}`,
      })),
    [projects],
  );

  const selectableProjectsOptions = useMemo(
    () =>
      projectsOptions
        .filter((option) =>
          excludeSelected
            ? !(value ?? []).some((selected) => selected === option.id)
            : true,
        )
        .sort((a, b) => a.value.localeCompare(b.value)),
    [projectsOptions, excludeSelected, value],
  );

  return {
    chipsIds,
    handleItemAdded,
    handleItemDeleted,
    error,
    projectsOptions,
    selectableProjectsOptions,
  };
};
