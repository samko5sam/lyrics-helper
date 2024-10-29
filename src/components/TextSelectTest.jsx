import { useState } from "react";
import * as Selection from "selection-popover";

const TextSelectTest = () => {
  const [selectedText, setSelectedText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleTextSelect = (event) => {
    const text = window.getSelection().toString();
    setSelectedText(text);
    setCharCount(text.length);
    console.log(text);
  };

  return (
    <Selection.Root>
      <div onMouseUp={handleTextSelect}>
        <Selection.Trigger>
          <p>
            This is some sample text. Select any part of this text to see the
            popover.
          </p>
        </Selection.Trigger>
        <Selection.Portal>
          <Selection.Content>
            <Selection.Arrow />
            <div>
              <p>Selected Text: {selectedText}</p>
              <p>Character Count: {charCount}</p>
            </div>
          </Selection.Content>
        </Selection.Portal>
      </div>
    </Selection.Root>
  );
};

export default TextSelectTest;
