import React, { memo } from "react";
import { useAssistantStateChipDialog } from "./index.hooks";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { AppButton } from "@/components/AppButton";
import { Downloading } from "@mui/icons-material";
import { Widget } from "@/components/Widget";
import SyncIcon from "@mui/icons-material/Sync";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import CheckIcon from "@mui/icons-material/Check";

type AssistantStateChipDialogProps = {
  status;
};

export const AssistantStateChipDialog = memo(
  ({ status }: AssistantStateChipDialogProps) => {
    const { isDialogOpen, onDialogClose } = useAssistantStateChipDialog();

    return (
      <Dialog open={isDialogOpen} onClose={onDialogClose} fullWidth>
        <DialogTitle>
          Informarmazioni sullo stato attuale dell&apos;assistente
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItem: "center",
              padding: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItem: "center",
                p: 1,
              }}
            >
              <Typography>L&apos;assistente al momento risulta:</Typography>
              {status == "pending" && (
                <Chip
                  icon={<HourglassFullIcon />}
                  label="In lavorazione"
                  color="default"
                  variant="filled"
                />
              )}
              {status == "active" && (
                <Chip
                  icon={<CheckIcon />}
                  label="Attivo"
                  color="success"
                  variant="filled"
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItem: "center",
                p: 1,
              }}
            >
              <Typography>
                Hai bisogno di assistenza?
                <br />
                Contattaci tramite Mail o Telefono e ti aiuteremo!
              </Typography>
              <Box>
                <Tooltip title="Mail">
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Numero di Telefono">
                  <IconButton>
                    <PhoneIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} variant="outlined" color="secondary">
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);
AssistantStateChipDialog.displayName = "AssistantStateChipDialog";
