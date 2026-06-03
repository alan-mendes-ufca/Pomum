# Pomum

Pomum é um jogo online educacional em canvas, onde múltiplos clientes se conectam a uma arena compartilhada para coletar frutas. Cada entidade é representada por um pixel, e vence quem acumular mais frutas até o fim da partida.

## Arquitetura

```
┌─────────────────────┐         ┌──────────────────────────┐
│   FRONT-END         │         │   BACK-END (Express)     │
│                     │  HTTP   |   WebSocket Server       |
│  Canvas / Render    │ ──────► |                          |
│  Input Handler      │         │  Game State (remoto)     │
│  Game State (local) |   WS    │  (posições, frutas,      │
│  WebSocket Client   │ ◄─────► │   colisão, placar)       │
└─────────────────────┘         └──────────────────────────┘
```

## Organização de pastas e arquivos

```
pomum/
│
├── public/                         # Front-end (arquivos estáticos)
│   ├── index.html
│   └── models/
│
└── server.js                        # Back-end (Express + Socket.io)
```

## TODO

- `Tratar quedas de conexão e evitar a duplicação de listeners`: Quando a conexão cai e o usuário se reconecta, o processo de setup é reexecutado e acaba registrando múltiplos observers idênticos (como o do teclado e do multiplayer), duplicando os comandos. O desafio é estender o design pattern Observer adicionando uma função para remover a inscrição (unsubscribe) antes de registrar novos ouvintes.

- `Sistema de pontuação`: Desenvolver e integrar um sistema de contagem de pontos diretamente no state dos jogadores.

- `Efeitos sonoros`: Fazer com que o jogo emita um efeito sonoro comum a cada ponto marcado e um som diferente e especial a cada 100 pontos acumulados [00:28:03].
- Teletransporte nas bordas da tela (Efeito Pac-Man): Modificar a física do mapa para que, em vez de colidir e parar nas paredes do canvas, os jogadores sejam teletransportados para o extremo oposto, gerando novas possibilidades estratégicas no jogo.

- `Isolar funções anônimas`: Retirar funções anônimas que ficaram espalhadas pelo código principal e organizá-las em módulos separados, com foco especial nas partes voltadas para a comunicação de rede (networking).

- `Filtragem e validação de comandos`: Filtrar os comandos do sistema de entrada do teclado que são enviados para o servidor, permitindo que a camada do jogo defina de forma clara quais ações são aceitas.

- `Manutenção do Boilerplate`: Deixar o repositório estruturado para fornecer um container com uma versão sempre limpa, correta e atualizada do projeto base.
