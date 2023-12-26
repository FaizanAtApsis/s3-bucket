

const { HttpStatusCode } = require("axios");
class GenericMethods {
  static response(
    message,
    error,
    data = [],
    res,
    statusCode = HttpStatusCode.Ok
  ) {
    if (!res) {
      return data;
    }
    return res.status(statusCode).json({
      nonce: new Date().getTime(),
      status: statusCode,
      msg: message,
      error: error,
      data,
    });
  }

 

  static makeQueryLimits(req) {
    const query = req.query;
    if ("limit" in query && "page" in query) {
      query.limit = parseInt(query.limit, 10) || 10;
      query.page = parseInt(query.page, 10) + 1 || 1;
      query.offset = query.limit * (query.page - 1);
    }
    return query;
  }

 

  static async GetAllData(model, query, res = null, order) {
    try {
      const data = await model.findAndCountAll({
        // raw: true,
        ...query,
        distinct: true,
        order: order ? order : [["createdAt", "DESC"]],
      });
      return this.response(
        "Data Fetched Successfully!",
        null,
        data,
        res,
        200
      );
    } catch (error) {
      console.log(error);
      return this.response(
        "Data Fetch Error!",
        true,
        [],
        res,
        500
      );
    }
  }

  static async CreateData(model, body, req, res = null) {
    try {
      const data = await model.create(
        {
          ...body,
          // created_by_email: req.user.email,
          // created_by_dn: req.user.first_name,
        },
        {
          individualHooks: true,
          returning: true,
        }
      );
      return this.response(
        "Data Inserted Successfully!",
        null,
        data.dataValues,
        res,
        200
      );
    } catch (error) {
      console.log(error);
      return this.response(
        "Data Insertion Error!",
        true,
        [],
        res,
        500
      );
    }
  }

  static async GetSingleData(model, query, res = null) {
    const data = await model.findOne({
      ...query,
      order: [["createdAt", "DESC"]],
    });
    return this.response(
      "Data Fetched Successfully!",
      null,
      data,
      res,
      200
    );
  }

  static async CreateDatabulk(model, body, res = null) {
    try {
      await model
        .bulkCreate([...body], {
          individualHooks: true,
          returning: true,
        })
        .then((response) => {
          return this.response(
            "Bulk Data Inserted Successfully!",
            null,
            response,
            res,
            200
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      return this.response(
        "Bulk Data Insertion Error!",
        true,
        [],
        res,
        500
      );
    }
  }

  static async UpdateData(model, body, query, req, res = null, msg) {
    var previous_datas = await model.findOne({ ...query });
    query = { ...query, previous_datas };
    if (req) {
      query = { ...query, previous_datas, req };
    }
    await model
      .update(
        {
          ...body,
          // updated_by_dn: req.user.first_name,
          // updated_by_email: req.user.email,
        },
        { ...query },
        {
          individualHooks: true,
        }
      )
      .then((response) => {
        return this.response(
          "Data Updated Successfully!",
          null,
          response,
          res,
          200
        );
      })
      .catch(function (error) {
        console.log(error);
        return this.response(
          "Data Update Error!",
          true,
          [],
          res,
          500
        );
      });
  }

  static async DeleteData(model, query, req, res, msg) {
    await model.destroy({
      ...query,
      individualHooks: true,
      req,
    });

    return this.response(
      "Deleted Succesfully!",
      true,
      [],
      res,
      200
    );
  }

  

 

}
module.exports = GenericMethods;
