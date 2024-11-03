import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/chat-bot/redux-store";
import { ObjectIdFe } from "@/models/common/JsUtility";
import { useTheme } from "@mui/material";
import OpenAI from "openai";

const openai = new OpenAI();

export const useChatView = (assistantId: ObjectIdFe) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const dispatch = useDispatch();
  const chat = useSelector(selectors.getCurrentChat);
  const isCreatingChat = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postChats.api),
  );
  const isPostingMessage = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postChatsMessagesByChatId.api),
  );
  const messagesEndRef = useRef();
  const messageInputRef = useRef<HTMLInputElement>();
  const [isMultiline, setIsMultiline] = useState(true);
  const [streamingResponse, setStreamingResponse] = useState("");

  const isLoading =
    isCreatingChat ||
    isPostingMessage ||
    (chat?.runStatus && chat?.runStatus !== "completed");

  const handleStreamingResponse = (data: string) => {
    setStreamingResponse((prev) => prev + data);
  };

  const startStreaming = async (message: string) => {
    const stream = await openai.chat.completions.create({
      model: "gpt-4", // qua si può inserire anche un altro modello -> "gpt-4o-mini"
      messages: [{ role: "user", content: message }],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      handleStreamingResponse(content);
    }
  };

  const handleSubmitMessage = useCallback(() => {
    if (messageInputRef.current && messageInputRef.current?.value?.length) {
      if (chat) {
        startStreaming(messageInputRef.current.value);
        dispatch(
          actions.postChatsMessagesByChatId.request({
            chatId: chat._id,
            message: messageInputRef.current.value,
          }),
        );
      } else {
        dispatch(
          actions.postChats.request({
            message: messageInputRef.current.value,
            assistantId,
          }),
        );
      }
      messageInputRef.current.value = "";
    }
  }, [dispatch, chat, assistantId]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmitMessage();
        setIsMultiline(false);
      }
    },
    [handleSubmitMessage],
  );

  const enableMultiline = useCallback(() => setIsMultiline(true), []);

  useEffect(() => {
    if (messagesEndRef.current) {
      // @ts-ignore
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, isLoading]);

  return {
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
  };
};
