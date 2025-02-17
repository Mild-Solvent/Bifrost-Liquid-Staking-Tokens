import OpenAI from 'openai';

export const explainStaking = async (question: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
  });

  return openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: `Explain ${question} using analogies about digital vaults and gems:`
    }]
  });
};