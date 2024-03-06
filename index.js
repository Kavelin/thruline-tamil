let words = [];
fetch("https://raw.githubusercontent.com/rajkumarpal07/powertamil-dictionary/master/AllTamilWords.txt")
  .then((res) => res.text())
  .then((text) => {
    words = text.split("\r\n");
    let chars = ["", ..."ாிீுூெேைொோௌ்"].flatMap((i, _) => [..."கஙசஞடணதநபமயரலவழளறன", ""].map((j) => (j ? j + i : [..."அஆஇஈஉஊஎஏஐஒஓஔஃ"][_])));

    (function generateGame(words, chars) {
      let word = "a";
      let game = [];
      //word = "உங்கள்";
      while (word.length > 6 || word.length < 3) word = words[Math.floor(Math.random() * words.length)];
      game = word.match(/[\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?|\s/g).map((i) => {
        return { chars: [i], selected: 1 };
      });
      let num = 7;
      for (let i = 0; i < game.length; i++) {
        for (let ite = 0; ite < Math.floor((4 * Math.random()) ** 2); ite++) {
          let char = chars[Math.floor(Math.random() * chars.length)];
          game[i].chars.push(char);
          if (checkGame([])) game[i].chars.pop();
        }
      }
      console.log(game, word);

      function checkGame(cword) {
        if (cword.length != game.length) {
          for (let i = 0; i < game[cword.length].chars.length; i++) checkGame([...cword, game[cword.length].chars[i]]);
        } else {
          console.log((words.includes(cword.join("")) && cword.join("") != word) ? cword.join("") : false);
          return words.includes(cword.join("")) && cword.join("") != word;
        }
      }
    })(words, chars);
  })
  .catch((e) => console.error(e));
