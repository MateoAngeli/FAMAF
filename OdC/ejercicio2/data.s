// Angeli, Mateo - Afonso, Santiago - Di Forte Reusa, Federico 
// Organizacion del Computador 2023, FAMAF

.ifndef data_s
.equ data_s, 0

/*
    En este archivo seteamos todas las constantes y variables globales
 */
	
	delay_time: .dword 0xdffff//<------ Aumentar si el programa corre muy rapido
    
	
	.equ SCREEN_WIDTH,   640
	.equ SCREEN_HEIGH,   480
	.equ BITS_PER_PIXEL, 32

	.equ GPIO_BASE,    0x3f200000
	.equ GPIO_GPFSEL0, 0x00
	.equ GPIO_GPLEV0,  0x34
	.equ key_w, 0x2
	.equ key_a, 0x4
	.equ key_s, 0x8
	.equ key_d, 0x10
	.equ key_space, 0x20 
	.equ tamaño_casa1, 100
	.equ tamaño_casa2, 200
	.equ color_cielo, 0x9999
	.equ color_pasto, 0x9900
	color_techo: .dword 0xCC000
	.equ ancho_arbol, 100
	.equ alto_arbol, 150

	

registers:

	// x29 se usa para la posicion de figura actual
    mov x28,0x1ffff		//posicion de figura 1 (casa chiquita)
    mov x27,0xffff		//posicion de figura 2 (casa grande)
	mov x25,0xff7f		//posicion de figura 3 (arbol)
	mov x29,x28			//empezamos en figura 1
	
	mov x26,2	 		//x26 se usa para definir que figura se mueve

	
	// x24 se usa para el ancho de la figura actual
	mov x24, tamaño_casa1		// empezamos con la figura 1
	// x23 se usa para el ancho de la figura actual
	mov x23, tamaño_casa1		// empezamos con la figura 1


    ret

.endif
