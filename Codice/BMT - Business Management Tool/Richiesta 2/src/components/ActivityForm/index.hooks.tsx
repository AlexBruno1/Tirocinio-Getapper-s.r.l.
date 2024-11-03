import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceExpenseCategory } from "@/models/common/ServiceExpenseCommon";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import { ReminderStrategy, ReminderType } from "@/models/common/ActivityCommon";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { ObjectIdFe } from "@/models/common/JsUtility";

const schema = yup.object({
  usersIds: yup.array().of(yup.string()).required(),
  title: yup.string().required(),
  reminderStrategy: yup.mixed().oneOf(Object.values(ReminderType)).required(),
  reminderTime: yup.number().required(),
  deadline: yup.date().required(),
  params: yup.object().shape({
    customersIds: yup.array().of(yup.string()),
    jobsIds: yup.array().of(yup.string()),
    projectsIds: yup.array().of(yup.string()),
    workersIds: yup.array().of(yup.string()),
  }),
});

type ActivityFormData = {
  usersIds: Array<ObjectIdFe>;
  title: string;
  reminderStrategy: ReminderStrategy;
  reminderTime: number;
  deadline: Date;
  params: {
    customersIds: Array<ObjectIdFe>;
    jobsIds: Array<ObjectIdFe>;
    projectsIds: Array<ObjectIdFe>;
    workersIds: Array<ObjectIdFe>;
  };
};

export const useActivityForm = () => {
  const jobs = useSelector(selectors.getJobsList);
  const users = useSelector(selectors.getUsersList);
  const customers = useSelector(selectors.getCustomersList);
  const projects = useSelector(selectors.getProjectsList);
  const workers = useSelector(selectors.getWorkersList);

  const formData = useForm<ActivityFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      usersIds: null,
      title: "",
      reminderStrategy: null,
      reminderTime: null,
      deadline: null,
      params: {
        customersIds: null,
        jobsIds: null,
        projectsIds: null,
        workersIds: null,
      },
    },
  });
  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = formData;
  const submitDisabled = isSubmitted && !isValid;

  const dispatch = useDispatch();

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        // data.name;
        //dispatch ?
        console.log("SUCCESS!");
        dispatch(actions.postActivities.request(data));
      }),
    [handleSubmit, dispatch],
  );

  const isCreateActivityDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.CREATE_ACTIVITY
  ];

  return {
    formData,
    triggerSubmit,
    submitDisabled,
    users,
    jobs,
    customers,
    projects,
    workers,
    isCreateActivityDialogOpen,
  };
};
