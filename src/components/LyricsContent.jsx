/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import SearchWithSuggestions from "./SearchWithSuggestion";
import { LyricsText } from "./LyricsText";
import { Alert } from "react-bootstrap";
import VocabularyReview from "./VocabularyReview";

export const LyricsContent = () => {
  const {viewingLyrics, setViewingLyrics, wordBooks} = useGlobalContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  useEffect(() => {
    const getLyricsContent = async () => {
      const {artist, title} = viewingLyrics;
      if (!artist || !title) return;
      if (viewingLyrics.lyrics !== undefined && viewingLyrics.lyrics !== "") return;
      setLoadingLyrics(true);
      try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        console.log(response.status)
        if (response.status === 404) {
          setErrorMsg("找不到歌詞");
          return
        };
        const data = await response.json();
        console.log(data);
        setViewingLyrics((old) => {
          return {...old, lyrics: data.lyrics}
        })
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingLyrics(false);
      }
    }
    getLyricsContent();
  }, [viewingLyrics])
  return (
    <div className="container">
      <SearchWithSuggestions onSearch={(data) => {
        console.log(data);
        setViewingLyrics(data);
        setErrorMsg("");
      }} />
      <div style={{display: "flex", flexDirection: "row-reverse"}}>
        <VocabularyReview wordBooks={wordBooks} />
      </div>
      {errorMsg && <Alert variant="warning">{errorMsg}</Alert>}
      {loadingLyrics && <p>歌詞載入中...</p>}
      {viewingLyrics.lyrics && <LyricsText content={viewingLyrics} />}
    </div>
  )
}
