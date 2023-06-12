const translateBtn = document.querySelector(".translatebtn");
const translatedText = document.querySelector(".translatedText");
const input = document.querySelector("input");
const ol = document.querySelector(".translate");
const targetLanguage = 'RU';
let sourceLanguage = 'ET';
document.addEventListener("keyup", function(event){
    if(event.code == "Enter"){
        translateText(input.value, targetLanguage, sourceLanguage)
    }
})
function addWords(word, translate){
const wordLi = document.createElement("li");
const br = document.createElement("br");
const btn = document.createElement("button");
btn.classList.add("btn-close");
btn.setAttribute("aria-label", "Close");
wordLi.innerText = word + " - "+ translate ;
ol.appendChild(wordLi);
wordLi.appendChild(btn);
wordLi.appendChild(br);
btn.addEventListener("click", function(){
    wordLi.remove()
    br.remove()
})
}

function translateText(text, targetLanguage, sourceLanguage) {
  const apiKey = ''; // Вставьте свой ключ API DeeplL

  const endpoint = 'https://api-free.deepl.com/v2/translate';
  const params = new URLSearchParams({
    auth_key: apiKey,
    text: text,
    target_lang: targetLanguage,
    source_lang: sourceLanguage
  });

  const url = `${endpoint}?${params}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const translation = data.translations[0].text;
      console.log(`Перевод: ${translation}`);
      console.log(data);
      addWords(input.value, translation);
    })
    .catch(error => {
      console.error('Ошибка при выполнении запроса:', error);
    });
}
