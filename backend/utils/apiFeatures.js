class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const city = this.queryString.city
      ? {
          city: {
            $regex: this.queryString.city,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...city });
    return this;
  }

  filter() {
    const queryStringCopy = { ...this.queryString };
    const removeFields = ["city"];
    removeFields.forEach((item) => {
      delete queryStringCopy[item];
    });

    let queryStr = JSON.stringify(queryStringCopy);
    const regex = /\b(gt|gte|lt|lte|in)\b/g;
    queryStr = queryStr.replace(regex, "$$" + "$1");

    queryStr = JSON.parse(queryStr);
    //Advance filter for price

    this.query = this.query.find(queryStr);
    return this;
  }
}

module.exports = APIFeatures;
