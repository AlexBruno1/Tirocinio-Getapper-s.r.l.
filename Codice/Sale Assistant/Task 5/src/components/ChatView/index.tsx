import React, { memo } from "react";
import { useChatView } from "./index.hooks";
import {
  alpha,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { MessageBox } from "@/components/ChatView/MessageBox";
import SendIcon from "@mui/icons-material/Send";
import { ObjectIdFe } from "@/models/common/JsUtility";
import { Colors } from "@/themes";

type ChatViewProps = {
  assistantId: ObjectIdFe;
  firstMessage?: string;
  backgroundColor?: string;
  logo?: string;
  isChatEmbedded?: boolean;
};

export const ChatView = memo(
  ({
    assistantId,
    logo,
    isChatEmbedded,
    firstMessage,
    backgroundColor,
  }: ChatViewProps) => {
    const {
      handleKeyDown,
      chat,
      isLoading,
      messagesEndRef,
      messageInputRef,
      handleSubmitMessage,
      isMultiline,
      enableMultiline,
      isLight,
      streamingResponse,
    } = useChatView(assistantId);

    return (
      <Stack
        sx={{
          overflow: "hidden",
          background: backgroundColor ?? (isLight ? Colors.white : Colors.dark),
        }}
      >
        <Box
          id="box1"
          sx={{
            width: "100%",
            overflowY: "auto",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            flex: 1,
            maxHeight: isChatEmbedded ? undefined : 480,
          }}
        >
          <MessageBox
            assistantImg={logo}
            message={firstMessage ?? "Ciao! Come posso aiutarti?"}
            role="assistant"
          />

          {!!chat &&
            (chat.messages ?? [])
              .filter((m) => m.message?.length)
              .map((message, index) => (
                <MessageBox
                  key={index}
                  assistantImg={logo}
                  message={message.message}
                  role={message.role}
                />
              ))}
          {isLoading && (
            <MessageBox
              assistantImg={logo}
              message={<CircularProgress size={20} />}
              role="assistant"
            />
          )}
          {streamingResponse && (
            <MessageBox
              assistantImg={logo}
              message={streamingResponse}
              role="assistant"
            />
          )}
          <div ref={messagesEndRef} />
        </Box>
        <Box
          sx={{
            borderBottomLeftRadius: isChatEmbedded ? "4px" : "8px",
            borderBottomRightRadius: isChatEmbedded ? "4px" : "8px",
            p: 1,
            position: "relative",
            overflow: "hidden",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            minHeight: "56px",
          }}
        >
          <TextField
            sx={{
              overflow: "hidden",
              transition: "all 0.2s ease-in-out",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
              "& .MuiInputBase-input": {
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                  md: "1rem",
                  lg: "1rem",
                },
              },
              "& .MuiInputBase-root": {
                maxWidth: isChatEmbedded ? "270px" : "600px",
              },
              "& .MuiInputBase-inputMultiline": {
                wordWrap: "break-word",
              },
            }}
            maxRows={!isMultiline ? 1 : 5}
            fullWidth
            multiline
            onChange={enableMultiline}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi qui e premi Invio..."
            inputRef={messageInputRef}
          />
          <IconButton
            sx={{
              position: "absolute",
              right: {
                xs: "20px",
                sm: "10px",
                md: "10px",
                lg: "15px",
              },
              bottom: "16px",
              color: isLight ? Colors.primary : Colors.white,
              width: {
                xs: 50,
                sm: 50,
                md: 45,
                lg: 50,
              },
              height: {
                xs: 35,
                sm: 35,
                md: 30,
                lg: 35,
              },
              borderRadius: "17px / 50%",
              ":hover": {
                transform: "scale(1.05)",
              },
              ":active": {
                transform: "scale(.9)",
              },
            }}
            onClick={handleSubmitMessage}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Stack>
    );
  },
);
ChatView.displayName = "ChatView";
