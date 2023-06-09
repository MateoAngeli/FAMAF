#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>

#define ARRAY_SIZE 4

struct bound_data {
    bool is_upperbound;
    bool is_lowerbound;
    bool exists;
    unsigned int where;
};

struct bound_data check_bound(int value, int arr[], unsigned int length) {
    struct bound_data res;
    unsigned int i=0;
    res.is_lowerbound=true;
    res.is_upperbound=true;
    res.exists=false;
    while (i<length && (res.is_lowerbound || res.is_upperbound)){
        if (value>arr[i]){
            res.is_lowerbound = false;
        }
        if (value<arr[i]){
            res.is_upperbound = false;
        }
        if (value == arr[i]){
            res.exists = true;
            res.where = i;
        }
        i++;
    }
    return res;
}

int main(void) {
    int a[ARRAY_SIZE];
    int value;
    
    int i=0;
    while (i<ARRAY_SIZE){
        printf("ingrese un valor para la posicion %d\n", i);
        scanf("%d", &a[i]);
        i++;
    }
    printf("ahora ingrese un valor para verificar\n");
    scanf("%d", &value);

    struct bound_data result = check_bound(value, a, ARRAY_SIZE);

    if (result.is_upperbound && result.exists){
        printf("el valor es maximo y esta en la posicion %d\n", result.where);
    }else {
        if (result.is_upperbound){
        printf("el valor es cota superior\n");
        }
    }
    if (result.is_lowerbound && result.exists){
        printf("el valor es minimo y esta en la posicion %d\n", result.where);
    }else {
        if (result.is_lowerbound){
        printf("el valor es cota inferior\n");
        }
    }
    return EXIT_SUCCESS;
}

