import { useContext } from "react";
import AccountContext from "../contexts/AccountContext";
import ModalContext from "../contexts/ModalContext";
import axios from "axios";
import { API_URL } from "../constants";

const useTitles = () => {
  const { accountData, setAccountData } = useContext(AccountContext);
  const { setToast } = useContext(ModalContext);
  const addTitle = async (title) => {
    if (accountData?.owned_titles.includes(title)) {
      return;
    }
    try {
      const { data } = await axios.get(
        `${API_URL}/addTitle?user_id=${accountData._id}&title=${title}`
      );
      setAccountData(data);
      setToast('Title Unlocked: "' + title + '"')
    } catch (error) {
      setToast("Failed to add title.");
      console.error(error);
      
    }
  };
  return { addTitle };
}

export default useTitles