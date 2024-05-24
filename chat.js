import {chat,funcoes} from "./inicializaChat.js"



export async function executaChat(mensagem) {
  
  const result = await chat.sendMessage(mensagem);
  const response = await result.response;

  if (response.candidates.length === 0){
    throw new error ('No candidates')
  };

  const content = response.candidates[0].content;
  if (content.parts.length === 0){
    throw new error ('No parts')
  }
  
  const fc = content.parts[0].functionCall;
  if (fc){
    const { name, args } = fc;
    const fn = funcoes[name];
    console.log(fc);
    console.log(fn);
    if (!fn){
      throw new Error (`Unknown function ${name}`);
    }

    const fr = {
          functionResponse: {
            name,
            response:{
              name,
              content: funcoes[name](args),
            }
          },
        }
    
    console.log(fr);

    const request2 = [fr];    
    const response2 = await chat.sendMessage(request2);
    console.log(response2);
    
    const result2 = response2.response;
    console.log(result2.text() + 'texto1');
    
    return result2.text();
    
    }else if (text){
      console.log(text + 'texto2');
      return text;
    }

  }

