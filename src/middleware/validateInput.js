// ============================================================
//  validateInput – Nettoyage et validation des champs POST
// ============================================================

export const validateInput = (req, res, next) => {
  const dangerous = /<script|<\/script>|SELECT|INSERT|DELETE|UPDATE|DROP|--/gi;

  for (const key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = req.body[key].trim();

      if (dangerous.test(req.body[key])) {
        return res.status(400).json({
          message: `Champ "${key}" contient des caractères interdits.`,
        });
      }
    }
  }

  next();
};
