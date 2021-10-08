import {typeError} from '/constants.js'
function logger(message , type = typeError)
{
    console[type](message);
}

export default logger;