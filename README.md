# 🚚 Otimizador de Rotas de Entrega

Trabalho Final de Algoritmos e Estrutura de Dados implementando três algoritmos clássicos para resolver um problema real de otimização de entregas.

## 📋 Sobre o Projeto

Este projeto implementa um sistema completo para otimizar rotas de entrega combinando:

1. **Programação Dinâmica** - Problema da Mochila 0/1
2. **Algoritmo Guloso** - Ordenação por Prazo
3. **Algoritmo de Dijkstra** - Caminho Mínimo

O sistema seleciona quais pacotes transportar (respeitando a capacidade do veículo), ordena as entregas por urgência e calcula a rota de menor custo.

## 🎯 Como Funciona

### Fase 1: Programação Dinâmica (Mochila 0/1)

Seleciona os pacotes que maximizam o valor total respeitando a capacidade da mochila.

- **Entrada**: Lista de pacotes (peso, valor, prazo, destino) + capacidade
- **Saída**: Conjunto ótimo de pacotes
- **Complexidade**: O(n × W) onde n = quantidade de pacotes, W = capacidade

```
Exemplo:
Pacote 1: peso=3, valor=100
Pacote 2: peso=4, valor=40
Capacidade: 10

Resultado: Pacotes 1 e 2 selecionados (valor total = 140)
```

### Fase 2: Algoritmo Guloso (Ordenação por Prazo)

Ordena os pacotes selecionados por prazo de entrega (menor prazo primeiro).

- **Entrada**: Pacotes selecionados
- **Saída**: Sequência ordenada por urgência
- **Complexidade**: O(n²) ou O(n log n) com merge sort

```
Exemplo:
Pacote A: prazo = 3 dias
Pacote B: prazo = 1 dia
Pacote C: prazo = 2 dias

Ordem: B → C → A
```

### Fase 3: Algoritmo de Dijkstra (Caminho Mínimo)

Calcula o caminho com menor distância entre vértices do grafo.

- **Entrada**: Grafo de distâncias + sequência de entregas
- **Saída**: Rota completa com custos
- **Complexidade**: O(V² + m × V²) onde V = vértices, m = entregas

```
Exemplo:
Rota: V0 → V2 → V4 → V1
Distâncias: 9 + 2 + 6 = 17 km
```

## 💻 Versões Disponíveis

### 1. HTML + Tailwind CSS (Versão Web)

**Arquivo**: `index.html`, `script.js`

**Recursos**:

- ✅ Interface gráfica interativa
- ✅ Edite a matriz de distâncias em tempo real
- ✅ Adicione/remova pacotes dinamicamente
- ✅ Configure capacidade e depósito
- ✅ Visualize resultados das 3 fases
- ✅ Sem dependências externas (Tailwind via CDN)

**Como usar**:

1. Abra `index.html` no navegador
2. Configure o número de vértices e edite as distâncias
3. Adicione pacotes (peso, valor, prazo, destino)
4. Clique em "Executar Algoritmos"
5. Veja os resultados das 3 fases

### 2. C++ (Versão Console)

**Arquivo**: `Trabalho_Final.cpp`

**Características**:

- ✅ Implementação pura dos algoritmos
- ✅ Saída no console
- ✅ Valores pré-configurados para teste
- ✅ Ideal para análise de complexidade

**Como compilar e executar**:

```bash
# Compilar
g++ -o trabalho Trabalho_Final.cpp

# Executar
./trabalho
```

**Saída esperada**:

```
=== FASE 1: PROGRAMACAO DINAMICA (MOCHILA 0/1) ===
Pacotes selecionados na mochila:
 - peso=3, valor=100, prazo=4, destino=2
 - peso=7, valor=20, prazo=4, destino=1
Valor total carregado: 120

=== FASE 2: GULOSO (ORDENAR POR PRAZO) ===
Ordem de entregas (menor prazo primeiro):
 - destino=2, prazo=4
 - destino=1, prazo=4

=== FASE 3: CAMINHO MINIMO (DIJKSTRA) ===
Caminho 0 -> 2: custo = 9
Caminho 2 -> 1: custo = 4
Custo total da rota final: 13
```

## 📊 Complexidade Computacional

| Algoritmo         | Complexidade | Descrição                   |
| ----------------- | ------------ | --------------------------- |
| **Mochila 0/1**   | O(n × W)     | n = pacotes, W = capacidade |
| **Guloso (Sort)** | O(n²)        | Bubble sort simples         |
| **Dijkstra**      | O(V²)        | V = vértices do grafo       |
| **Total**         | O(n×W + V²)  | Combinação das 3 fases      |

Onde:

- **n** = quantidade de pacotes disponíveis
- **W** = capacidade máxima do veículo
- **V** = número de vértices no grafo
- **m** = número de pacotes selecionados (m ≤ n)

## 📁 Estrutura de Arquivos

```
Projeto_Final_Allan/
├── README.md                  # Este arquivo
├── index.html                 # Versão Web (Tailwind CSS)
├── script.js                  # JavaScript - Algoritmos
├── Trabalho_Final.cpp         # Versão C++ original
├── Complexidade.txt           # Análise de complexidade
└── Grafo_Trabalho_Final.png   # Diagrama do grafo
```

## 🔧 Tecnologias

### Web

- **HTML5** - Estrutura
- **Tailwind CSS** - Estilização (via CDN)
- **JavaScript Vanilla** - Lógica e algoritmos

### C++

- **C++11** - Linguagem
- **stdio.h** - I/O
- **limits.h** - Constantes

## 🎓 Conceitos Aprendidos

✅ Programação Dinâmica (bottom-up)
✅ Algoritmos Gulosos
✅ Algoritmo de Dijkstra
✅ Estruturas de Dados (grafo, vetor)
✅ Análise de Complexidade
✅ Implementação Web com JavaScript
✅ Design Responsivo (Tailwind CSS)

## 📝 Exemplos de Uso

### Exemplo 1: Entrega Rápida

```
Configuração:
- Capacidade: 15
- Depósito: 0
- Pacotes: 5 (com diferentes prazos)

Resultado:
Fase 1: 3 pacotes selecionados (valor = 180)
Fase 2: Ordenados por urgência
Fase 3: Rota ótima com custo = 24 km
```

### Exemplo 2: Maximizar Valor

```
Configuração:
- Capacidade: 20
- Depósito: 2
- Pacotes: 8 (variados)

Resultado:
Fase 1: 4 pacotes selecionados (valor = 280)
Fase 2: Ordenação por prazo
Fase 3: Custo total = 35 km
```

## 🚀 Como Testar

### Web

```
1. Abrir index.html no navegador
2. Alterar número de vértices (2-10)
3. Editar matriz de distâncias
4. Adicionar 3-5 pacotes
5. Clicar "Executar"
6. Analisar resultados
```

### C++

```
1. Compilar: g++ -o trabalho Trabalho_Final.cpp
2. Executar: ./trabalho
3. Analisar saída no console
4. Modificar valores em main() conforme necessário
5. Recompilar e testar
```

## 💡 Melhorias Possíveis

- 🔄 Adicionar algoritmo A\* para rotas mais otimizadas
- 📈 Gráfico visual do grafo e rota
- 💾 Exportar resultados em PDF/CSV
- 🎯 Validação de entrada mais robusta
- ⚡ Usar heap para Dijkstra (O(E log V))
- 🧬 Implementar algoritmo genético para otimização

## 📚 Referências

- [Dynamic Programming - GeeksforGeeks](https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-15/)
- [Dijkstra's Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- [Greedy Algorithms - MIT OpenCourseWare](https://ocw.mit.edu/)

## 👤 Autor

Trabalho Final - Algoritmos e Estrutura de Dados
Novembro de 2025

---

**Nota**: Este projeto foi desenvolvido como trabalho acadêmico para demonstrar a aplicação prática de algoritmos clássicos em um problema de otimização real.
