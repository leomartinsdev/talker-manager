const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  if (talk.rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  next();
};

module.exports = validateTalk;