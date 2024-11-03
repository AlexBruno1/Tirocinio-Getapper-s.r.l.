import React, { memo } from "react";
import { FormProvider } from "react-hook-form";
import { useCreateActivityDialog } from "./index.hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormMultiUserPicker } from "@/components/_form/FormMultiUserPicker";
import { FormTextField } from "@/components/_form/FormTextField";
import { FormSelect } from "@/components/_form/FormSelect";
import { activityStrategySelectOptions } from "@/models/common/ActivityCommon";
import { FormDateTimePicker } from "@/components/_form/FormDateTimePicker";
import { FormMultiJobPicker } from "@/components/_form/FormMultiJobPicker";
import { FormMultiCustomerPicker } from "@/components/_form/FormMultiCustomerPicker";
import { FormMultiProjectPicker } from "@/components/_form/FormMultiProjectPicker";
import { FormMultiWorkerPicker } from "@/components/_form/FormMultiWorkerPicker";
import { AppButton } from "@/components/AppButton";
import { ActivityForm } from "@/components/ActivityForm";
import Typography from "@mui/material/Typography";

type CreateActivityDialogProps = {};

export const CreateActivityDialog = memo(({}: CreateActivityDialogProps) => {
  const {
    isCreateActivityDialogOpen,
    handleCloseDialog,
    handleSubmit,
    isCreatingActivity,
  } = useCreateActivityDialog();

  return (
    <Dialog
      open={isCreateActivityDialogOpen}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Creazione Activity</DialogTitle>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          fontVariant: "small-caps",
        }}
      >
        Inserisci i dati:
      </Typography>
      <ActivityForm
        onSubmit={handleSubmit}
        onClose={handleCloseDialog}
        isLoading={isCreatingActivity}
      />
    </Dialog>
  );
});
CreateActivityDialog.displayName = "CreateActivityDialog";
