const createProduct = async (req, res) => {
  res.send('create product');
}

const getAllProduct = async (req, res) => {
  res.send('get all products');
}

const getSingleProduct = async (req, res) => {
  res.send('get single product');
}

const updateProduct = async (req, res) => {
  res.send('update product');
}

const deleteProduct = async (req, res) => {
  res.send('delete product');
}

const uploadImage = async (req, res) => {
  res.send('upload image');
}

module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage
}