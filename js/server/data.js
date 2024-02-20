const getData = async (url) => {
  const response = await fetch(url);

  try {
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (err) {
    console.log(err);
    throw new Error(`${response.status} ${response.statusText}`);
  }
};

export {getData};
