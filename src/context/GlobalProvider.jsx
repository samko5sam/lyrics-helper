/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({children}) => {
  const [wordBooks, setWordBooks] = useState([{ name: '一般', words: [] }]);
  const [viewingLyrics, setViewingLyrics] = useState({
    title: "",
    artist: ""
  });
  const [descriptionContent, setDescriptionContent] = useState([{
    word: "",
    meanings: [],
    translation: ""
  }])

  return (
    <GlobalContext.Provider
      value={{
        viewingLyrics,
        setViewingLyrics,
        descriptionContent,
        setDescriptionContent,
        wordBooks,
        setWordBooks
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}