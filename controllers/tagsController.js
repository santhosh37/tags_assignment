const tagSchema = require("./../models/tagModel");

const tagController = {};

/*
This method used to get all the tags list.
*/
tagController.list = async (request, response) => {
  const tagsList = await tagSchema.find();

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
