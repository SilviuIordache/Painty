  function getDayInYear() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    return day;
  }
  
  export default function getDailyWord() {
    // get day of the year: 1 to 365
    const dayInYear = getDayInYear();

    // 2. get the number in the scrambled list at the index of value =  dayInYear
    const randomizedNumbers = require("../data/wordOrder.json").list;
    const randomIndex = randomizedNumbers[dayInYear];

    // 3. const randomWord = get the word at this randomIndex
    const words = require("../data/words.json").list;
    const dailyWord = words[randomIndex];
    return dailyWord;
  }