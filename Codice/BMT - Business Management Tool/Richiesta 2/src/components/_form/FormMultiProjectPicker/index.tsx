import React, { memo } from "react";
import { FormProvider } from "react-hook-form";
import { useFormMultiProjectPicker } from "./index.hooks";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormHelperText,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { UserFe } from "@/models/client/UserFe";
import { ProjectFe } from "@/models/client/ProjectFe";
import { FormMultiAutocompleteOption } from "@/components/_form/FormMultiJobPicker/index.hooks";

type FormMultiProjectPickerProps = {
  projects: ProjectFe[];
  name?: string;
  label?: string;
  excludeSelected?: boolean;
};

export const FormMultiProjectPicker = memo(
  ({
    projects,
    name,
    label,
    excludeSelected = false,
    ...props
  }: FormMultiProjectPickerProps) => {
    const {
      chipsIds,
      handleItemAdded,
      handleItemDeleted,
      error,
      projectsOptions,
      selectableProjectsOptions,
    } = useFormMultiProjectPicker(name, projects, excludeSelected);

    return (
      <Stack {...props} flex={1}>
        <Autocomplete<FormMultiAutocompleteOption>
          fullWidth
          onChange={handleItemAdded}
          options={selectableProjectsOptions}
          getOptionLabel={(option) => option.value}
          renderOption={(params, option) => (
            <MenuItem {...params}>{option.value}</MenuItem>
          )}
          renderInput={(params) => (
            <TextField {...params} label={label} sx={{ width: "100%" }} />
          )}
        />
        <Stack direction={"row"} flexWrap={"wrap"}>
          {chipsIds.map((chipId, index) => {
            const chip = projectsOptions.find((chip) => chip.id === chipId);
            return (
              <Box key={chip.value}>
                <Chip
                  label={chip.value}
                  onDelete={handleItemDeleted[index]}
                  sx={{
                    mr: 1,
                    mt: 1,
                  }}
                />
              </Box>
            );
          })}
        </Stack>
        {!!error ? <FormHelperText error>{error}</FormHelperText> : null}
      </Stack>
    );
  },
);
FormMultiProjectPicker.displayName = "FormMultiProjectPicker";
