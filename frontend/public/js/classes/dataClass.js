class ApiClass {
  constructor() {
    this.api = async function (url) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };
  }

  getDefaultData() {
    const url = 'http://127.0.0.1:8000/';
    this.api(url).then((d) => console.log(d.endpoint));
  }

  getDataByDate(date) {
    const url = `http://127.0.0.1:8000/date/${date}`;
    this.api(url).then((d) => {
      // console.log(d);
      return d;
    });
  }

  getDataByNumbers(numbers) {
    const url = `http://127.0.0.1:8000/numbers/${numbers}`;
    this.api(url).then((d) => console.log(d.endpoint));
  }
}

const t = new ApiClass();

t.getDataByDate(2024).then();
// t.getDataByDate(2021);
// t.getDataByDate(2008);
