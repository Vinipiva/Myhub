# CLAUDE.md — Regras do projeto Myhub

## Regra principal: zero slop, zero invenção

**Nunca invente dados, métricas, histórias, nomes de empresas, datas, resultados ou qualquer informação que o usuário não tenha fornecido explicitamente.**

Se uma informação não existe no conteúdo fornecido (arquivos, mensagens, documentos):
- **Pergunte** antes de escrever.
- Se for preencher um campo e não souber o valor, use `""` ou omita — nunca invente um placeholder realista.
- "Cerca de 30%" inventado é slop. Pergunte qual é o número real.

## O que conta como slop proibido

- Métricas fabricadas (ex: "+42% conversion rate" sem fonte real)
- Nomes de stakeholders, PMs, designers inventados
- Citações ou frases atribuídas ao usuário que ele não disse
- Resumos que distorcem o que foi dito na entrevista/documento
- Tags, períodos, descrições de projeto não confirmados
- Qualquer coisa que "soa bem" mas não veio do usuário

## Quando há dúvida

Pergunte diretamente:

> "Você mencionou ~27% de aumento na adoção — quer usar esse número ou prefere deixar em aberto por enquanto?"

> "Qual foi o período exato desse projeto? Não quero inventar."

## Estrutura de cases (referência)

Cada case segue o framework: **Problem → Approach → Tradeoffs → Outcome → Retrospective**

- **Problem**: quem estava com dor e o quanto
- **Approach**: o que foi tentado, o que foi cortado
- **Tradeoffs**: o que foi recusado e por quê (diferencia senior de mid)
- **Outcome**: o que foi entregue — resultado, não output
- **Retrospective**: o que mudaria com as mesmas constraints

Preencha apenas com o que o usuário confirmou. Campos vazios são melhores que campos inventados.
