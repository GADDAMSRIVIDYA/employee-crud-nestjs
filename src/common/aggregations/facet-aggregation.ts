async function getCommonList(
  model,
  pagination = false,
  from = 0,
  to = 10,
  filter: any = {},
  sort: any = {}
) {
  const pipeline: any[] = [];

  // Apply filter if exists
  if (Object.keys(filter).length) {
    pipeline.push({ $match: filter });
  }

  // Apply sort
  pipeline.push({ $sort: Object.keys(sort).length ? sort : { empNumber: 1 } });

  if (pagination) {
    // Pagination using $facet
    pipeline.push({
      $facet: {
        total: [{ $count: "count" }],
        data: [
          { $skip: from },
          { $limit: to - from }
        ]
      }
    });

    const result = await model.aggregate(pipeline);
    return {
      total: result[0]?.total[0]?.count || 0,
      data: result[0]?.data || []
    };

  } else {
    // Pagination = false → return all filtered documents
    const data = await model.aggregate(pipeline); // no skip/limit
    const total = data.length;
    return { total, data };
  }
}

export { getCommonList };
