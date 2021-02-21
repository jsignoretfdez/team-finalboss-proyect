const formatFilters = (filters) => {
    const { name, sale, price, tags } = filters;
    
    const formattedFilters = {};

    if (name) {
      formattedFilters.name = name;
    }
    if (['sell', 'buy'].includes(sale)) {
      formattedFilters.sale = sale === 'sell';
    }
    if (price?.length > 0) {
    //   formattedFilters.price = price?.join('-');
    }
    if (tags?.length > 0) {
      formattedFilters.tags = tags?.join(',');
    }

    return formattedFilters;
};

export default formatFilters;