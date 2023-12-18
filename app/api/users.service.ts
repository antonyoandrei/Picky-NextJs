export const createUser = async (userObject: {}) => {
    const url = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${url}/user`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(userObject)
        });
        const dataFetched = await response.json();
        return dataFetched;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

export const getUserByEmail = async (userEmail: string) => {
    const url = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${url}/user/email/${userEmail}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const dataFetched = await response.json();
        return [response, dataFetched];
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return [null, null];
    }
}
