exports.Register = async function(req, res) {
    try {
        //Validate first
      const newAdmin = await Admin.create(req.body);
      res.send({ msg: "Admin was created successfully", data: newAdmin });
    } 
    catch (error) {
        res.status(400).send({err: "Invalid User details"})
    }
  };