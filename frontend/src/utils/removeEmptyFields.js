const removeEmptyFields = (data) => {
    let dataToTouch = {...data};
    Object.keys(dataToTouch).forEach(key => {
        if (dataToTouch[key] === '' || dataToTouch[key] == null) {
            delete dataToTouch[key];
        }
    });
    return dataToTouch;
}

export default removeEmptyFields;