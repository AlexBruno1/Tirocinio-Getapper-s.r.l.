import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectors } from "@/spas/admin/redux-store";

export const useWebsiteUrlsList = () => {
  const [selectedIds, setSelectedIds] = useState([]);

  const links = useSelector(selectors.getWebsiteUrls);

  const handleCheckboxChange = (event, linkId) => {
    const newSelectedIds = selectedIds.includes(linkId)
      ? selectedIds.filter((id) => id !== linkId)
      : [...selectedIds, linkId];

    setSelectedIds(newSelectedIds);
  };

  return {
    links,
    handleCheckboxChange,
    selectedIds,
  };
};
