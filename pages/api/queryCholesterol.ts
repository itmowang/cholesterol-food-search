import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

type Data = {
    result?: string;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { foodName } = req.body;
    if (!foodName || typeof foodName !== 'string') {
        return res.status(400).json({ error: 'Invalid food name' });
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const model = '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b';
    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;

    //   const prompt = `请告诉我关于${foodName}的胆固醇含量和摄入建议。`;
    const messages = [
        { role: "system", content: `你是高级营养顾问，专注提供食物胆固醇含量及摄入建议。输入变量为${foodName}。输出内容必须满足以下要求：1. 全部书面化表达，禁止使用“好的”、“好”等口语化词语；2. 回答中不包含任何冠词；3. 数据及建议必须权威、准确，无歧义，杜绝错误及混乱；4. 严格依据权威营养学标准，客观中立，必要时提供科学依据；5. 格式简洁明了，仅限于所需信息，无多余修饰词。` },
        { role: "user", content: `告诉我关于${foodName}的胆固醇含量和摄入建议` },
    ];

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages,
            }),
        });


        console.log(response,666);
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json() as any;
        
        
        const result = data!.result.response;

        if (!result) {
            throw new Error('No valid response from AI model.');
        }

        res.status(200).json({ result });
    } catch (error) {
        console.error('Error querying AI model:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
