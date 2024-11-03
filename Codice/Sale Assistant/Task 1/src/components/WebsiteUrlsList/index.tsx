import React, { memo } from "react";
import { useWebsiteUrlsList } from "./index.hooks";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Checkbox, TextField } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

type WebsiteUrlsListProps = {};

export const WebsiteUrlsList = memo(({}: WebsiteUrlsListProps) => {
  const { links, handleCheckboxChange, selectedIds } = useWebsiteUrlsList();

  return (
    <List>
      {links.map((link) => {
        const isSelected = selectedIds.includes(link);

        return (
          <ListItem key={link}>
            <ListItemButton
              role={undefined}
              onChange={(event) => {
                handleCheckboxChange(event, link);
              }}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={isSelected}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={link} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
});

WebsiteUrlsList.displayName = "WebsiteUrlsList";
