from fastapi import FastAPI, HTTPException, Request
import httpx
import os
import uvicorn
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv('.env')
app = FastAPI()
# CORS設定を追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)

@app.post('/api/translate/')
async def translate_code(request: Request):
    # OpenAI APIキーを環境変数から読み込む
    api_key = os.environ.get('OPENAI_API_KEY')
    try:
        data = await request.json()
        input_text = data['input']
        print(input_text)
        target = data['target']
        prompt = f'Please convert the following program to {target} language\n\n{input_text}'

        async with httpx.AsyncClient() as client:
            response = await client.post('https://api.openai.com/v1/chat/completions', 
                headers={
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {api_key}',
                },
                json={
                    'model': 'gpt-3.5-turbo',
                    'messages': [{'role': 'system', 'content': prompt}],
                    'max_tokens': 50,
                }, 
            )
        
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail='API request failed')

        result = response.json()
        translation = result['choices'][0]['message']['content']
        return {'translation': translation}

    except Exception as e:
        raise HTTPException(status_code=500, detail='Internal Server Error')

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=3000)
