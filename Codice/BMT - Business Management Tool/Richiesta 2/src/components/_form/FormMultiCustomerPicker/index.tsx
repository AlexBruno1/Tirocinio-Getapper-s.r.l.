import React, { memo } from "react";
import { useFormMultiCustomerPicker } from "./index.hooks";
import { UserFe } from "@/models/client/UserFe";
import { CustomerFe } from "@/models/client/CustomerFe";
import {
  Autocomplete,
  Box,
  Chip,
  FormHelperText,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { FormMultiAutocompleteOption } from "@/components/_form/FormMultiJobPicker/index.hooks";

type FormMultiCustomerPickerProps = {
  customers: CustomerFe[];
  name?: string;
  label?: string;
  excludeSelected?: boolean;
};

export const FormMultiCustomerPicker = memo(
  ({
    customers,
    name,
    label,
    excludeSelected = false,
    ...props
  }: FormMultiCustomerPickerProps) => {
    const {
      chipsIds,
      handleItemAdded,
      handleItemDeleted,
      error,
      customersOptions,
      selectableCustomersOptions,
    } = useFormMultiCustomerPicker(name, customers, excludeSelected);

    return (
      <Stack {...props} flex={1}>
        <Autocomplete<FormMultiAutocompleteOption>
          fullWidth
          onChange={handleItemAdded}
          options={selectableCustomersOptions}
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
            const chip = customersOptions.find((chip) => chip.id === chipId);
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
FormMultiCustomerPicker.displayName = "FormMultiCustomerPicker";
