import React, { useState } from 'react';

const TextTwister = () => {
    const [originalText, setOriginalText] = useState("");
    const [twistedText, setTwistedText] = useState("");
    const [edits, setEdits] = useState(0);
    const [editInfo, setEditInfo] = useState("");

    const handleChange = (e) => {
        setOriginalText(e.target.value);
    };

    // function to swap two adjacent characters in a random words in random positions
    function swapRandomCharacters(text) {
        let words = text.split(" ");
        let newWords = [];
        let swappedCharacters = 0;

        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            // check if word has at least 2 characters
            if (word.length > 1 && Math.random() < 0.5) {
                let swapIndex = Math.floor(Math.random() * (word.length - 1));
                let swappedWord = word.slice(0, swapIndex) + word[swapIndex + 1] + word[swapIndex] + word.slice(swapIndex + 2);
                word = swappedWord;
                swappedCharacters++;
            }
            newWords.push(word);
        }

        setEdits(swappedCharacters);
        setEditInfo("Au fost inlocuite " + swappedCharacters + " caractere in " + newWords.length + " cuvinte.");
        return newWords.join(" ");
    }


    function insertRandomHyphens(text) {
        let words = text.split(" ");
        let newWords = [];
        let addedHyphens = 0;

        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            // check if word doesn't have a hyphen or apostrophe or other punctuation mark or is less than 3 characters

            if (Math.random() < 0.5 && word.length > 3 && !word.includes("-") && !word.includes("'") && !word.includes(".") && !word.includes(",") && !word.includes("!") && !word.includes("?")) {
                let hyphenIndex = Math.floor(Math.random() * (word.length - 1)) + 1;
                word = word.slice(0, hyphenIndex) + "-" + word.slice(hyphenIndex);
                addedHyphens++;
            }
            newWords.push(word);
        }

        setEdits(addedHyphens);
        setEditInfo("Numarul de cratime adaugate: " + addedHyphens);
        return newWords.join(" ");
    }



    function removeHyphensBetweenWords(text) {
        let words = text.split(" ");
        let newWords = [];
        let removedHyphens = 0;

        for (let i = 0; i < words.length; i++) {
            let currentWord = words[i];
            if (currentWord.includes("-")) {
                removedHyphens++;
                currentWord = currentWord.replace("-", "");
            }
            newWords.push(currentWord);
        }

        setEdits(removedHyphens);
        setEditInfo("Numarul de cratime sterse: " + removedHyphens);
        return newWords.join(" ");
    }




    function removeRandomSpaces(text) {
        let words = text.split(" ");
        let newWords = [];
        let removedSpaces = 0;

        for (let i = 0; i < words.length - 1; i++) {
            let currentWord = words[i];
            let nextWord = words[i + 1];
            // check if there is a space between currentWord and nextWord and if it should be removed
            if (Math.random() < 0.5) {
                removedSpaces++;
                currentWord += nextWord;
                i++; // skip the nextWord
            }
            newWords.push(currentWord);
        }
        // add the last word
        newWords.push(words[words.length - 1]);

        setEdits(removedSpaces);
        setEditInfo("Numarul de spatii eliminate: " + removedSpaces);
        return newWords.join(" ");
    }

    function replaceLetter(text, source, target) {
        let replacedLetters = 0;
        let newText = text.split("").map(letter => {
            if (letter === source) {
                replacedLetters++;
                return target;
            }
            return letter;
        }).join("");
        setEdits(replacedLetters);
        setEditInfo("Au fost inlocuite " + replacedLetters + " litere " + source + " cu " + target);
        return newText;
    }

    const twistText = (option) => {
        let newText = "";
        if (option === "hyphens") {
            newText = insertRandomHyphens(originalText);
        }

        if (option === "spaces") {
            newText = removeRandomSpaces(originalText);
        }

        if (option === "letters") {
            newText = replaceLetter(originalText, "ă", "a");
        }

        if (option === "removeHyphens") {
            newText = removeHyphensBetweenWords(originalText);
        }

        if (option === "twist") {
            newText = swapRandomCharacters(originalText);
        }

        setTwistedText(newText);
    }

    function handleCopyClick() {
        navigator.clipboard.writeText(twistedText);
    }

    function clearText(option="both") {
        if (option === "original") {
            setOriginalText("");
        }

        if (option === "twisted") {
            setTwistedText("");
        }

        if (option === "both") {
            setOriginalText("");
            setTwistedText("");
        }

    }

    return (
        <div className={"app"}>
            <h1>Text Twister</h1>
            <textarea
                placeholder={"Introduceti textul original..."}
                value={originalText}
                onChange={handleChange}
            />
            <div className={"toolbar"}>
                <button onClick={() => twistText("spaces")}>Șterge spații (aleator)</button>
                <button onClick={() => twistText("removeHyphens")}>Șterge cratime</button>
                <button onClick={() => twistText("hyphens")}>Adaugă cratime (aleator)</button>
                <button onClick={() => twistText("letters")}>Înlocuiește <strong>ă</strong> cu <strong>a</strong> < /button>
                <button onClick={() => twistText("twist")}>Schimba cu locul 2 litere (aleator)</button>
            </div>
            <div className={"edit-info"}>
                <p>{editInfo}</p>
            </div>
            <textarea value={twistedText}  onChange={(e) => setTwistedText(e.target.value)}/>
            <button onClick={handleCopyClick}>Copiază textul greșit</button>
            <button onClick={() => clearText("both")}>Șterge textele</button>
            <button onClick={() => clearText("twisted")}>Șterge textul greșit</button>
            <button onClick={() => clearText("original")}>Șterge textul corect</button>
        </div>
    );
};

export default TextTwister;
