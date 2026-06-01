# Pomum

Pomum é um jogo online educacional em canvas, onde múltiplos clientes se conectam a uma arena compartilhada para coletar frutas. Cada entidade é representada por um pixel, e vence quem acumular mais frutas até o fim da partida.

## Arquitetura

```
┌─────────────────────┐         ┌──────────────────────────┐
│   FRONT-END (Vite)  │         │   BACK-END (Express)     │
│                     │  HTTP   │                          │
│  Canvas / Render    │ ──────► │  Rotas REST (auth, lobby)│
│  Input Handler      │         │                          │
│  Game State (local) │   WS    │  WebSocket Server        │
│  WebSocket Client   │ ◄─────► │  (socket.io ou ws)       │
└─────────────────────┘         │                          │
                                │  Lógica do jogo          │
                                │  (posições, frutas,      │
                                │   colisão, placar)       │
                                └──────────────────────────┘
```

## Organização de pastas e arquivos

```
pomum/
│
├── public/                         # Front-end (arquivos estáticos)
│   ├── index.html
│   └── models/
│
└── index.js                        # Back-end (Express + Socket.io)
```
