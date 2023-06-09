#include <stdlib.h>
#include <assert.h>
#include "stack.h"

struct _s_stack {
    stack_elem *elems;      // Arreglo de elementos
    unsigned int size;      // Cantidad de elementos en la pila
    unsigned int capacity;  // Capacidad actual del arreglo elems
};


stack stack_empty(){
    stack new;
    new=malloc(sizeof(struct _s_stack));
    new->size = 0u;
    new->capacity = 0u;
    new->elems = NULL;

    return new;
}

stack stack_push(stack s, stack_elem e){
    s->size++;
    if (s->capacity == 0)
    {
        s->capacity = 1;
        s->elems = calloc(s->capacity, sizeof(stack_elem));
    }
    
    if (s->size > s->capacity)
    {
        s->capacity = s->size *2;
        s->elems = realloc(s->elems, s->capacity * sizeof(stack_elem));
    }
    
    s->elems[s->size -1] = e;

    return s;
}

stack stack_pop(stack s){
    assert(!stack_is_empty(s));
    s->size = s->size -1;

    return s;
}

unsigned int stack_size(stack s){
    return s->size;
}

stack_elem stack_top(stack s){
    return s->elems[s->size -1];
}

bool stack_is_empty(stack s){
    return (s->size == 0);
}

stack_elem *stack_to_array(stack s){
    stack_elem *array = NULL;
    if (s->size == 0)
    {
        return NULL;
    } else {
        array = calloc(s->size,sizeof(stack_elem));
        for (unsigned int i = 0u; i < s->size; i++)
        {
            array[i] = s->elems[i];
        }
    }
    
    return array;
}

stack stack_destroy(stack s){
    free(s->elems);
    free(s);

    return s;
}