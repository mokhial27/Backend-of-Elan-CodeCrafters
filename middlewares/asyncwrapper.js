module.exports = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch(next); // Same as .catch(err => next(err))
    };
}