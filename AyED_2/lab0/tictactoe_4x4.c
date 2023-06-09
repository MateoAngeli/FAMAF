#include <stdlib.h>  /* exit() y EXIT_FAILURE */
#include <stdio.h>   /* printf(), scanf()     */
#include <stdbool.h> /* Tipo bool             */

#include <assert.h>  /* assert() */

#define TAM 4
#define CELL_MAX (TAM * TAM - 1)


void print_sep(int length) {
    printf("\t ");
    for (int i=0; i < length;i++) printf("................");
    printf("\n");

}

void print_board(char board[TAM][TAM])
{
    int cell = 0;

    print_sep(TAM);
    for (int row = 0; row < TAM; ++row) {
        for (int column = 0; column < TAM; ++column) {
            printf("\t | %d: %c ", cell, board[row][column]);
            ++cell;
        }
        printf("\t | \n");
        print_sep(TAM);
    }
}


void inicialize(char board[TAM][TAM])
{   int i=0;
    int j=0;
    for (i = 0; i < TAM; i++)
    {
      for (j = 0; j < TAM; j++)
      {
        board[i][j]='-';
      }
      
    }
    
}



char get_winner(char board[TAM][TAM], char turn)
{
    char winner = '-';
    

    /*esto detecta linea horizontal*/
    int i=0;
    int j=0;
    int contador = 0;
    while (i < TAM)
    {
      contador=0;
      for (size_t j = 0; j < TAM; j++)
      {
        if (board[i][j]==turn){
          contador++;
        }
      }
      if (contador==TAM){
        winner = turn;
        return winner;
      }
      i++;
    }

    /*esto detecta linea vertical*/
    j=0;
    contador=0;
    while (j < TAM)
    { 
      contador=0;
      for (size_t i = 0; i < TAM; i++)
      {
        if (board[i][j]==turn){
          contador++;
        }
      }
      if (contador==TAM){
        winner = turn;
        return winner;
      }
      j++;
    }

    //esto detecta diagonal izq a der
    i=0;
    contador=0;
    while (i<TAM){
      if (board[i][i]==turn)
      {
        contador++;
      }
      if (contador==TAM){
        winner = turn;
        return winner;
      }
      i++;
    }

    //esto detechta diagonal der a izq
    i=0;
    contador=0;
    while (i<TAM)
    {
      if (board[i][TAM-1-i]==turn)
      {
        contador++;
      }
      if (contador==TAM){
        winner = turn;
        return winner;
      }
      i++;
    }
    

    return winner;
}

bool has_free_cell(char board[TAM][TAM])
{
    bool free_cell=false;
    
    int j=0;
    int i=0;
    while (j<TAM){
        i=0;
        while (i<TAM){
            if (board[i][j]=='-'){
            free_cell=true;
        } 
            i++;
        
        }
        
        j++;
    }

    return free_cell;
}

int main(void)
{
    printf("TicTacToe [InCoMpLeTo :'(]\n");

    /*char board[3][3] = {
        { '-', '-', '-' },
        { '-', '-', '-' },
        { '-', '-', '-' }
    };*/
    char board[TAM][TAM];
    inicialize(board);

    char turn = 'X';
    char winner = '-';
    int cell = 0;
    while (winner == '-' && has_free_cell(board)) {
        print_board(board);
        printf("\nTurno %c - Elija posición (número del 0 al %d): ", turn,
               CELL_MAX);
        int scanf_result = scanf("%d", &cell);
        if (scanf_result <= 0) {
            printf("Error al leer un número desde teclado\n");
            exit(EXIT_FAILURE);
        }
        if (cell >= 0 && cell <= CELL_MAX) {
            int row = cell / TAM;
            int colum = cell % TAM;
            if (board[row][colum] == '-') {
                board[row][colum] = turn;
                winner = get_winner(board, turn);
                turn = turn == 'X' ? 'O' : 'X';                
            } else {
                printf("\nCelda ocupada!\n");
            }
        } else {
            printf("\nCelda inválida!\n");
        }
    }
    print_board(board);
    if (winner == '-') {
        printf("Empate!\n");
    } else {
        printf("Ganó %c\n", winner);
    }
    return 0;
}
