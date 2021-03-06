
const STATUSES = {
    ERROR: 'error',
    SUCCESS: 'ok'
}

const successResponse = (data, meta = null) => {
    return {
        meta: { ...meta, status: STATUSES.SUCCESS },
        data
    }
}

const failedResponse = (error) => {
    return {
        meta: { status: STATUSES.ERROR, error },
        data: null
    }
}

module.exports = {
    successResponse,
    failedResponse
};
