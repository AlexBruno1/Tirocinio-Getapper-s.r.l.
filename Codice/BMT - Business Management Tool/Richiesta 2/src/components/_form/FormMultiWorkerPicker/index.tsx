import React, { memo, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { useFormMultiWorkerPicker } from "./index.hooks";
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
import { FormMultiAutocompleteOption } from "@/components/_form/FormMultiJobPicker/index.hooks";
import { WorkerFe } from "@/models/client/WorkerFe";

type FormMultiWorkerPickerProps = {
  workers: WorkerFe[];
  name?: string;
  label?: string;
  excludeSelected?: boolean;
};

export const FormMultiWorkerPicker = memo(
  ({
    workers,
    name,
    label,
    excludeSelected = false,
    ...props
  }: FormMultiWorkerPickerProps) => {
    const {
      chipsIds,
      handleItemAdded,
      handleItemDeleted,
      error,
      workersOptions,
      selectableWorkersOptions,
    } = useFormMultiWorkerPicker(name, workers, excludeSelected);

    return (
      <Stack {...props} flex={1}>
        <Autocomplete<FormMultiAutocompleteOption>
          fullWidth
          onChange={handleItemAdded}
          options={selectableWorkersOptions}
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
            const chip = workersOptions.find((chip) => chip.id === chipId);
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
FormMultiWorkerPicker.displayName = "FormMultiWorkerPicker";
