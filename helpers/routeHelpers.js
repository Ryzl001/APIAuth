const Joi = require("joi");

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      // sprawdzamy czy value istnieje, jeśli nie to tworzymy pusty obiekt
      if (!req.value) {
        req.value = {};
      }
      // tworzymy subobject body i przypisujemy mu result.value, czyli dane po validacji
      req.value["body"] = result.value;

      // dzięki next middleware przejdzie i nie będzie blokować reqestu
      next();
      // req.value.body instead req.body
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    })
  }
};
