import React, { memo } from "react";
import { useAdminAssistantsListScene } from "./index.hooks";
import { AssistantsList } from "@/components/AssistantsList";
import { EditAssistantDialog } from "@/components/EditAssistantDialog";
import { CreateAssistantDialog } from "@/components/CreateAssistantDialog";

type AdminAssistantsListSceneProps = {};

export const AdminAssistantsListScene = memo(
  ({}: AdminAssistantsListSceneProps) => {
    const { assistants, handleOpenEditAssistantDialog, viewAllColumns } =
      useAdminAssistantsListScene();

    return (
      <>
        <AssistantsList
          assistants={assistants}
          handleOpenEditAssistantDialog={handleOpenEditAssistantDialog}
          viewColumns={viewAllColumns}
          createButtonEnabled={true}
        />
        <EditAssistantDialog />
        <CreateAssistantDialog assistants={assistants} />
      </>
    );
  },
);

AdminAssistantsListScene.displayName = "AdminAssistantsListScene";
