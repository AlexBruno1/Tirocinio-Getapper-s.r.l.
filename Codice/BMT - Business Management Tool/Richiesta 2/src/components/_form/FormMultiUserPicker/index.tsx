import React, { memo, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { useFormMultiUserPicker } from "./index.hooks";
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
import { FormMultiAutocompleteOption } from "@/components/_form/FormMultiJobPicker/index.hooks";

type FormMultiUserPickerProps = {
  users: UserFe[];
  name?: string;
  label?: string;
  excludeSelected?: boolean;
};

export const FormMultiUserPicker = memo(
  ({
    users,
    name,
    label,
    excludeSelected = false,
    ...props
  }: FormMultiUserPickerProps) => {
    const {
      chipsIds,
      handleItemAdded,
      handleItemDeleted,
      error,
      usersOptions,
      selectableUsersOptions,
    } = useFormMultiUserPicker(name, users, excludeSelected);

    return (
      <Stack {...props} flex={1}>
        <Autocomplete<FormMultiAutocompleteOption>
          fullWidth
          onChange={handleItemAdded}
          options={selectableUsersOptions}
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
            const chip = usersOptions.find((chip) => chip.id === chipId);
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
FormMultiUserPicker.displayName = "FormMultiUserPicker";
