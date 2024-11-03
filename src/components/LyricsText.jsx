import { useState } from "react";
import { SafeText } from "./SafeText"
import * as Selection from 'selection-popover';
import { enDictionaryApiUrl, statuses } from "../constants/Constants";
import { useGlobalContext } from "../context/GlobalProvider";

import { translate } from "google-translate-api-browser";
import * as OpenCC from 'opencc-js';
import { Button } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "sonner";

export const LyricsText = ({content: {
  title,
  artist,
  lyrics
}}) => {
  const {descriptionContent, setDescriptionContent, setWordBooks, wordBooks} = useGlobalContext();
  const [selectedText, setSelectedText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const [loadingDescription, setLoadingDescription] = useState(false);
  const [lastSelected, setLastSelected] = useState("");

  const isEnglishWord = (word) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(word);
  }
  const handleTextSelect = async () => {
    const text = window.getSelection().toString();
    setSelectedText(text);
    setCharCount(text.length);
    console.log(text);
    if (text.length && lastSelected !== text){
      setLoadingDescription(true);
      if (text.length < 20){
        if ((text.split(" ").length == 1 || (text.split(" ").length === 2 && text.split(" ")[1] == "")) && isEnglishWord(text)){
          const result = await searchDictionary(text.split(" ")[0]);
          console.log(result);
          if (result){
            setDescriptionContent(result);
            setLastSelected(text);
          }
        } else {
          const result = await translateText(text);
          console.log(result);
          setDescriptionContent([{
            original: text,
            translation: result
          }])
          setLastSelected(text);
        }
      } else {
        const result = await translateText(text);
        console.log(result);
        setDescriptionContent([{
          original: text,
          translation: result
        }])
        setLastSelected(text);
      }
      setLoadingDescription(false);
    }
  };
  const searchDictionary = async (term) => {
    try {
      const response = await fetch(enDictionaryApiUrl + term);
      const data = await response.json();
      console.log(data)
      return data
    } catch (error) {
      console.log(error);
    }
  }
  const translateText = async (text) => {
    try {
      const response = await translate(text, {
        to: "zh",
        corsUrl: import.meta.env.PROD ? "https://cors-anywhere.sk5s.cyou/" : "http://cors-anywhere.herokuapp.com/"
        // corsUrl: "https://corsproxy.io/?"
      })
      const data = await response.text;
      console.log(data);
      const converter = OpenCC.Converter({ from: 'cn', to: 'twp' });
      return converter(data);
    } catch (error) {
      console.log(error);
      return "翻譯發生錯誤"
    }
  }
  const handleAddWord = (bookName, content) => {
    const book = wordBooks.find(book => book.name === bookName);
    if (book.words.some(wordObj => 
      wordObj.content.some(
        item => (item.word && item.word === content.word) || 
                (item.original && item.original === content.original)
      )
    )) {
      console.log("Duplicated");
      return;
    }
    const newWord = {
      content,
      status: statuses[2], // default status
    };

    const updatedWordBooks = wordBooks.map(book =>
      book.name === bookName
        ? { ...book, words: [...book.words, newWord] }
        : book
    );

    console.log(updatedWordBooks);
    setWordBooks(updatedWordBooks);
  };
  return (
    <Selection.Root>
      <Selection.Trigger>
        <div onMouseUp={handleTextSelect} className="mb-5">
          <h2>{title}</h2>
          <h6 className="mb-5">{artist}</h6>
          <SafeText content={lyrics} />
        </div>
      </Selection.Trigger>

      <Selection.Portal>
        <Selection.Content style={{backgroundColor: "#fff", padding: "10px", border: "1px solid black", borderRadius: "5px", marginLeft: "5px", marginRight: "5px", maxWidth: "90vw", width: "400px", maxHeight: "200px", display: "flex"}}>
          <Selection.Arrow />
          <div style={{display: "flex", flexDirection: "column", flex: 1}}>
            <div className="bg-white" style={{display: "flex", flexDirection: "row-reverse", position: "absolute", top: 10, right: 30}}>
              {descriptionContent.length && !loadingDescription ? <>
                {(!!descriptionContent[0].word || descriptionContent[0].translation.length < 20) && <Button variant="link" size="sm" onClick={() => {
                  handleAddWord("一般", descriptionContent);
                  toast.success("已新增字詞", {
                    cancel: {
                      label: '關閉'
                    },
                  });
                }}><FaPlusCircle /></Button>}
              </> : <>...</>}
            </div>
            <div style={{overflowY: "scroll", flex: 1}}>
              {loadingDescription && <div>載入中...</div>}
              {!!(descriptionContent.length && !loadingDescription) && descriptionContent.map((item, i) => (
                <div key={item.word + i}>
                  {!!item.translation && <SafeText content={item.translation} />}
                  {item.word && <h5>{item.word}</h5>}
                  {item.meanings && item.meanings.length && item.meanings.map((meaning,i) => (
                    <p key={meaning.partOfSpeech + i}>
                      <em className="text-muted">{meaning.partOfSpeech}</em><br/>
                      {meaning.definitions.length && meaning.definitions.map((definition, i) => (
                        <>
                          <p key={i}>{definition.definition}</p>
                        </>
                      ))}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Selection.Content>
      </Selection.Portal>
    </Selection.Root>
  )
}
