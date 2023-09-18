# 编程语言转换器

将编程语言转换为其他编程语言

本项目使用了 gpt-3.5-turbo 模型。

您需要 OpenAI 的 API 密钥。

![image](https://github.com/fog-zs/code-converter/assets/38463346/3cacc20a-582f-4794-b6b3-5c443b99b939)


## 如何使用

要使用此代码转换器，您需要按照以下步骤进行设置和操作：

### 1. 获取 OpenAI API 密钥

首先，您需要获得 OpenAI 的 API 密钥。这个密钥是访问 gpt-3.5-turbo 模型的必要凭据。

### 2. 创建 .env 文件

在项目目录下创建一个名为 `.env` 的文件，并在其中填写您的 API 密钥，如下所示：

`code-converter-server/.env`
```
OPENAI_API_KEY=您的 API 密钥
```

### 3. 启动服务器

使用以下命令来启动代码转换器的服务器：

```
python main.py
```

### 4. 启动 Web 展示端

要在 Web 上使用代码转换器，您可以使用以下命令启动 Web 展示端：

```
npm run develop
```

这样，您就可以通过浏览器访问代码转换器的用户界面，并开始将代码从一种编程语言转换为另一种编程语言。

## 注意事项

请确保您的 API 密钥保持私密，不要分享给他人。
