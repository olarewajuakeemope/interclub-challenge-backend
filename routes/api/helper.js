function handleDate(date) {
  let dateFilter = new Date();
  if (date === 'Last Week') {
    dateFilter.setDate(dateFilter.getDate() - 7);
  } else if (date === 'Last Day') {
    dateFilter.setDate(dateFilter.getDate() - 1);
  } else {
    return false;
  }
  dateFilter = dateFilter.toISOString();
  return { $gte: new Date(dateFilter) };
}

function filterQuery(query) {
  const { type } = query;
  let { date } = query;
  let filter;
  if (type && type !== '0') {
    if (type === 'all day') {
      filter = {};
    } else {
      filter = { type };
    }
  }
  if (date && date !== '0') {
    date = handleDate(date);
    filter = date ? { date, ...filter } : filter;
  }
  return filter;
}

module.exports = { filterQuery };
