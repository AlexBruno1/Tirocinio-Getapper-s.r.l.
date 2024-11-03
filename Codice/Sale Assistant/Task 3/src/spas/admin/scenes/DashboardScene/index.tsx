import React, { memo } from "react";
import { useDashboardScene } from "./index.hooks";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { DashboardDrawerHeader } from "@/components/DashboardDrawerHeader";
import { DashboardDrawer, DrawerElement } from "@/components/DashboardDrawer";
import saleAssistantBgImg from "@/assets/images/sale-assistant-bg.png";

type DashboardSceneProps = {};

export const DashboardScene = memo(({}: DashboardSceneProps) => {
  const { elements } = useDashboardScene();

  return (
    <Stack
      direction="row"
      sx={{
        minHeight: "100vh",
      }}
    >
      <DashboardDrawer
        elements={elements}
        drawerTitle={"Pannello amministrativo"}
      />
      <DashboardDrawerHeader />
      <Stack
        sx={{
          mt: "64px",
          width: "100%",
          minHeight: "calc(100vh - 64px)",
          background: `url(${saleAssistantBgImg.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Outlet />
      </Stack>
    </Stack>
  );
});

DashboardScene.displayName = "DashboardScene";
