# Laboratorio 3 - Grupo 6  |  Sistemas Operativos 2023 

## Integrantes
    - Afonso, Santiago
    - Angeli, Mateo
    - Di Forte Reusa, Federico
    - Usaj, Santiago

# Indice

*HACER EL INDICE*

# Introducción

En este trabajo de laboratorio nos dedicamos a entender el funcionamiento del planificador de procesos de xv6, como administra sus recursos y como se comporta ante diferentes escenarios de exigencias de Input/Output o poder de procesamiento. Para esto analizamos y modificamos el algoritmo original para entender su funcionamiento e implementamos un nuevo algoritmo basado en las políticas de MLFQ. Luego, tomamos mediciones para ver como se comportaban los procesos en estos distintos escenarios.


---
# Resolución del laboratorio

## Primera Parte

1. **¿Qué política de planificación utiliza xv6-riscv para elegir el próximo proceso a ejecutarse?**
Xv6-riscv utiliza la politica de planificacion RR (Round Robin). Esta respuesta se encuentra en la seccion 7.10 "Real World" del libro de Xv6. El codigo del planificador se encuentra en el archivo proc.c a partir de la linea 437.

2. **¿Cuánto dura un quantum en xv6-riscv?**
La duracion del quantum la podemos encontrar en el archivo start.c en la linea 69. Donde nos dice que es de 0.1 segundos aprox en qemu. Pero esto va a depender de la velocidad de cada procesador, ya que en realidad lo que se setea es la cantidad de ciclos permitidos. En este caso ese valor esta seteado en 1000000 ciclos. 

3. **¿Cuánto dura un cambio de contexto en xv6-riscv?**
La funcion swtch es la encargada del context switch. La cual en realidad es el archivo swtch.S y demora 28 instrucciones. 

4. **¿El cambio de contexto consume tiempo de un quantum?**
Si consume, se hablo del tema en una de las clases. (Se puede mejorar)

5. **¿Hay alguna forma de que a un proceso se le asigne menos tiempo?**
El Quantum dura siempre lo mismo, esta seteado como interrupcion global. Pero que pasa si un proceso termina de ejecutarse antes que finalice el Quantum? En ese caso el Quantum no se resetea, sino que el proximo proceso elegido tendra el tiempo faltante para completar el Quantum.

6. **¿Cúales son los estados en los que un proceso pueden permanecer en xv6-riscv y que los hace cambiar de estado?**
Los estados en los que pueden estar son: UNUSED, USED, SLEEPING, RUNNABLE, RUNNING y ZOMBIE. Estos se encuentran en proc.h linea 82.

---
## Segunda Parte

En la segunda parte del laboratorio, analizamos el comportamiento de programas que son cpu-bound o IO-bound con la politica por defecto de xv6 (round-robin).
Más especificamente, analizamos como varia el comportamiento de estos programas al cambiar el Quantum del planificador y como se comportan al estar corriendo en paralelo. Para esto, tomamos mediciones de 5 casos distintos con el Quantum original (1M) y con el Quantum / 10 (100K)

### Caso 1 (1 IO-bench corriendo solo)

![Caso1-RR-Original](Medicion/1-rr-original.png)
![Caso1-RR-Reducido](Medicion/1-rr-10.png)


**Analisis**


### Caso 2 (1 CPU-bench corriendo solo)

![Caso2-RR-Original](Medicion/2-rr-original.png)
![Caso2-RR-Reducido](Medicion/2-rr-10.png)


**Analisis**


### Caso 3 (1 IO-bench y 1 CPU-bench corriendo en paralelo)

![Caso3-RR-Original](Medicion/3-rr-original.png)
![Caso3-RR-Reducido](Medicion/3-rr-10.png)


**Analisis**


### Caso 4 (2 CPU-bench corriendo en paralelo)

![Caso4-RR-Original](Medicion/4-rr-original.png)
![Caso4-RR-Reducido](Medicion/4-rr-10.png)


**Analisis**


### Caso 5 (1 IO-bench y 2 CPU-bench corriendo en paralelo)

![Caso5-RR-Original](Medicion/5-rr-original.png)
![Caso5-RR-Reducido](Medicion/5-rr-10.png)


**Analisis**



---
## Tercera Parte

En la tercera parte de este laboratorio se empezó a realizas cambios al planificador de xv6 para que sus politicas se parezcan un poco mas a las de un planificador MLFQ (**completar con definicion**).
Los cambios realizados fueron la creación de un nuevo campo *priority* en la *struct proc* y cambios en proc.c para que cumpla con las siguientes politicas:
    - **MLFQ regla 3**: Cuando un proceso se inicia, su prioridad será máxima.
    - **MLFQ regla 4**: Descender de prioridad cada vez que el proceso pasa todo un quantum realizando cómputo. Ascender de prioridad cada vez que el proceso se bloquea antes de terminar su quantum.

*AGREGAR CODIGO ACA*

Los cambios hechos no afectan el funcionamiento del planificador, por lo que este sigue siendo Round-Robin, pero sirven para hacerse una idea de como varian las prioridades de cada proceso.
Los resultados fueron los esperados, con los programas IO-bound teniendo una mayor prioridad que los CPU-bound en general. Esto se debe a que en cada instancia de input/output el proceso se "bloquea" y su prioridad asciende.

---
## Cuarta Parte

Para la cuarta y última parte de este laboratorio, realizamos cambios en el algoritmo de planificacion de procesos, para que los campos *priority* y *chosen_counter* agregados a *struct proc* en la tercera parte sean tenidos en cuenta, corriendo siempre a los procesos con mayor prioridad y en caso de tener la misma prioridad al que menores veces haya sido seleccionado.
Esto acerca el funcionamiento del planificador al de uno hecho con las políticas de MLFQ, por lo que deberian ser beneficiados los procesos con mas demanda de IO y perjudicados los procesos con mayor demanda de CPU. 

Veamos los resultados:

### Caso 1 (1 IO-bench corriendo solo)

![Caso1-MLFQ-Original](Medicion/1-mlfq-original.png)
![Caso1-MLFQ-Reducido](Medicion/1-mlfq-10.png)


**Analisis**


### Caso 2 (1 CPU-bench corriendo solo)

![Caso2-MLFQ-Original](Medicion/2-mlfq-original.png)
![Caso2-MLFQ-Reducido](Medicion/2-mlfq-10.png)


**Analisis**


### Caso 3 (1 IO-bench y 1 CPU-bench corriendo en paralelo)

![Caso3-MLFQ-Original](Medicion/3-mlfq-original.png)
![Caso3-MLFQ-Reducido](Medicion/3-mlfq-10.png)


**Analisis**


### Caso 4 (2 CPU-bench corriendo en paralelo)

![Caso4-MLFQ-Original](Medicion/4-mlfq-original.png)
![Caso4-MLFQ-Reducido](Medicion/4-mlfq-10.png)


**Analisis**


### Caso 5 (1 IO-bench y 2 CPU-bench corriendo en paralelo)

![Caso5-MLFQ-Original](Medicion/5-mlfq-original.png)
![Caso5-MLFQ-Reducido](Medicion/5-mlfq-10.png)


**Analisis**





