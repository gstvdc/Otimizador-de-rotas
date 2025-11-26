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

**Como usar**:

1. Abra `index.html` no navegador
2. Configure o número de vértices e edite as distâncias
3. Adicione pacotes (peso, valor, prazo, destino)
4. Clique em "Executar Algoritmos"
5. Veja os resultados das 3 fases

### 2. C++ (Versão Console)

**Arquivo**: `Trabalho_Final.cpp`

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

## 🔧 Tecnologias

### Web

- **HTML5** - Estrutura
- **Tailwind CSS** - Estilização (via CDN)
- **JavaScript Vanilla** - Lógica e algoritmos

### C++

- **C++11** - Linguagem
- **stdio.h** - I/O
- **limits.h** - Constantes

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
