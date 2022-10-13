const fetchItem = async (idProduto) => {
  const url = `https://api.mercadolibre.com/items/${idProduto}`;

  if (idProduto === undefined) {
    return new Error('You must provide an url');
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
