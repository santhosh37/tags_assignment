const tagSchema = require("./../models/tagModel");

const tagController = {};

/*
This method used to get all the tags list.
*/
tagController.list = async (request, response) => {
  let searchKeyword = "";
  let fetchLimit = "";
  let sortOrder = "";

  if (request.query !== null) {
    const searchRequest = request.query.search;
    const limitRequest = request.query.limit;
    const sortRequest = request.query.sort;

    if (searchRequest && searchRequest.trim().length > 0) {
      searchKeyword = searchRequest;
    }

    if (limitRequest && limitRequest > 0) {
      fetchLimit = limitRequest;
    }

    if (sortRequest && sortRequest.trim().length > 0) {
      sortOrder = sortRequest;
    }
  }

  console.log(fetchLimit);
  console.log(searchKeyword);
  console.log(sortOrder);

  const tagsList = await tagSchema
    .find({
      $or: [
        { _id: { $regex: searchKeyword, $options: "i" } },
        { name: { $regex: searchKeyword, $options: "i" } },
        { description: { $regex: searchKeyword, $options: "i" } },
        // { status: { $regex: keyword, $options: "i" } },
      ],
    })
    .sort(sortOrder)
    .limit(fetchLimit);

  return response.json({
    status: "Success",
    tags: tagsList,
  });
};

/*
This method used to create a new record.
*/
tagController.create = async (request, response) => {
  try {
    tagSchema.create(request.body);
    return tagController.list(request, response);
  } catch (error) {
    return response.json({
      statusCode: error.statusCode,
      message: error.message,
    });
  }
};

/*
This method used to update fields by findById.
*/
tagController.update = async (request, response) => {
  const { _id: id, ...updatedFields } = request.body;

  tagSchema
    .findByIdAndUpdate(id, updatedFields)
    .then(() => {
      return tagController.list(request, response);
    })

    .catch((error) => {
      return response.json({
        statusCode: error.statusCode,
        message: error.message,
      });
    });
};

/*
This method used to delete fields by findById.
*/
tagController.delete = async (request, response) => {
  const { _id: id } = request.body;

  tagSchema
    .findByIdAndDelete(id)
    .then(() => {
      return tagController.list(request, response);
    })
    .catch((error) => {
      return response.json({
        statusCode: error.statusCode,
        message: error.message,
      });
    });
};

module.exports = tagController;
