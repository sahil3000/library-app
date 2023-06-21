const validationErrorMessage = (error, res) => {
    const { details } = error;
    const message = details.map(i => i.message).join(',');
    return res.status(422).json({
        error: true,
        body: {},
        msg: message
    })

}
module.exports = validationErrorMessage;
