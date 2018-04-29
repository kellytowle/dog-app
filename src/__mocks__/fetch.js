export default jest.fn(() => {
        return new Promise((resolve, reject) => {
            resolve({
                message: {
                    "a": [],
                    "b": [],
                    "c": []
                }
            })
    });
});