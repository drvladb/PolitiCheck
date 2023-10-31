const ENDPOINT = "https://cac.vladb.xyz"; // Dev: http://localhost:5000

const getPrediction = async (text: string): Promise<{ prediction: string }> => {
  return new Promise((resolve, reject) => {
    fetch(ENDPOINT + "/predict", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    })
      .then((d) => d.json())
      .then((d) => {
        resolve(d);
      })
      .catch((e) => reject(e));
  });
};

const testConnectivity = async (): Promise<{ message: string }> => {
  return new Promise((resolve, reject) => {
    fetch(ENDPOINT + "/ping")
      .then((d) => d.json())
      .then((d) => {
        resolve(d);
      })
      .catch((e) => reject(e));
  });
};

export { ENDPOINT, getPrediction, testConnectivity };
