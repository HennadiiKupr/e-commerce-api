const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    require: [true, 'Please provide rating']
  },
  title: {
    type: String,
    trim: true,
    require: [true, 'Please provide review title'],
    maxlength: 100
  },
  comment: {
    type: String,
    require: [true, 'Please provide review comment']
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    require: true
  }
}, { timestamps: true });

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function(product) {
  console.log(product, 'Average Rating Calculated');
}

ReviewSchema.post('save', async function() {
  await this.constructor.calculateAverageRating(this.product);
  console.log('post save');
}) 

ReviewSchema.post('remove', async function() {
  await this.constructor.calculateAverageRating(this.product);
}) 

module.exports = mongoose.model('Review', ReviewSchema);