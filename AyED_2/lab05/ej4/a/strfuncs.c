#include <stdio.h>
#include <stdlib.h>

#include "strfuncs.h"

size_t string_length(const char *str){
    size_t i=0;

    if (str != NULL)
    {
        while (str[i] != '\0')
        {
            ++i;
        }
    }     
    
    return i;
}

char *string_filter(const char *str, char c){
    unsigned int i,j;
    i=0; j=0;
    char *new=NULL;
    new = malloc(sizeof(char) * string_length(str));

    while (str[i] != '\0')
    {
        if (str[i] != c)
        {
            new[j] = str[i];
            ++j;
        }
        ++i;
    }
    new[j] = '\0';

    return new;
}