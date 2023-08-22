#ej1
cat /proc/cpuinfo | grep "model name"

#ej2
cat /proc/cpuinfo | grep "model name" | printf "CPU Cores: %d\n" "$(wc -l)"

#ej3
wget -O mateo_in_wonderland.txt https://www.gutenberg.org/files/11/11-0.txt && sed -i 's/Alice/Mateo/g' "mateo_in_wonderland.txt"

#ej4
sort -k 5 -n weather_cordoba.in > ordenados.txt && tail -n 1 ordenados.txt && head -n 1 ordenados.txt

#ej5
sort -k 3 -n atpplayers.in > jugadores_ordenados.txt

#ej6
awk '{print $0" "$7-$8}' superliga.in | sort -k 2 -k 9 -n -r > superliga_ordenado.txt

#ej7
