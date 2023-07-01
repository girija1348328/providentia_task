const taskModel = require("../models/taskModel")


const createTask = async function (req, res) {
  try {
    const data = req.body
    let validUserId = req.decodedToken.userId

    if (data.userId != validUserId) return res.status(403).send({ status: false, message: "Error, authorization failed" });

    const create = await taskModel.create(data);
    return res.status(200).send({ status: true, message: "task created successfully", data: create })
}
  catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

const findOneTask = async function (req, res) {
  try {
    const filter = req.params.id
    
    // Find a single todo in the Todos collection by the provided id
    const result = await taskModel.findOne({ _id: filter });

    // Check if a todo was found
    if (!result) {
      // If no todo was found, set the response status to 404 (Not Found)
      res.status(404)
    }
    return res.status(200).send({ status: true, data: result })
  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }

}


const updateTask = async function (req, res, next) {
  try {

    let validUserId = req.decodedToken.userId
    if (req.body.userId != validUserId) return res.status(403).send({ status: false, message: "Error, authorization failed" });

    // Find a single todo in the Todos collection by the provided id and update it
    const result = await taskModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        returnDocument: 'after',
      }
    );

    // Check if a todo was found and updated
    if (!result) {
      // If no todo was found, set the response status to 404 (Not Found)
      res.status(404);

      // Throw an error with a descriptive message
      throw new Error(`Todo with id "${req.params.id}" not found.`);
    }

    // Return the updated todo as JSON response
    res.json(result);
  } 
  catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

const deleteTask = async function (req, res, next) {
  try {
    // Find a single todo in the Todos collection by the provided id and delete it
    const result = await taskModel.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });

    // Check if a todo was found and deleted
    if (!result) {
      // If no todo was found, set the response status to 404 (Not Found)
      res.status(404);

      // Throw an error with a descriptive message
      throw new Error(`Todo with id "${req.params.id}" not found.`);
    }

    // Set the response status to 204 (No Content) to indicate successful deletion
    res.status(204).end();
  }
   catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

const findAllTask = async function (req, res, next) {
  try {
    
    const { status, search } = req.query;
    const filter = {};

    // Filter by status if provided
    if (status) {
      if (status === 'true' || status === 'false') {
        // Convert status string to boolean
        filter.status = status === 'true';
      }
    }
    
    // Search by title or description if provided
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex }
      ];
    }

    // Query the Todos collection with the filter
    const todos = await taskModel.find(filter);

    // Return the filtered todos as JSON response
    res.json(todos);
  } 
  catch (error) {
    return res.status(500).send({ status: false, message: error.message });;
  }
}


module.exports = { createTask, findOneTask, updateTask, deleteTask, findAllTask }