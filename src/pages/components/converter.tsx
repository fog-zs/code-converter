export const codeConvert = async (input: string, target: string) => {
    const apiUrl = 'http://localhost:3000/api/translate';
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input,
                target,
            }),
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.translation;
    } catch (error) {
        console.error('Error:', error);
        throw error; // エラーを呼び出し元に再スローする
    }
}