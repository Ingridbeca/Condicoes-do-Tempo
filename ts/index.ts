const form = document.querySelector("#search-form > form");
const h2 = document.querySelector(".tempo-dados > h2");
const span = document.querySelector(".tempo-dados > span");

const input: HTMLInputElement | null =
  document.querySelector("#input-localização");
  
const sectionInfos = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionInfos) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("O local precisa ter, pelo menos, 3 letras");
    return;
  }
  try{
    const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=e06329eac585b1d59cc630ab7f7b4729&lang=pt_br&units=metric`
      );
      const dados = await resposta.json();
      console.log(dados);
      const infos = {
        temperatura: Math.round(dados.main.temp),
        local: dados.name,
        icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
      };
      console.log(infos)
      sectionInfos.innerHTML = `            
      <div class="tempo-dados">
      <h2>${infos.local}</h2>
      <span>${infos.temperatura}°C</span>
        </div>
    <img src="${infos.icone}">`;
  }catch(err){
    console.log('Erro na obtenção de dados da API', err);
  }
});
