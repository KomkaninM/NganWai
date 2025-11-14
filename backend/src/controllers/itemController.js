import Item from "../models/itemModel.js";

/** @type {import("express").RequestHandler} */
export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

/** @type {import("express").RequestHandler} */
export const getItems = async (req, res) => {
  const items = await Item.find();

  res.status(200).json(items);
};

/** @type {import("express").RequestHandler} */
export const deleteItem = async (req, res) => {
  // TODO2: implement this function
  // HINT: you can serve the internet and find what method to use for deleting item.
  // res.status(501).send("Unimplemented");
  try {
     const { id } = req.params;

     if (!id){
      return res.status(400).json({error : "Missing item ID"});
     }

     const deletedItem = await Item.findByIdAndDelete(id);
     
     if (!deletedItem) {
      return res.status(404).json({error : "Item not found"});
     }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal server error."});
  }
};

/** @type {import("express").RequestHandler} */
export const filterItems = async (req, res) => {
  // TODO3: implement this filter function
  // WARNING: you are not allowed to query all items and do something to filter it afterward.
  // Otherwise, you will be punished by -0.5 scores for this part
  // res.status(501).send("Unimplemented");
  try {
    console.log("filter name:", req.query.name);
    const { name, minPrice, maxPrice} = req.query;

    const query = {};

    if (name && name !== "ทั้งหมด") {
      query.name = name;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const items = await Item.find(query);
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};
