#include <stdio.h>
#include <limits.h>

#define N_VERT 6 //n�meros de v�rtices
#define INF 999999 //aus�ncia de liga��o entre n�s

// ------------------------ GRAFO------------------------
int grafo[N_VERT][N_VERT] = {
    {0,   7,   9, INF, INF, 14},
    {7,   0,  10,  15,   6, INF}, 
    {9,  10,   0,  11, INF,  2},
    {INF,15,  11,   0,   6, INF},
    {INF,  6, INF,   6,   0,  9},
    {14, INF,  2, INF,   9,  0}
};


typedef struct {
    int peso;
    int valor;
    int prazo;
    int destino; // v�rtice do grafo
} Pacote;

// ------------------------ DIJKSTRA ------------------------
int menorDist(int dist[], int visited[]) {
    int min = INF, idx = -1;
    for (int i = 0; i < N_VERT; i++) {
        if (!visited[i] && dist[i] < min) {
            min = dist[i];
            idx = i;
        }
    }
    return idx;
}

int dijkstra(int origem, int destino) {
    int dist[N_VERT];
    int visited[N_VERT] = {0};

    for (int i = 0; i < N_VERT; i++) dist[i] = INF;
    dist[origem] = 0;

    for (int i = 0; i < N_VERT; i++) {
        int u = menorDist(dist, visited);
        if (u == -1) break;
        visited[u] = 1;

        for (int v = 0; v < N_VERT; v++) {
            if (!visited[v] && grafo[u][v] != INF &&
                dist[u] + grafo[u][v] < dist[v]) {
                dist[v] = dist[u] + grafo[u][v];
            }
        }
    }

    return dist[destino];
}

// ------------------------ MOCHILA (PD) ------------------------
int mochila(Pacote p[], int n, int capacidade, int selecionados[]) {
    int dp[n+1][capacidade+1];

    // zera selecionados
    for (int i = 0; i < n; i++) selecionados[i] = 0;

    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= capacidade; w++) {
            if (i == 0 || w == 0) {
                dp[i][w] = 0;
            } else if (p[i-1].peso <= w) {
                int sem = dp[i-1][w];
                int com = p[i-1].valor + dp[i-1][w - p[i-1].peso];
                dp[i][w] = (sem > com) ? sem : com;
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }

    // reconstr�i solu��o
    int w = capacidade;
    for (int i = n; i > 0; i--) {
        if (dp[i][w] != dp[i-1][w]) {
            selecionados[i-1] = 1;
            w -= p[i-1].peso;
        }
    }

    return dp[n][capacidade];
}

// ------------------------ GULOSO: ORDENAR POR PRAZO ------------------------
void ordenarPrazo(Pacote p[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i+1; j < n; j++) {
            if (p[j].prazo < p[i].prazo) {
                Pacote aux = p[i];
                p[i] = p[j];
                p[j] = aux;
            }
        }
    }
}

// ------------------------ MAIN ------------------------
int main() {
    // Pacotes de exemplo (NENHUM vai para o v�rtice 3)
    Pacote pac[5] = {
        {3, 100, 4, 2}, // peso, valor, prazo, destino
        {4, 40, 2, 5},
        {5, 30, 3, 4}, 
        {6, 50, 1, 4},
        {7, 20, 4, 1}
    };

    int n = 5;
    int capacidade = 10;
    int selecionados[5];

    printf("=== FASE 1: PROGRAMACAO DINAMICA (MOCHILA 0/1) ===\n");
    int valorTotal = mochila(pac, n, capacidade, selecionados);

    // Monta vetor s� com os pacotes selecionados
    Pacote escolhidos[5];
    int m = 0;
    for (int i = 0; i < n; i++) {
        if (selecionados[i]) {
            escolhidos[m++] = pac[i];
        }
    }

    printf("Pacotes selecionados na mochila:\n");
    for (int i = 0; i < m; i++) {
        printf(" - peso=%d, valor=%d, prazo=%d, destino=%d\n",
               escolhidos[i].peso,
               escolhidos[i].valor,
               escolhidos[i].prazo,
               escolhidos[i].destino);
    }
    printf("Valor total carregado: %d\n\n", valorTotal);

    printf("=== FASE 2: GULOSO (ORDENAR POR PRAZO) ===\n");
    ordenarPrazo(escolhidos, m);

    printf("Ordem de entregas (menor prazo primeiro):\n");
    for (int i = 0; i < m; i++) {
        printf(" - destino=%d, prazo=%d\n",
               escolhidos[i].destino,
               escolhidos[i].prazo);
    }

    printf("\n=== FASE 3: CAMINHO MINIMO (DIJKSTRA) ===\n");
    int deposito = 0;
    int atual = deposito;
    int custoTotal = 0;

    for (int i = 0; i < m; i++) {
        int dest = escolhidos[i].destino;
        int custo = dijkstra(atual, dest);
        printf("Caminho %d -> %d: custo = %d\n", atual, dest, custo);
        custoTotal += custo;
        atual = dest;
    }

    printf("\nCusto total da rota final: %d\n", custoTotal);

    return 0;
}

