import dotenv from 'dotenv/config';

import { GoogleGenerativeAI } from "@google/generative-ai";

import { FunctionDeclarationSchemaType } from '@google/generative-ai';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const funcoes = {
    taxaJurosParcelamento:({ value }) =>{
        const meses = typeof(value) === "String" ? parseInt(value) : value;
        if (meses <= 6) {
            return 3;
        } else if (meses <= 12) {
            return 5;
        } else if (meses <= 24) {
            return 7;
        }
    }
};

const tools = [
    {
      functionDeclarations: [
        {
          name: "taxaJurosParcelamento",
          description: "Sempre que solicitado retorne o valor em percentual da taxa de juros baseada na quantidade de meses que o usuário solicitou",
          parameters: {
            type: FunctionDeclarationSchemaType.OBJECT,
            properties: {
              value: { type: FunctionDeclarationSchemaType.NUMBER },
            },
            required: ["value"],
          },
        },
      ],
    },
  ];

  const model = genAI.getGenerativeModel(
    { model: process.env.MODEL_NAME, tools },
    {apiVersion: 'v1beta'}
  );

let chat;

function inicializaChat(){
    console.log('teste')
    chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Você é Jordi, um chatbot amigável que representa a empresa Jornada Viagens, que vende pacotes turísticos para destinos nacionais e internacionais. Você pode responder mensagens que tenham relação com viagens." }],
      },
      {
        role: "model",
        parts: [{ text: "Olá! Obrigado por entrar em contato com o Jornada Viagens. Antes de começar a responder sobre suas dúvidas, preciso do seu nome e endereço de e-mail." }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000,
    },
  })
};

export { chat, inicializaChat, funcoes };

