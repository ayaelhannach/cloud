const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Acces refuse' });

  const tokenWithoutBearer = token.split(" ")[1]; 
  try {
    const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide' });
  }
};
