exports.success = function(req, res, msg = '', status = 200) {
    res.status(status).send({
        error: false,
        status: status,
        body: msg,
        severity: 'success'
    }
    )
}

exports.error = function(req, res, msg, status) {

    const codeStatus = status || 500
    const codeMsg = msg || 'Internal Server Error'

    res.status(codeStatus).send({
        error: false,
        status: codeStatus,
        body: codeMsg,
        severity: 'Error'
    }
    )
}