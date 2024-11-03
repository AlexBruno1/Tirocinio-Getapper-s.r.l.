import React, { memo } from "react";
import { FormProvider } from "react-hook-form";
import { useActivityForm } from "./index.hooks";
import { Button, Stack } from "@mui/material";
import { FormTextField } from "@/components/_form/FormTextField";
import { FormSelect } from "@/components/_form/FormSelect";
import { FormDateTimePicker } from "@/components/_form/FormDateTimePicker";
import { FormMultiJobPicker } from "@/components/_form/FormMultiJobPicker";
import { FormMultiUserPicker } from "@/components/_form/FormMultiUserPicker";
import { FormMultiCustomerPicker } from "@/components/_form/FormMultiCustomerPicker";
import { FormMultiProjectPicker } from "@/components/_form/FormMultiProjectPicker";
import { FormMultiWorkerPicker } from "@/components/_form/FormMultiWorkerPicker";
import { activityStrategySelectOptions } from "@/models/common/ActivityCommon";
import {
  IIncomingBillFe,
  IncomingBillFe,
} from "@/models/client/IncomingBillFe";
import { ActivityFe, IActivityFe } from "@/models/client/ActivityFe";

type ActivityFormProps = {
  onSubmit: (data: IActivityFe) => void;
  activity?: ActivityFe;
  onClose?: () => void;
  isLoading?: boolean;
};

export const ActivityForm = memo(
  ({ activity, onSubmit, isLoading, onClose }: ActivityFormProps) => {
    const {
      formData,
      triggerSubmit,
      submitDisabled,
      users,
      jobs,
      customers,
      projects,
      workers,
    } = useActivityForm();

    return (
      <FormProvider {...formData}>
        <form onSubmit={triggerSubmit}>
          <Stack spacing={3}>
            <FormMultiUserPicker
              users={users}
              excludeSelected
              name="enabledUSersIds"
              label="users"
            />
            <FormTextField name="title" label="Title" />
            <FormSelect
              name="remiderStrategy"
              label="ReminderStrategy"
              options={activityStrategySelectOptions}
            />
            <FormTextField name="reminderTime" label="ReminderTime" />
            <FormDateTimePicker name="deadline" label="Deadline" />
            <FormMultiJobPicker
              jobs={jobs}
              excludeSelected
              name="enabledJobsIds"
              label="jobs"
            />
            <FormMultiCustomerPicker
              customers={customers}
              excludeSelected
              name="enabledCustomerIds"
              label="customers"
            />
            <FormMultiProjectPicker
              projects={projects}
              excludeSelected
              name="enabledProjectIds"
              label="projects"
            />
            <FormMultiWorkerPicker
              workers={workers}
              excludeSelected
              name="enabledWorkersIds"
              label="workers"
            />
            {
              <Button
                variant="contained"
                type="submit"
                disabled={submitDisabled}
              >
                Salva
              </Button>
            }
          </Stack>
        </form>
      </FormProvider>
    );
  },
);
ActivityForm.displayName = "ActivityForm";
