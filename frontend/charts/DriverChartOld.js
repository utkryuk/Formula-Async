import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const sdk = new ChartsEmbedSDK({
  baseUrl: "https://charts.mongodb.com/charts-project-0-fijle",
});

const chart = sdk.createChart({
  chartId: "1ea142fc-39cb-40ad-9cdf-7c60adc672fd",
  height: '600px', width: '800px', theme: "dark", autoRefresh: true, filter: {"year": year}
});

const DriverChart = () => {

    var set_of_years = []
  for(var i= 2000 ; i < 2022; i+=1 ){
    set_of_years.push(i)
  }

  await chart.render(document.getElementById("chart"));

  document.getElementById("refresh").addEventListener("click", () => {
    chart.refresh();
  });

  document
    .getElementById("year-filter")
    .addEventListener("change", async (e) => {
      const year = e.target.value;
      const currentFilterDOM = document.getElementById("currentFilter");
      if (year) {
        await chart.setFilter({ "year": year });
        const filter = await chart.getFilter();
        currentFilterDOM.innerText = JSON.stringify(filter);
      } else {
        await chart.setFilter({ "year": 2021}); //default
        const filter = await chart.getFilter();
        currentFilterDOM.innerText = JSON.stringify(filter);
      }
    });

  document
    .getElementById("themeSwitch")
    .addEventListener("change", async function () {
      if (this.checked) {
        await chart.setTheme("dark");
        document.body.classList.toggle("dark-mode", true);
      } else {
        await chart.setTheme("light");
        document.body.classList.toggle("dark-mode", false);
      }

      var currentTheme = await chart.getTheme();
      document.getElementById("currentTheme").innerText = currentTheme;
    });

    return (<div></div>)

}
export default DriverChart;
